import CrucigramaGame from "../../games/crucigrama";
import './Crucigrama.css';
import { useEffect, useState } from "react";
//import { useRef } from "react";

let objeto = CrucigramaGame(["FER", "DAVID", "LUIS", "FRAMEWORKS", "SOFTWARE","LUNES","MAPACHE","CARRUSEL","HALLOWEEN"], 15),
  crucigrama = objeto.matriz,
  minutos = 9,
  segundos = 38;

let pistas = [
    "1. Lorem Ipsum is simply dummy text of the printing and typesetting industry", 
    "2. Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    "3. Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    "4. Lorem Ipsum is simply dummy text of the printing and typesetting industry", 
    "5. Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    "6. Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    "7. Lorem Ipsum is simply dummy text of the printing and typesetting industry", 
    "8. Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    "9. Lorem Ipsum is simply dummy text of the printing and typesetting industry"
]
//let num_palabra = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

//let palabras_prueba =  ["FER", "DAVID", "LUIS", "FRAMEWORKS", "SOFTWARE","LUNES","MAPACHE","CARRUSEL","HALLOWEEN"];
let palabras_ingresadas = [];

console.log(crucigrama)

//Colocando arreglos para onChange de las letras en crucigrama
crucigrama.forEach(row => {
    palabras_ingresadas.push([]);
    row.forEach(col => {
        console.log(palabras_ingresadas.length)
        palabras_ingresadas[palabras_ingresadas.length - 1].push("")
        console.log(col)
    })
});

console.log("Hola")
/*
palabras_prueba.forEach(()=>{
    palabras_ingresadas.push([])
});
palabras_prueba.forEach((item, index)=>{
    [...item].forEach(()=>{
        palabras_ingresadas[index].push("")
    })
});
*/

function Crucigrama(){
    const [palabrasIngresadas, setIngresadas] = useState(palabras_ingresadas);
    let c = 0;

    useEffect(()=>{
        console.log("pasamos")
        console.log(palabrasIngresadas)
    }, [palabrasIngresadas])
    return(
        <>
            <div className="divPantallaC">
                <div className="divCrucigrama" style={{gridTemplateColumns: `repeat(${crucigrama[0].length}, 1fr)`}}>
                    {crucigrama.map((arreglo, rowKey) => (
                        arreglo.map((item, colKey) => 
                            item !== "" 
                            ? (<div key={`${rowKey}${colKey}`}>
                                {item === item.toUpperCase() 

                                ? (<div className="organizarI">
                                        <div style={{width: "15px", height: "15px", fontSize: "10px", color: "#0d0d0d", textShadow: "0 0 4px rgba(0, 0, 0, 0.6),0 0 8px rgba(0, 0, 0, 0.4)"}}>{c+=1}</div>
                                        <input className="divLetraC" maxLength={1} onChange={(e) => {setIngresadas(palabrasIngresadas => {palabrasIngresadas[rowKey][colKey] = e.target.value; return [...palabrasIngresadas]})}}></input>
                                    </div>)
                                : (<div className="organizarI">
                                        <div style={{width: "15px", height: "15px"}}><h2></h2></div>
                                        <input className="divLetraC" maxLength={1} onChange={(e) => {setIngresadas(palabrasIngresadas => {palabrasIngresadas[rowKey][colKey] = e.target.value; return [...palabrasIngresadas]})}}></input>
                                    </div>)}
                            </div>) 
                            : (<div key={`${rowKey}${colKey}`}></div>)
                        )
                    ))}
                </div>
                <div className="secundarioC">
                    <div className="divMetadatosC">
                        <div style={{width: "330px"}}><h1 className="MdatoC" style={{color: "#FFFF33", textShadow: "0 0 3px rgb(216, 191, 255), 0 0 6px rgb(216, 191, 255)"}}>Matematicas</h1></div>
                        <div style={{width: "370px", display: "flex", gap: "20px", alignItems: "center"}}>
                            <h2 className="MdatoC" style={{textShadow: "0 0 3px rgb(216, 191, 255), 0 0 6px rgb(216, 191, 255)"}}>{minutos}:{segundos}</h2>
                            <button className="Bcomprobar" style={{color: "#0D0D0D"}}>Comprobar</button>
                            <button className="Bsalir" style={{color: "#0D0D0D"}}>Salir</button>
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