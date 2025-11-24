import React, { useState, useRef } from 'react';
import "./File.css"; 
import imgFile from "../../assets/imgFile.png";

//desde aqui importa los juegos luis 
//import Ahorcado from 'donde este el ahorcado'; 


let title = "SOPA DE LETRAS";

const File = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [gameData, setGameData] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            setError(null);
            setGameData(null); 
        } else {
            setSelectedFile(null);
            setError("Por favor, selecciona un archivo PDF válido.");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setIsLoading(true);
        setError(null);
        setGameData(null);

        const formData = new FormData();
        formData.append('pdfFile', selectedFile);

        try {
            const response = await fetch('http://localhost:3000/api/analyze-pdf', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Hubo un problema al analizar el PDF.');
            }
            
            // se guarda la respuesta
            setGameData(data);
            console.log('Datos de juegos recibidos:', data);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onDropZoneClick = () => {
        fileInputRef.current.click();
    };

    return(
        <div className="contenedor-file">
            <input 
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} 
            />

            <h1>{title}</h1>

            <div className="archivo">
                <div onClick={onDropZoneClick} style={{ cursor: 'pointer' }}> 
                    {!selectedFile ? (
                        <>
                            <img src={imgFile} alt="File"/>
                            <p>Haz clic para subir tu PDF</p>
                        </>
                    ) : (
                        <div>
                            <p>Archivo seleccionado:</p>
                            <p><strong>{selectedFile.name}</strong></p>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="upload-controls">
                <button 
                    onClick={handleUpload} 
                    disabled={!selectedFile || isLoading}
                >
                    {isLoading ? 'Analizando con IA...' : 'Generar Juegos'}
                </button>

                {error && <p className="error-message">{error}</p>}
                {gameData && <p className="success-message">¡Análisis completado! Abajo están tus juegos.</p>}
            </div>

            {/* aqui estan las palabraaaas */}
            {gameData && (
                <div className="zona-de-juegos" style={{ marginTop: '50px', width: '100%' }}>
                    
                    <h2 style={{color: 'white', textAlign: 'center'}}>Juegos Generados por IA</h2>
                    
                    {/* ahorcado */}
                    <Ahorcado datos={gameData.ahorcado} />

                    {/*  sopa d letras */}
                    <SopaDeLetras palabras={gameData.sopaDeLetras} />

                    {/* crucigrama */}
                    <Crucigrama items={gameData.crucigrama} />
                    
                    {/* completar */}
                    <CompletarFrase ejercicios={gameData.completarFrase} />

                </div>
            )}
        </div>
    );
}

export default File;