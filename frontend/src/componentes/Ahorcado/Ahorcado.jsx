import { useState } from "react";
import { AhorcadoGame } from "../../games/ahorcado";
import "./Ahorcado.css";

function Ahorcado() {
    const [juego] = useState(new AhorcadoGame("MATEMATICAS"));
    const [oculta, setOculta] = useState(juego.obtenerPalabraOculta());
    const [estado, setEstado] = useState("jugando");
    const [usadas, setUsadas] = useState({}); 

    const manejarClick = (letra) => {
        if (estado !== "jugando") return;

        const resultado = juego.verificarLetra(letra);

        setUsadas((prev) => ({
            ...prev,
            [letra]: resultado.estado 
        }));

        setOculta(juego.obtenerPalabraOculta());
        setEstado(juego.verificarEstado());
    };

    return (
        <>
            <div className='divPantallaA'>
                <div className='divMetadatosA'>
                    <div className='MdatoA' style={{ width: "940px" }}>
                        <h1 style={{
                            color: "#FFFF33",
                            textShadow: "0 0 3px rgb(216, 191, 255), 0 0 6px rgb(216, 191, 255)"
                        }}>
                            Matematicas
                        </h1>
                    </div>

                    <div className='MdatoA' style={{ width: "60px" }}>
                        <h2 style={{
                            textShadow: "0 0 3px rgb(216, 191, 255), 0 0 6px rgb(216, 191, 255)"
                        }}>
                            09:25
                        </h2>
                    </div>
                </div>

                <div className='principal'>
                    <div className='pistaA'>
                        <p style={{ color: "#0D0D0D", fontSize: "16px" }}>
                            Este es un parrafo de prueba solo asegurandonos que las pistas si llegaran hehehe
                        </p>
                    </div>

                    <div className='figura'></div>

                    <div className='letras'>
                        {[
                            "ABCD","EFGH","IJKL","MNÑP","QRST","UVWX","YZ"
                        ].map((fila, index) => (
                            <div className='rowL' key={index}>
                                {fila.split("").map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => manejarClick(l)}
                                        disabled={!!usadas[l]}
                                        className={`colL 
                                            ${usadas[l] === "correcta" ? "correcta" : ""} 
                                            ${usadas[l] === "incorrecta" ? "incorrecta" : ""}
                                        `}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='secundario'>
                    {oculta.split(" ").map((c, i) => (
                        <input
                            key={i}
                            value={c}
                            readOnly
                            maxLength={1}
                            className='letraA'
                        />
                    ))}
                </div>

                <h2 style={{ color: "white" }}>
                    {estado === "jugando" ? "Adivina la palabra" : estado.toUpperCase()}
                </h2>

                <h3 style={{ color: "white" }}>Intentos restantes: {juego.intentos}</h3>
            </div>
        </>
    );
}

export default Ahorcado;
