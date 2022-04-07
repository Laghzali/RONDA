
import { View, Image, TouchableOpacity, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import MyHand from './MyHand';
import Tabla from './Table';

export default function Play({ phand, table, socket, room }) {
  const [PlayerHand, setPlayerHand] = useState(null)
  const [CurTable, setCurTable] = useState(null)


  //update table when table state changes
  useEffect(() => {
    console.log('render play')
    setCurTable(table)
  }, [table])

  //update hand when hand state changes
  useEffect(() => {
    setPlayerHand(phand)
  }, [phand])

  return (
    <View style={styles.container}>
      <View style={styles.OPTOP}>
        <Text>TOP</Text>
      </View>
      {CurTable != null ?
        <Tabla table={CurTable}></Tabla>
        : ''}
      {PlayerHand != null ?
        <MyHand room={room} socket={socket} hand={PlayerHand}></MyHand>
        : ''}

    </View>
  );
}