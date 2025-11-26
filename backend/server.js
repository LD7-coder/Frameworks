import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "./db.js";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: "AIzaSyClojc-bepYaI6fY5jmTXXJH55uuZdeZvY" });
const SECRET = "puedesercualquiercontraseña";

// Registro
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
    if (err.code === "ER_DUP_ENTRY")
      return res.status(400).json({ message: "El usuario ya existe" });

    res.status(500).json({
      message: "COMPROBACION",
      error: err.sqlMessage || err.message
    });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE usuario = ?", 
      [usuario]
    );

    if (rows.length === 0)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const user = rows[0];

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    // Token
    const token = jwt.sign(
      {
        id: user.id,
        usuario: user.usuario,
        correo: user.mail
      },
      SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login exitoso",
      token
    });

  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});


//MIDDLEWARE PARA AUTENTICAR
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "Token requerido" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(403).json({ message: "Formato de token inválido" });

  const token = parts[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Token inválido" });

    req.user = decoded;
    next();
  });
}

//TODO LO QUE ESTE ABAJO REQUIERE TOKEN
app.use(verifyToken);

const storage = multer.memoryStorage();
const upload = multer({ storage });
function cleanGeminiResponse(text) {
  return text
    .replace(/```javascript|```js|```/g, "")
    .trim();
}

app.post("/api/analyze-pdf", upload.single("pdfFile"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No se subió ningún archivo PDF." });

    console.log("Archivo recibido:", req.file.originalname);

    const pdfBase64 = req.file.buffer.toString("base64");

    const prompt = `
      A partir del contenido del PDF, responde ÚNICAMENTE con código JavaScript válido.
      No incluyas explicaciones, ni texto adicional, ni comillas de plantilla.

      Genera las siguientes constantes:

      juego1: arreglo con [palabraClave, pista]
      juego2: arreglo de 8 palabras clave
      juego3: matriz 8x2 con [[palabra, pista], ...]
      juego4: arreglo donde el primer valor es un párrafo y los siguientes 5 palabras clave
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: pdfBase64,
              },
            },
          ],
        },
      ],
    });

    const raw = response.candidates[0].content.parts[0].text;
    const cleaned = cleanGeminiResponse(raw);

    const scope = {};
    const fn = new Function(
      "scope",
      `"use strict"; ${cleaned}; Object.assign(scope, { juego1, juego2, juego3, juego4 });`
    );

    fn(scope);

    return res.status(200).json({
      ahorcado: scope.juego1,
      sopaDeLetras: scope.juego2,
      crucigrama: scope.juego3,
      completarFrase: scope.juego4,
    });

  } catch (error) {
    console.error("ERROR GENERAL:", error);
    return res.status(500).json({
      error: "Error procesando la solicitud.",
      detalle: error.message,
    });
  }
});

app.listen(3000, () =>
  console.log("API escuchando en http://localhost:3000")
);
