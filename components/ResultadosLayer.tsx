import { FlatList, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Probabilidad } from '../model/Tipos'
import ItemPaisProbabilidad from './ItemPaisProbabilidad'

type Prop = {
    listaProbabilidades: Array<Probabilidad>
}

export default function ResultadosLayer({listaProbabilidades}: Prop) {
  return (
    <FlatList
            data={listaProbabilidades}
            renderItem={ItemPaisProbabilidad}
            keyExtractor={item => item.country_id}
            ListEmptyComponent={() => <Text style={{margin: "auto"}}>No se han encontrado resultados</Text>}
    />
  )
}

const styles = StyleSheet.create({})