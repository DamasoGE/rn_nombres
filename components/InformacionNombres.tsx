import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    totalNombresOffline: number
}

export default function InformacionNombres({totalNombresOffline}: Props) {
  return (
    <View>
      <Text>Nombres almacenados: {totalNombresOffline}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})