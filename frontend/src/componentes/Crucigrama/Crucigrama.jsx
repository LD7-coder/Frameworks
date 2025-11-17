import CrucigramaGame from "../../games/crucigrama";
import './Crucigrama.css';
//import { useEffect, useState } from "react";
//import { useRef } from "react";

let objeto = CrucigramaGame(["FER", "DAVID", "LUIS", "FRAMEWORKS", "SOFTWARE","LUNES","MAPACHE","CARRUSEL","HALLOWEEN"], 15);
let crucigrama = objeto.matriz,
palabras = objeto.palabras;

console.log(crucigrama)

function Crucigrama(){

    /*
    const divRef = useRef([]);
    //const [modo, setModo] = useState("V")

    const getDivRef = (rowIndex, colIndex) => {
        //Doble prptección en caso que las referencias no se hayan completado aún, evitamos acceder a un undefined
        return divRef.current[rowIndex]?.[colIndex] ?? null
    }


    const handleChange = (e, rowIndex, colIndex) => {
        console.log("Pase por aqui")
        let rowIndex_ant = rowIndex -1; //Vertical
        console.log(rowIndex_ant)
        let colIndex_ant = colIndex -1; //Horizontal
        console.log(colIndex_ant)
        let div_vertical_ant = divRef[rowIndex_ant]?.[colIndex] ?? null;
        let div_horizontal_ant = divRef[rowIndex]?.[colIndex_ant] ?? null;
        //Existe un div 
        if(div_vertical_ant !== null && div_horizontal_ant !== null){
            //El anterior vertical y anterior horizontal tiene elementos 
            console.log(div_vertical_ant, div_horizontal_ant)
        }else if(div_vertical_ant === null && div_horizontal_ant !== null){
            //El anterior horizontal tiene elementos 
            console.log(div_horizontal_ant)
        }else if(div_horizontal_ant === null && div_vertical_ant !== null){
            //El anterior vertical tiene elementos 
            console.log(div_vertical_ant)
        }
    }
    */

    return(
        <>
            <div className="divPantallaC">
                <div className="divCrucigrama" style={{gridTemplateColumns: `repeat(${crucigrama[0].length}, 1fr)`}}>
                    {crucigrama.map((arreglo, rowKey) => (
                        arreglo.map((item, colKey) => 
                            item !== "" ? (<div key={`${rowKey}${colKey}`}><input className="divLetraC"></input></div>) : (<div key={`${rowKey}${colKey}`}></div>)
                        )
                    ))}
                </div>
                <ul className="liPalabra">
                    {palabras.map((item, key) => (
                        <li key={key}>{item}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Crucigrama;