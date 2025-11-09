import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    texto: string,
    activado: boolean,
    setActivado: React.Dispatch<React.SetStateAction<boolean>>
}

export default function BotonModo({texto, activado, setActivado}: Props) {
  return (
    <Pressable style={styles.contenedor} onPress={()=> setActivado(!activado)}>
      <View style={[styles.circulo, { backgroundColor: activado ? "#34c759" : "#ff3b30"}]}></View>
      <Text>{texto}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        columnGap: 5
    },
    circulo: {
        width: 12,
        height: 12,
        borderRadius: 100
    }
})