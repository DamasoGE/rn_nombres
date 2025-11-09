import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    size?: 'small' | 'large' | number,
    color?: string
}

export default function CargaLayer({size = "large", color = "#0000ff"}: Props) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>Cargando Datos</Text>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

const styles = StyleSheet.create({
        contenedor: {
        paddingHorizontal: 20,
        flex: 1,
        alignItems: "center",
        marginTop: 300,
    },
    texto: {
        color: "#111827",
        marginBottom: 30
    }
})