import CrucigramaGame from "../../games/crucigrama";
import './Crucigrama.css';
import { useEffect, useRef, useState } from "react";

function Crucigrama() {

    const finalData = JSON.parse(localStorage.getItem("finalData"));

    const palabrasDesdeAI = finalData?.crucigrama?.map(item => item[0].toUpperCase()) ?? [];
    const pistasDesdeAI    = finalData?.crucigrama?.map((item, i) => `${i + 1}. ${item[1]}`) ?? [];

    let objeto = CrucigramaGame(palabrasDesdeAI, 20),
        crucigrama = objeto.matriz;

    let pistas = pistasDesdeAI;

    let palabras_ingresadas = [];

    crucigrama.forEach(row => {
        palabras_ingresadas.push([]);
        row.forEach(() => {
            palabras_ingresadas[palabras_ingresadas.length - 1].push("");
        });
    });

    const [palabrasIngresadas, setIngresadas] = useState(palabras_ingresadas);
    const actSeg = useRef(0);
    const actMin = useRef(0);
    const intervalo = useRef(null);

    const [seg, setSeg] = useState(0);
    const [min, setMin] = useState(0);

    let c = 0;

    useEffect(() => {
        intervalo.current = setInterval(() => {
            if (actSeg.current === 60) {
                actSeg.current = 0;
                setSeg(actSeg.current);
                actMin.current += 1;
                setMin(actMin.current);
            } else {
                actSeg.current += 1;
                setSeg(actSeg.current);
            }
        }, 1100);

        return () => {
            clearInterval(intervalo.current);
        };
    }, []);

    useEffect(() => {
        console.log("pasamos");
        console.log(palabrasIngresadas);
    }, [palabrasIngresadas]);


    return (
        <>
            <div className="divPantallaC">
                <div className="divCrucigrama" style={{ gridTemplateColumns: `repeat(${crucigrama[0].length}, 1fr)` }}>
                    {crucigrama.map((arreglo, rowKey) => (
                        arreglo.map((item, colKey) =>
                            item !== ""
                                ? (<div key={`${rowKey}${colKey}`}>
                                    {item === item.toUpperCase()

                                        ? (<div className="organizarI">
                                            <div style={{ width: "15px", height: "15px", fontSize: "10px", color: "#0d0d0d", textShadow: "0 0 4px rgba(0, 0, 0, 0.6),0 0 8px rgba(0, 0, 0, 0.4)" }}>{c += 1}</div>
                                            <input className="divLetraC" maxLength={1} onChange={(e) => {
                                                setIngresadas(palabrasIngresadas => {
                                                    palabrasIngresadas[rowKey][colKey] = e.target.value;
                                                    return [...palabrasIngresadas];
                                                })
                                            }}></input>
                                        </div>)
                                        : (<div className="organizarI">
                                            <div style={{ width: "15px", height: "15px" }}><h2></h2></div>
                                            <input className="divLetraC" maxLength={1} onChange={(e) => {
                                                setIngresadas(palabrasIngresadas => {
                                                    palabrasIngresadas[rowKey][colKey] = e.target.value;
                                                    return [...palabrasIngresadas];
                                                })
                                            }}></input>
                                        </div>)}
                                </div>)
                                : (<div key={`${rowKey}${colKey}`}></div>)
                        )
                    ))}
                </div>

                <div className="secundarioC">
                    <div className="divMetadatosC">
                        <div style={{ width: "330px" }}>
                            <h1 className="MdatoC" style={{ color: "#FFFF33", textShadow: "0 0 3px rgb(216, 191, 255), 0 0 6px rgb(216, 191, 255)" }}>Matematicas</h1>
                        </div>

                        <div style={{ width: "370px", display: "flex", gap: "20px", alignItems: "center" }}>
                            <h2 className="MdatoC" style={{ textShadow: "0 0 3px rgb(216, 191, 255), 0 0 6px rgb(216, 191, 255)" }}>
                                {min >= 10 ? min : `0${min}`}:{seg >= 10 ? seg : `0${seg}`}
                            </h2>
                            <button className="Bcomprobar" style={{ color: "#0D0D0D" }}>Comprobar</button>
                            <button className="Bsalir" style={{ color: "#0D0D0D" }}>Salir</button>
                        </div>
                    </div>

                    <div className="liPalabraC">
                        {pistas.map((item, key) => (
                            <div key={key} className="pistaC"><h4>{item}</h4></div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Crucigrama;
