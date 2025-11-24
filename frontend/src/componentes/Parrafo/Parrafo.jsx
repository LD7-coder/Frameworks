import './Parrafo.css';
import { useState } from 'react';
import { parrafoOriginal, palabrasCorrectas } from "../../games/parrafo";

function Parrafo() {
    const total = palabrasCorrectas.length;

    const [selecciones, setSelecciones] = useState(Array(total).fill("")); 
    const [resultado, setResultado] = useState(null); 
    const [palabrasDisponibles, setPalabrasDisponibles] = useState(
        shuffleArray([...palabrasCorrectas]) 
    );

    function shuffleArray(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }

    function seleccionarPalabra(palabra) {
        const indexVacio = selecciones.indexOf("");

        if (indexVacio === -1) return;

        const nuevo = [...selecciones];
        nuevo[indexVacio] = palabra;

        setSelecciones(nuevo);

        setPalabrasDisponibles(prev =>
            prev.filter(p => p !== palabra)
        );
    }

    function revisar() {
        let correctas = 0;

        selecciones.forEach((p, i) => {
            if (p === palabrasCorrectas[i]) correctas++;
        });

        setResultado(correctas);
    }

    function quitarPalabra(indexHueco) {
        const palabraQuitada = selecciones[indexHueco];

        if (!palabraQuitada) return;

        const nuevo = [...selecciones];
        nuevo[indexHueco] = "";
        setSelecciones(nuevo);

        setPalabrasDisponibles(prev => [...prev, palabraQuitada]);
    }

    function renderParrafo() {
        let partes = parrafoOriginal.split("___");
        let final = [];

        for (let i = 0; i < partes.length; i++) {
            final.push(<span key={"t"+i}>{partes[i]}</span>);

            if (i < selecciones.length) {
                final.push(
                    <span 
                        key={"e"+i} 
                        className="hueco"
                        onClick={() => quitarPalabra(i)}
                        title="Click para quitar"
                    >
                        {selecciones[i] || "_____"}

                    </span>
                );
            }
        }

        return final;
    }

    return (
    <>
        <div className='divPantallaP'> 

            <div className='divMetadatos'> 
                <div className='Mdato'>
                    <h2 className='tPalabras'>
                        Palabras: {resultado ?? selecciones.filter(s => s).length}/{total}
                    </h2>
                </div>

                <div className='Mdato'>
                    <h2 style={{ color: "#FFFF33" }}>Historia</h2>
                </div>

                <div className='Mdato'>
                    <h2>09:20</h2>
                </div>
            </div>

            <div className='divGame'>
                
                <div className='palabrasB'>
                    {palabrasDisponibles.map((p, i) => (
                        <button 
                            key={i} 
                            className='palabraB' 
                            onClick={() => seleccionarPalabra(p)}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <div className='divParrafo'>
                    
                    <div className="contenedor-blanco">
                        <p className="historia-texto">
                            {renderParrafo()}
                        </p>
                    </div>

                    <button 
                        className='btnRevisar btn-revisar'
                        onClick={revisar}
                    >
                        Revisar
                    </button>

                    {resultado !== null && (
                        <h2 style={{ marginTop: "10px", color: "white" }}>
                            Aciertos: {resultado}/{total}
                        </h2>
                    )}
                </div>

            </div>
        </div>
    </>
)

}

export default Parrafo;
