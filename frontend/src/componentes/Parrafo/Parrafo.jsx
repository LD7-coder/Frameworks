import './Parrafo.css';

const palabras = ["fer", "luis", "david", "probar", "hola"];

function Parrafo(){
    return(
        <>
            <div className='divPantallaP'>
                <div className='palabrasB'>
                    {palabras.map((item, key) => (
                        <button className='palabraB' key={key}>{item}</button>
                    ))}
                </div>
                <div className='divParrafo'>

                </div>
            </div>
        </>
    );
}

export default Parrafo;