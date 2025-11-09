import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function BienvenidaLayer() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>
        Introduce un nombre y pulsa el botón de consultar para conocer los
        ligares del mundo donde es más frecuente encontrarlo.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        paddingHorizontal: 40,
        flex: 1,
        alignItems: "center",
        marginTop: 300,
    },
    texto: {
        color: "#111827"
    }
})