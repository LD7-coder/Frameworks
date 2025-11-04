import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "./db.js";

const app = express();
app.use(cors()); 

app.use(express.json()); 

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

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    res.status(500).json({
      message: "Error en el servidor",
      error: err.sqlMessage || err.message,
    });
  }
});


app.post("/api/login", async (req, res) => {
  try {
    console.log("BODY RECIBIDO:", req.body);   
    const { usuario, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM usuario WHERE usuario = ?", [usuario]);

    if (rows.length === 0) {
      console.log("NO EXISTE");
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    console.log("PASSWORD EN BD:", user.password); 
    console.log("PASSWORD INGRESADO:", password);   

    const validPass = await bcrypt.compare(password, user.password);
    console.log("COMPARE RESULT:", validPass);     

    if (!validPass) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    res.json({ message: "Login exitoso" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});
app.listen(3000, () => console.log("API escuchando en http://localhost:3000"));
