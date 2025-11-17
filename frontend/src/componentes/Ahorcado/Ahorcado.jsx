import './Ahorcado.css';

const arreglo = ["a", "e", "i", "o", "u"];

function Ahorcado(){
    return(
        <>
            <div className='divPantallaA'>
                <div className='principal'>
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
                        <input key={key} className='letraA'></input>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Ahorcado;