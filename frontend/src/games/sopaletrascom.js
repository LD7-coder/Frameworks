import Sopa from "../componentes/Sopa/Sopa";

function CrearMatriz(tam) {
  let matriz = new Array(tam);
  for (let i = 0; i < tam; i++) {
    matriz[i] = new Array(tam);
    for (let j = 0; j < tam; j++) {
      matriz[i][j] = "";
    }
  }
  return matriz;
}

function LlenarSopa(matriz) {
  const tam = matriz.length;
  const letras = "abcdefghijklmnñopqrstuvwxyz";
  for (let x = 0; x < tam; x++) {
    for (let y = 0; y < tam; y++) {
      if (matriz[x][y] === "") {
        matriz[x][y] = letras[Math.floor(Math.random() * letras.length)];
      }
    }
  }
  return matriz;
}

function MostrarMatriz(matriz) {
  for (let i = 0; i < matriz.length; i++) {
    console.log(matriz[i].join(" "));
  }
}

function ColocarPalabras(matriz, palabras) {
  let completo = false;
  while (!completo) {
    for (let i = 0; i < palabras.length - 2; i++) {
      let terminado = false;
      while (!terminado) {
        let d = Math.floor(Math.random() * 8) + 1;
        let x = Math.floor(Math.random() * matriz.length);
        let y = Math.floor(Math.random() * matriz.length);
        if (VerSiCabe(matriz, palabras[i], x, y, d)) {
          Colocar(matriz, palabras[i], x, y, d);
          terminado = true;
        }
      }
    }
    completo = true;
  }

  for (let i = palabras.length - 2; i < palabras.length; i++) {
    let palabra = palabras[i];
    let coincidencias = BuscarCoincidencias(matriz, palabra);
    let colocado = false;

    for (let c of coincidencias) {
      for (let d = 1; d <= 8; d++) {
        if (VerSiCabeConCruce(matriz, palabra, c.x, c.y, d, c.indicePalabra)) {
          ColocarConCruce(matriz, palabra, c.x, c.y, d, c.indicePalabra);
          colocado = true;
          break;
        }
      }
      if (colocado) break;
    }

    // Si no se pudo cruzar, colocar normal
    if (!colocado) {
      let terminado = false;
      while (!terminado) {
        let d = Math.floor(Math.random() * 8) + 1;
        let x = Math.floor(Math.random() * matriz.length);
        let y = Math.floor(Math.random() * matriz.length);
        if (VerSiCabe(matriz, palabra, x, y, d)) {
          Colocar(matriz, palabra, x, y, d);
          terminado = true;
        }
      }
    }
  }
}

function VerSiCabe(matriz, palabra, x, y, d) {
  switch (d) {
    case 1: // HORIZONTAL DERECHA
      if (y + palabra.length <= matriz.length) {
        for (let i = 0; i < palabra.length; i++) {
          if (matriz[x][y + i] !== "") return false;
        }
        return true;
      }
      return false;
    case 2: // HORIZONTAL IZQUIERDA
      if (y - (palabra.length - 1) >= 0) {
        for (let i = 0; i < palabra.length; i++) {
          if (matriz[x][y - i] !== "") return false;
        }
        return true;
      }
      return false;
    case 3: // VERTICAL ABAJO
      if (x + palabra.length <= matriz.length) {
        for (let i = 0; i < palabra.length; i++) {
          if (matriz[x + i][y] !== "") return false;
        }
        return true;
      }
      return false;
    case 4: // VERTICAL ARRIBA
      if (x - (palabra.length - 1) >= 0) {
        for (let i = 0; i < palabra.length; i++) {
          if (matriz[x - i][y] !== "") return false;
        }
        return true;
      }
      return false;
    case 5: // DIAGONAL ABAJO DERECHA
      if (x + palabra.length <= matriz.length && y + palabra.length <= matriz.length) {
        for (let i = 0; i < palabra.length; i++) {
          if (matriz[x + i][y + i] !== "") return false;
        }
        return true;
      }
      return false;
    case 6: // DIAGONAL ABAJO IZQUIERDA
      if (x + palabra.length <= matriz.length && y - (palabra.length - 1) >= 0) {
        for (let i = 0; i < palabra.length; i++) {
          if (matriz[x + i][y - i] !== "") return false;
        }
        return true;
      }
      return false;
    case 7: // DIAGONAL ARRIBA DERECHA
      if (x - (palabra.length - 1) >= 0 && y + palabra.length <= matriz.length) {
        for (let i = 0; i < palabra.length; i++) {
          if (matriz[x - i][y + i] !== "") return false;
        }
        return true;
      }
      return false;
    case 8: // DIAGONAL ARRIBA IZQUIERDA
      if (x - (palabra.length - 1) >= 0 && y - (palabra.length - 1) >= 0) {
        for (let i = 0; i < palabra.length; i++) {
          if (matriz[x - i][y - i] !== "") return false;
        }
        return true;
      }
      return false;
    default:
      return false;
  }
}

function Colocar(matriz, palabra, x, y, d) {
  switch (d) {
    case 1: for (let i = 0; i < palabra.length; i++) matriz[x][y + i] = palabra[i].toUpperCase(); break;
    case 2: for (let i = 0; i < palabra.length; i++) matriz[x][y - i] = palabra[i].toUpperCase(); break;
    case 3: for (let i = 0; i < palabra.length; i++) matriz[x + i][y] = palabra[i].toUpperCase(); break;
    case 4: for (let i = 0; i < palabra.length; i++) matriz[x - i][y] = palabra[i].toUpperCase(); break;
    case 5: for (let i = 0; i < palabra.length; i++) matriz[x + i][y + i] = palabra[i].toUpperCase(); break;
    case 6: for (let i = 0; i < palabra.length; i++) matriz[x + i][y - i] = palabra[i].toUpperCase(); break;
    case 7: for (let i = 0; i < palabra.length; i++) matriz[x - i][y + i] = palabra[i].toUpperCase(); break;
    case 8: for (let i = 0; i < palabra.length; i++) matriz[x - i][y - i] = palabra[i].toUpperCase(); break;
  }
}

function BuscarCoincidencias(matriz, palabra) {
  let coincidencias = [];
  for (let x = 0; x < matriz.length; x++) {
    for (let y = 0; y < matriz.length; y++) {
      let letra = matriz[x][y];
      if (letra !== "" && palabra.includes(letra)) {
        coincidencias.push({
          x,
          y,
          letra,
          indicePalabra: palabra.indexOf(letra)
        });
      }
    }
  }
  return coincidencias;
}

function VerSiCabeConCruce(matriz, palabra, x, y, d, indicePalabra) {
  const n = matriz.length;

  for (let i = 0; i < palabra.length; i++) {
    let dx = 0, dy = 0;
    switch (d) {
      case 1: dy = i - indicePalabra; break; // DERECHA
      case 2: dy = indicePalabra - i; break; // IZQUIERDA
      case 3: dx = i - indicePalabra; break; // ABAJO
      case 4: dx = indicePalabra - i; break; // ARRIBA
      default: return false;
    }

    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || ny < 0 || nx >= n || ny >= n) return false;

    if (matriz[nx][ny] !== "" && matriz[nx][ny] !== palabra[i].toUpperCase()) return false;
  }

  return true;
}

function ColocarConCruce(matriz, palabra, x, y, d, indicePalabra) {
  for (let i = 0; i < palabra.length; i++) {
    let dx = 0, dy = 0;
    switch (d) {
      case 1: dy = i - indicePalabra; break;
      case 2: dy = indicePalabra - i; break;
      case 3: dx = i - indicePalabra; break;
      case 4: dx = indicePalabra - i; break;
    }
    const nx = x + dx;
    const ny = y + dy;
    matriz[nx][ny] = palabra[i].toUpperCase();
  }
}

function SopaLetras(palabras, tam) {
  let matriz = CrearMatriz(tam);
  ColocarPalabras(matriz, palabras);
  matriz = LlenarSopa(matriz);
  MostrarMatriz(matriz);
  return { matriz, palabras };
}

export default SopaLetras;
