import axios from "axios";
import { Probabilidad } from "../model/Tipos";
import { consultarProbabilidadesOffline, existeNombre, guardarProbabilidad } from "./ConsultaAlmacenamientoInterno";

async function consultarProbabilidades(nombre: string, onLine: boolean, usarCache: boolean){
  let resultado = [];
  if(onLine){
    if(usarCache){
      const existe = await existeNombre(nombre);
      if(existe){
        resultado = await consultarProbabilidadesOffline(nombre);
      }else{
        resultado = await consultarProbabilidadesApi(nombre);
      }
    }else{
        resultado = await consultarProbabilidadesApi(nombre);
    }
  }else{
    if(usarCache){
      resultado = await consultarProbabilidadesOffline(nombre);
    }
  }

  return resultado;
  
}

async function consultarProbabilidadesApi(
  nombre: string
): Promise<Array<Probabilidad>> {
  const endpoint = `https://api.nationalize.io/`;
  const configuracion = {
    params: { name: nombre },
    headers: {
      User_Agent: "Nombres/1.0 (correo@dominio.com)",
      Accept: "application/json",
    },
  };

  const respuestaServidor = await axios.get(endpoint, configuracion);
  const resultado = respuestaServidor.data.country;
  const listaPromises = resultado.map(rellenarCampoPais);
  const resultados = await Promise.all(listaPromises);
  await guardarProbabilidad(nombre, resultado);
  return resultados;
}

async function rellenarCampoPais(objecto: Probabilidad): Promise<Probabilidad>{
    objecto.pais = await consultarNombrePais(objecto.country_id);
    return objecto;
}

async function consultarNombrePais(codigo: string): Promise<string> {
  const endpoint = `https://restcountries.com/v3.1/alpha/${codigo}`;
  const respuesta = await axios.get(endpoint);
  return respuesta.data[0].translations.spa.common;
}

export { consultarProbabilidades, consultarNombrePais };
