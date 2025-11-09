import axios from "axios";
import { Probabilidad } from "../model/Tipos";

async function consultarProbabilidades(
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
  const listaPromises = resultado.map(rellenarCampoPais)
  return await Promise.all(listaPromises);
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
