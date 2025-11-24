import './Popup.css';

let intentos = 8,
    estado = "¡GANASTE!",
    tiempo = "9:56";

function Popup(){
    return (
        <>
            <div className='divPantallaP'>
                <div className='resultados'>
                    <div className='datoR'><h1 style={{color: "#FFFF33"}}>Resultados</h1></div>
                    <div className='datoR'><h2 style={{textShadow: "1px 1px 3px rgba(0, 0, 0, 0.85)"}}>Tiempo: {tiempo}</h2></div>
                    <div className='datoR'><h2 style={{textShadow: "1px 1px 3px rgba(0, 0, 0, 0.85)"}}>Intentos: {intentos}</h2></div>
                    <div className='datoR'><h2 style={{color: "#39FF14", textShadow: "0 0 6px rgba(57, 255, 20, 0.7), 0 0 12px rgba(57, 255, 20, 0.45), 0 0 18px rgba(57, 255, 20, 0.3)"}}>{estado}</h2></div>
                    <div className='datoR'><button className='botonA' style={{background: "#FFFACD", border: "solid #FFFF33", color: "#0D0D0D", outline: "none"}}>Aceptar</button></div>
                </div>
            </div>
        </>
    );
}

export default Popup;