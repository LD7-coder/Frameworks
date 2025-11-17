import Crucigrama from "../../games/crucigrama";
import './Crucigrama.css';
//import { useEffect, useState } from "react";
import { useRef } from "react";

let objeto = Crucigrama(["FER", "DAVID", "LUIS", "FRAMEWORKS", "SOFTWARE","LUNES","MAPACHE","CARRUSEL","HALLOWEEN"], 15), 
  crucigrama = objeto.matriz,
  palabras = objeto.palabras;

  //let palabras_ingresadas = [];

  console.log(crucigrama)

function CrucigamaGame(){
    const divRef = useRef([]);
    //const [modo, setModo] = useState("V")

    const setDivRef = (div, rowIndex, colIndex) => {
        if(!divRef.current[rowIndex]){
            divRef.current[rowIndex] = [];
        }
        divRef.current[rowIndex][colIndex] = div;
    }
/*
    const getDivRef = (rowIndex, colIndex) => {
        //Doble prptección en caso que las referencias no se hayan completado aún, evitamos acceder a un undefined
        return divRef.current[rowIndex]?.[colIndex] ?? null
    }
        */
    
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

    return(
        <>
            <div className="divPantallaC">
                <div  className="divCrucigrama" style={{gridTemplateColumns: `repeat(${crucigrama[0].length}, 1fr)`}}>
                    {crucigrama.map((arreglo, rowKey) => (
                        arreglo.map((item, colKey) => 
                            item !== "" ? (<div key={`${rowKey}${colKey}`} ref={div => setDivRef(div, rowKey, colKey)}><input className="divLetraC" onChange={(e) => handleChange(e, rowKey, colKey)}></input></div>) : (<div key={`${rowKey}${colKey}`} ref={div => setDivRef(div, rowKey, colKey)}></div>)
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

export default CrucigamaGame;