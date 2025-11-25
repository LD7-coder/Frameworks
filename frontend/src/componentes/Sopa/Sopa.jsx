import SopaLetras from "../../games/sopaletrascom";
import './Sopa.css';
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

let objeto = SopaLetras(["HOLA", "ADIOS", "PERRO", "GATO", "FER", "DAVID", "LUIS"], 15),
  sopa = objeto.matriz,
  palabras = objeto.palabras,
  colores = ["#FFF9A6", "#FFB3B3", "#D7B7FF", "#AEE6FF", "#BFFFC8", "#FFD8A8", "#FFC0D9", "#B8FFE0"];


function Sopa(){
    const actSeg = useRef(0);
    const actMin = useRef(0);
    const intervalo = useRef(null);
    const divRef = useRef([]);
    const divL = useRef([]);
    const setLink = useNavigate();

    const [bandera, setBandera] = useState(false);
    const [finalizar, setFinalizar] = useState(true);
    const [letras_seleccionadas, setLetrasSeleccionadas] = useState([]);
    const [modo, setModo] = useState("");
    const [min, setMin] = useState(0);
    const [seg, setSeg] = useState(0);
    //const [correctas, setCorrectas] = useState(palabras);

    //Intervalo creado cuando se monta el componente
    useEffect(()=>{
        console.log("Hola, estoy existiendo")
        intervalo.current = setInterval(() => {
            if(actSeg.current === 60){
                actSeg.current = 0
                setSeg(actSeg.current); 
                actMin.current += 1
                setMin(actMin.current); 
            }else{
                actSeg.current += 1
                setSeg(actSeg.current); 
            }
        }, 1100);

        //Función que detiene la ejecución en cuanto se desmonta el componente
        return () => {
            clearInterval(intervalo.current)
        };

    }, []);

    const setDivRef = (div, rowIndex, colIndex) => {
        if(!divRef.current[rowIndex]){
            divRef.current[rowIndex] = [];
        }
        divRef.current[rowIndex][colIndex] = div;
    }

    const setDivL = (div, rowIndex) => {
        divL.current[rowIndex] = div;
    }

    const getDivRef = (rowIndex, colIndex) => {
        //Doble prptección en caso que las referencias no se hayan completado aún, evitamos acceder a un undefined
        return divRef.current[rowIndex]?.[colIndex] ?? null
    }

    const getDivL = (rowIndex) => {
        return divL.current[rowIndex] ?? null
    }

    const handleMouseDown = (e, rowIndex, colIndex) =>{
        const div = getDivRef(rowIndex, colIndex);
        if(bandera == false && (div && div.contains(e.target))){
            setBandera(true);
            //div.style.backgroundColor = 'pink';
        }else{
            console.log('No existe');
        }
    }

    const handleMouseMove = (e, rowIndex, colIndex) => {
        const div = getDivRef(rowIndex, colIndex);
        //Validamos si la bandera viene a true significa que el MouseDown se inicio
        if(bandera && (div && div.contains(e.target))){
            //div.style.backgroundColor = '#D3D3D3';
            //Evitar guardar repetidos dentrode las palabras seleccionadas 
            setLetrasSeleccionadas((letras_seleccionadas) => {
                //Evitar letras repetidas, debe estar dentro de useState para evitar que la logica lea 
                //el estado desactualizado de letras_seleccionadas 
                if(letras_seleccionadas.length !== 0){
                    if(!(letras_seleccionadas.some((obj) => (
                        (obj.rowIndex === rowIndex && obj.colIndex === colIndex)
                    )))){
                        //console.log(letras_seleccionadas[letras_seleccionadas.length - 1])
                        return [...letras_seleccionadas, {rowIndex: rowIndex, colIndex: colIndex, letra: getDivRef(rowIndex, colIndex).textContent}];
                    }else{
                        return letras_seleccionadas;
                    }
                }else{
                    return [...letras_seleccionadas, {rowIndex: rowIndex, colIndex: colIndex, letra: getDivRef(rowIndex, colIndex).textContent}];
                }
            });
        }else{
            console.log('No existe');
        }
    }

    const handleMouseUp = (e, rowIndex, colIndex) => {
        const div = getDivRef(rowIndex, colIndex);
        if(div && div.contains(e.target)){
            setBandera(false);
            setFinalizar(false);
        }else{
            console.log('No existe');
        }
    }

    /*
    **Modos**
    -RR: REVERSO
    -R: ROW NORMAL
    -CR: REVERSO
    -C: COLUMN NORMAL
    */
    useEffect(() => {
        if(letras_seleccionadas.length === 1){
            //Coloreamos
            getDivRef(letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex, letras_seleccionadas[letras_seleccionadas.length - 1].colIndex).style.backgroundColor = '#D3D3D3';
            //console.log(letras_seleccionadas[letras_seleccionadas.length - 1])
        }else if(letras_seleccionadas.length === 2){
            //console.log(letras_seleccionadas[letras_seleccionadas.length - 1])
            //console.log(letras_seleccionadas[letras_seleccionadas.length - 2])
            if(letras_seleccionadas[letras_seleccionadas.length - 2].rowIndex === letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex){
                if(letras_seleccionadas[letras_seleccionadas.length - 1].colIndex < letras_seleccionadas[letras_seleccionadas.length - 2].colIndex){
                    setModo('RR')
                    getDivRef(letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex, letras_seleccionadas[letras_seleccionadas.length - 1].colIndex).style.backgroundColor = '#D3D3D3';
                }else if(letras_seleccionadas[letras_seleccionadas.length - 1].colIndex > letras_seleccionadas[letras_seleccionadas.length - 2].colIndex){
                    setModo('R')
                    getDivRef(letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex, letras_seleccionadas[letras_seleccionadas.length - 1].colIndex).style.backgroundColor = '#D3D3D3';
                }
            }else if(letras_seleccionadas[letras_seleccionadas.length - 2].colIndex === letras_seleccionadas[letras_seleccionadas.length - 1].colIndex){
                if(letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex < letras_seleccionadas[letras_seleccionadas.length - 2].rowIndex){
                    setModo('CR')
                    getDivRef(letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex, letras_seleccionadas[letras_seleccionadas.length - 1].colIndex).style.backgroundColor = '#D3D3D3';
                }else if(letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex > letras_seleccionadas[letras_seleccionadas.length - 2].rowIndex){
                    setModo('C')
                    getDivRef(letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex, letras_seleccionadas[letras_seleccionadas.length - 1].colIndex).style.backgroundColor = '#D3D3D3';
                }
            }
            /*
            if((letras_seleccionadas[letras_seleccionadas.length - 2]?.rowIndex + 1) === letras_seleccionadas[letras_seleccionadas - 1].rowIndex){
                console.log("YEI")
            }
                */
        }
        if(modo === 'RR'){
            if(letras_seleccionadas[0].rowIndex === letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex){
                console.log("Modo row-reverse")
                //console.log(letras_seleccionadas[letras_seleccionadas.length - 2].rowIndex, letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex)
                if((letras_seleccionadas[letras_seleccionadas.length - 1].colIndex + 1) === letras_seleccionadas[letras_seleccionadas.length - 2].colIndex){
                    getDivRef(letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex, letras_seleccionadas[letras_seleccionadas.length - 1].colIndex).style.backgroundColor = '#D3D3D3';
                }
            }
        }else if(modo === 'R'){
            if(letras_seleccionadas[0].rowIndex === letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex){
                console.log("Modo row")
                //console.log(letras_seleccionadas[letras_seleccionadas.length - 2].rowIndex, letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex)
                if((letras_seleccionadas[letras_seleccionadas.length - 1].colIndex - 1) === letras_seleccionadas[letras_seleccionadas.length - 2].colIndex){
                    getDivRef(letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex, letras_seleccionadas[letras_seleccionadas.length - 1].colIndex).style.backgroundColor = '#D3D3D3';
                }
            }
        }else if(modo === 'CR'){
            if(letras_seleccionadas[0].colIndex === letras_seleccionadas[letras_seleccionadas.length - 1].colIndex){
                if((letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex + 1) === letras_seleccionadas[letras_seleccionadas.length - 2].rowIndex){
                    getDivRef(letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex, letras_seleccionadas[letras_seleccionadas.length - 1].colIndex).style.backgroundColor = '#D3D3D3';
                }
            }    
        }else if(modo === 'C'){
            if(letras_seleccionadas[0].colIndex === letras_seleccionadas[letras_seleccionadas.length - 1].colIndex){
                if((letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex - 1) === letras_seleccionadas[letras_seleccionadas.length - 2].rowIndex){
                    getDivRef(letras_seleccionadas[letras_seleccionadas.length - 1].rowIndex, letras_seleccionadas[letras_seleccionadas.length - 1].colIndex).style.backgroundColor = '#D3D3D3';
                }
            } 
        }
    }, [letras_seleccionadas, modo])

    useEffect(() => {
        if(finalizar === false){
            console.log(letras_seleccionadas)
            let palabraC = ""; 
            letras_seleccionadas.forEach(l => {
                palabraC += l.letra;
            });
            console.log(palabraC)
            let indexC = palabras.findIndex(p => p === palabraC)
            console.log(indexC)
            if(indexC > -1){
                console.log("confirmación")
                letras_seleccionadas.forEach((l) => {
                    console.log(colores[indexC])
                    getDivRef(l.rowIndex, l.colIndex).style.backgroundColor = `${colores[indexC]}`;
                    getDivL(indexC).style.backgroundColor = '#C8FFC4';
                    getDivL(indexC).style.borderColor = '#39FF14';
                })
            }
            if(indexC === -1){
                console.log("ando aqui")
                letras_seleccionadas.forEach((l) => {
                    getDivRef(l.rowIndex, l.colIndex).style.backgroundColor = '#5C5C5C';
                })
            }
            setLetrasSeleccionadas([])
            setFinalizar(true)
            setModo("")
        }
    }, [finalizar, letras_seleccionadas, modo])

    return(
        <>
            <div className="divPantalla">
                <div className="divMetadatosS">
                    <div style={{width: "405px"}}><h1 className="MdatoS" style={{color: "#FFFF33", textShadow: "0 0 3px rgb(216, 191, 255), 0 0 6px rgb(216, 191, 255)"}}>Matematicas</h1></div>
                    <div style={{width: "500", display: "flex", justifyContent: "center", alignItems: "center", gap: "20px"}}>
                        <h2 className="MdatoS" style={{textShadow: "0 0 3px rgb(216, 191, 255), 0 0 6px rgb(216, 191, 255)"}}>{min >= 10 ? min :  `0${min}`}:{seg >= 10 ? seg :  `0${seg}`}</h2>
                        <button className="Bsalir" style={{color: "#0D0D0D"}} onClick={() => {setLink("/home")}}>Salir</button>
                    </div>
                </div>
                <div className="divSecundario">
                    <div  className="divSopa" style={{gridTemplateColumns: `repeat(${sopa[0].length}, 1fr)`}}>
                        {sopa.map((arreglo, rowKey) => (
                            arreglo.map((item, colKey) => (
                                <div key={`${rowKey}${colKey}`}  ref={(div) => setDivRef(div, rowKey, colKey)} className="divLetraS"><div style={{width: '50%', height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0D0D0D'}} onMouseDown={(e) => {handleMouseDown(e, rowKey, colKey)}} onMouseMove={(e) => {handleMouseMove(e, rowKey, colKey)}} onMouseUp={(e) => {handleMouseUp(e, rowKey, colKey)}}>{item}</div></div>
                            ))
                        ))}
                    </div>
                    <div className="liPalabra">
                        {palabras.map((item, key) => (
                            (<div key={key} ref={(div) => setDivL(div, key)}  className="palabraS"><h3>{item}</h3></div>)
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sopa;
