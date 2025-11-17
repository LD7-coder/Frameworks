import { Routes, Route, Router } from "react-router-dom";
import Login from "../src/componentes/Login/Login";
import Registro from "../src/componentes/Registro/Registro";
import Home from "../src//componentes/Home/Home";
import File from "../src/componentes/File/File";
import Sopa from "../src/componentes/Sopa/Sopa";
import Crucigrama from "../src/componentes/Crucigrama/Crucigrama";
import Ahorcado from "../src/componentes/Ahorcado/Ahorcado";
import Parrafo from "../src/componentes/Parrafo/Parrafo";
//import Timer from "./componentes/Timer/Timer";

//Este es un comando de prueba para unirme a colaborar

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/home" element={<Home />} />
      <Route path="/file" element={<File />}></Route>
    </Routes>
  );
}

export default App;
