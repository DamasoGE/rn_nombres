import AsyncStorage from "@react-native-async-storage/async-storage"
import { Probabilidad } from "../model/Tipos";

async function getNumeroNombresOffline(): Promise<number> {
    const claves = await AsyncStorage.getAllKeys()
    return claves.length;
}

async function guardarProbabilidad(nombre:string, probabilidades: Array<Probabilidad>) {
    const json = JSON.stringify(probabilidades);
    await AsyncStorage.setItem(nombre, json);
}

async function consultarProbabilidadesOffline(nombre: string){
    let lista = [];
    const json = await AsyncStorage.getItem(nombre);
    if(json!=null){
        lista = JSON.parse(json);
    }
    return lista;
}

async function existeNombre(nombre: string): Promise<boolean>{
    const claves = await AsyncStorage.getAllKeys()
    return claves.includes(nombre);
}

async function borrarNombresOffline() {
    await AsyncStorage.clear();
}

export { getNumeroNombresOffline, guardarProbabilidad, consultarProbabilidadesOffline, existeNombre, borrarNombresOffline }