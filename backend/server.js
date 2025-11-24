import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import pool from "./db.js";
import multer from 'multer';
import { GoogleGenAI } from "@google/genai"; 


const app = express();
app.use(cors()); 
app.use(express.json()); 

// aqui va la key de la api de google
const ai = new GoogleGenAI({ apiKey: "" });

const SECRET = "puedesercualquiercontraseña"; 

app.post("/api/register", async (req, res) => {
  try {
    const { usuario, correo, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO usuario (usuario, mail, password) VALUES (?, ?, ?)",
      [usuario, correo, hashedPassword]
    );
    res.json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "El usuario ya existe" });
    res.status(500).json({ message: "Error en el servidor", error: err.sqlMessage || err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM usuario WHERE usuario = ?", [usuario]);
    if (rows.length === 0) return res.status(400).json({ message: "Usuario no encontrado" });
    const user = rows[0];
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Contraseña incorrecta" });
    res.json({ message: "Login exitoso" });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// se arregla la subida d archivos con multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//extraemos el json solo
function cleanGeminiResponse(text) {
    const regex = /```json\s*([\s\S]*?)\s*```/m;
    const match = text.match(regex);
    return (match && match[1]) ? match[1] : text; 
}

//inicio del endpoint para analizar el pdf
app.post('/api/analyze-pdf', upload.single('pdfFile'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo PDF.' });
        
        console.log("Archivo recibido:", req.file.originalname);
        const pdfBase64 = req.file.buffer.toString('base64');

        const prompt = `
            Eres un asistente experto en crear material de estudio.
            Analiza el documento PDF adjunto.
            
            Genera un JSON con palabras y pistas para juegos:
            1. ahorcado: 1 palabra clave.
            2. sopaDeLetras: 10 palabras.
            3. crucigrama: 10 objetos { pista, respuesta }.
            4. completarFrase: 5 objetos { frase, respuesta }.

            Estructura JSON exacta:
            { "ahorcado": [], "sopaDeLetras": [], "crucigrama": [], "completarFrase": [] }
            SOLO devuelve JSON.
        `;

        console.log("Enviando PDF y Prompt a Gemini...");

        //aqui lllamo a la api
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", 
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: prompt }, 
                        { 
                            inlineData: { 
                                mimeType: 'application/pdf', 
                                data: pdfBase64 
                            } 
                        } 
                    ]
                }
            ],
            config: {
                responseMimeType: 'application/json', 
            }
        });

        // obtengo el texto dela espuerta
        let geminiRaw = "";
        
        if (response && response.candidates && response.candidates[0] && response.candidates[0].content) {
            geminiRaw = response.candidates[0].content.parts[0].text;
        } else {
            console.error("Estructura de respuesta inesperada:", JSON.stringify(response, null, 2));
            return res.status(500).json({ error: "La IA no devolvió texto válido." });
        }

        console.log("Texto extraído:", geminiRaw.substring(0, 50) + "...");

        const cleanedJson = cleanGeminiResponse(geminiRaw);
        const jsonData = JSON.parse(cleanedJson);
        
        return res.status(200).json(jsonData);

    } catch (error) {
        console.error("ERROR GENERAL:", error);
        const msg = error?.body?.error?.message || error.message;
        return res.status(500).json({ error: 'Error procesando la solicitud.', detalle: msg });
    }
});

app.listen(3000, () => console.log("API escuchando en http://localhost:3000"));