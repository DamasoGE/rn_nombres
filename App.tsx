import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import { consultarProbabilidades } from "./helpers/ConsultasApi";
import { Probabilidad } from "./model/Tipos";
import BienvenidaLayer from "./components/BienvenidaLayer";
import CargaLayer from "./components/CargaLayer";
import ResultadosLayer from "./components/ResultadosLayer";
import BotonModo from "./components/BotonModo";
import InformacionNombres from "./components/InformacionNombres";
import { borrarNombresOffline, getNumeroNombresOffline } from "./helpers/ConsultaAlmacenamientoInterno";

export default function App() {
  const [usarCache, setUserCache ] = useState(true);
  const [onLine, setOnLine] = useState<boolean>(true);
  const [nombre, setNombre] = useState<string>("");
  const [listaProbabilidades, setListaProbabilidades] = useState<Array<Probabilidad>>([]);
  const [capaActiva, setCapaActiva] = useState(1);
  const [totalNombresOffline, setTotalNombresOffline] = useState(0);

  useEffect(() => {
    actualizarNumeroNombres();
  }, [listaProbabilidades]);

  function validarNombre(): boolean {
    return nombre.trim() !== "";
  }

  function botonPulsado() {
    if (validarNombre()) {
      setCapaActiva(2);
      consultarProbabilidades(nombre, onLine, usarCache)
        .then(respuesta => {
          setListaProbabilidades(respuesta);
          setCapaActiva(3);
        })
        .catch(error => {
          Alert.alert("Error", error.toString());
          setCapaActiva(1);
          setOnLine(false);
        });
    } else {
      Alert.alert("Error", "El nombre no puede dejarse vacío");
    }
  }

  function getCapaActiva(): ReactNode {
    return capaActiva === 1 ? (
      <BienvenidaLayer />
    ) : capaActiva === 2 ? (
      <CargaLayer />
    ) : capaActiva === 3 ? (
      <ResultadosLayer listaProbabilidades={listaProbabilidades} />
    ) : (
      <View />
    );
  }

  async function actualizarNumeroNombres() {
    const total = await getNumeroNombresOffline();
    setTotalNombresOffline(total);
  }

  function borrarNombres(){
    Alert.alert(
      "¿Desea borrar todos los datos?",
      "Los datos eliminados no pueden ser ercuperados",
      [{text: "Aceptar", onPress: () => {
        borrarNombresOffline();
        setListaProbabilidades([]);
      } },
        {text: "Cancelar"}
      ]
    )
  }
  return (
    <View style={styles.contenedorPrincipal}>
      <View style={styles.fila}>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          editable={capaActiva !== 2}
          placeholder={"Introduce tu nombre"}
          style={styles.cuadroTexto}
          placeholderTextColor={"#9CA3AF"}
        />
        <Pressable
          onPress={botonPulsado}
          disabled={capaActiva == 2}
          style={({ pressed }) =>
            pressed ? styles.botonPresionado : styles.boton
          }
        >
          <Text style={styles.textoBoton}>Consultar</Text>
        </Pressable>
      </View>

      <View style={styles.contenedorCapas}>{getCapaActiva()}</View>

      <View style={styles.filaFondo}>
        <BotonModo
          texto={"on line"}
          activado={onLine}
          setActivado={setOnLine}
        />
        <BotonModo
          texto={"cache"}
          activado={usarCache}
          setActivado={setUserCache}
        />
        <Pressable onPress={borrarNombres}>
          <InformacionNombres totalNombresOffline={totalNombresOffline} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  boton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
  botonPresionado: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    opacity: 0.85,
  },
  fila: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    columnGap: 20,
    maxHeight: 200,
  },
  cuadroTexto: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: "#d1d5db",
    borderWidth: 1,
    fontSize: 16,
    color: "#111827",
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  contenedorCapas: {
    flex: 1,
  },
  filaFondo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
  },
});
