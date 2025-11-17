import './Parrafo.css';
import { useState } from 'react';

const palabras = ["fer", "luis", "david", "probar", "hola"];
let totalPalabras = palabras.length;

function Parrafo(){
    const [palabrasCorrectas, setPalabrasCorrectas] = useState(0);

    return(
        <>
            <div className='divPantallaP'> 
                <div className='divMetadatos'> 
                    <div className='Mdato'><h2 className='tPalabras'>Palabras: {palabrasCorrectas}/{totalPalabras}</h2></div>
                    <div className='Mdato'><h2 style={{color: "#FFFF33", textShadow: "0 0 3px rgb(216, 191, 255), 0 0 6px rgb(216, 191, 255)"}}>Historia</h2></div>
                    <div className='Mdato'><div><h2 style={{textShadow: "0 0 3px rgb(216, 191, 255), 0 0 6px rgb(216, 191, 255)"}}>09:20</h2></div></div>
                </div>
                <div className='divGame'>
                    <div className='palabrasB'>
                        {palabras.map((item, key) => (
                            <button className='palabraB' key={key} onClick={setPalabrasCorrectas} style={{fontSize: "18px"}}>{item}</button>
                        ))}
                    </div>
                    <div className='divParrafo'>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Parrafo;