import './Ahorcado.css';

const arreglo = ["a", "e", "i", "o", "u"];

function Ahorcado(){
    return(
        <>
            <div className='divPantallaA'>
                <div className='divMetadatosA'>
                    <div className='MdatoA' style={{width: "940px"}}><h1 style={{color: "#FFFF33", textShadow: "0 0 3px rgb(216, 191, 255), 0 0 6px rgb(216, 191, 255)"}}>Matematicas</h1></div>
                    <div className='MdatoA' style={{width: "60px"}}><h2 style={{textShadow: "0 0 3px rgb(216, 191, 255), 0 0 6px rgb(216, 191, 255)"}}>09:25</h2></div>
                </div>
                <div className='principal'>
                    <div className='pistaA'><p style={{color: "#0D0D0D", fontSize: "16px"}}>Este es un parrafo de prueba solo asegurandonos que las pistas si llegaran hehehe</p></div>
                    <div className='figura'></div>
                    <div className='letras'>
                        <div className='rowL'>
                            <button className='colL'>A</button>
                            <button className='colL'>B</button>
                            <button className='colL'>C</button>
                            <button className='colL'>D</button>
                        </div> 
                        <div className='rowL'>
                            <button className='colL'>E</button>
                            <button className='colL'>F</button>
                            <button className='colL'>G</button>
                            <button className='colL'>H</button>
                        </div> 
                        <div className='rowL'>
                            <button className='colL'>I</button>
                            <button className='colL'>J</button>
                            <button className='colL'>K</button>
                            <button className='colL'>L</button>
                        </div> 
                        <div className='rowL'>
                            <button className='colL'>M</button>
                            <button className='colL'>N</button>
                            <button className='colL'>Ñ</button>
                            <button className='colL'>O</button>
                        </div> 
                        <div className='rowL'>
                            <button className='colL'>P</button>
                            <button className='colL'>Q</button>
                            <button className='colL'>R</button>
                            <button className='colL'>S</button>
                        </div> 
                        <div className='rowL'>
                            <button className='colL'>T</button>
                            <button className='colL'>U</button>
                            <button className='colL'>V</button>
                            <button className='colL'>W</button>
                        </div> 
                        <div className='rowL'>
                            <button className='colL'>X</button>
                            <button className='colL'>Y</button>
                            <button className='colL'>Z</button>
                        </div> 
                    </div>
                </div>
                <div className='secundario'>
                    {arreglo.map((key) => (
                        <input key={key} maxLength={1} readOnly className='letraA'></input>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Ahorcado;