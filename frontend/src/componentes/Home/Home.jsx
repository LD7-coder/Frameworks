import "./Home.css";
import imgSopa from "../../assets/sopaLetras.png";
import imgAhorcado from "../../assets/elAhorcado.png";
import imgFrase from "../../assets/completaFrase.png";
import imgCombo from "../../assets/comboTres.png";
import { useNavigate } from "react-router-dom";

const Home = () =>{
    const setLink = useNavigate();

    return(
        <div className="contenedor-home">
            <h1>WELCOME</h1>
            <h3>¡Selecciona un juego!</h3>
            <div className="juegos">
                <div onClick={() => setLink("/file")}>
                    <img src={imgSopa} alt="SopaLetras" />
                </div>
                <div onClick={() => setLink("/file")}>
                    <img src={imgAhorcado} alt="Ahorcado"/>
                </div>
                <div onClick={() => setLink("/file")}>
                    <img src={imgFrase} alt="Frase"/>
                </div>
                <div onClick={() => setLink("/file")}>
                    <img src={imgCombo} alt="Frase"/>
                </div>
            </div>
        </div>
    );
}

export default Home;