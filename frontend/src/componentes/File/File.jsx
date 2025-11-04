import "./File.css"; 
import imgFile from "../../assets/imgFile.png";

let title = "SOPA DE LETRAS";

const File = () => {
    return(
        <div className="contenedor-file">
            <h1>{title}</h1>
            <div className="archivo">
                <div>
                    <img src={imgFile} alt="File"/>
                </div>
            </div>
        </div>
    );
}

export default File;