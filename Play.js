
import { View, Text, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import MyHand from './MyHand';
import Tabla from './Table';
import CustomOverlay from './Overlay';





export default function Play({ phand, table, socket, room, round, score }) {
  const [PlayerHand, setPlayerHand] = useState(null)
  const [CurTable, setCurTable] = useState(null)

  //update table when table state changes
  useEffect(() => {
    setCurTable(table)
    console.log(round)
  }, [table])

  //update hand when hand state changes
  useEffect(() => {
    setPlayerHand(phand)
  }, [phand])

  return (
    <View style={styles.container}>

      {round > 0 ? <CustomOverlay round={round}></CustomOverlay> : ''}

      {CurTable != null ?
        <Tabla score={score} table={CurTable}></Tabla>
        : ''}

      {
        PlayerHand != null ?
          <MyHand room={room} socket={socket} hand={PlayerHand}></MyHand>
          : ''
      }

    </View >
  );
}