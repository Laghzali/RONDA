
import { View, Image, TouchableOpacity, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';

export default function Play({ phand, table, socket, room, pid }) {
  const [PlayerHand, setPlayerHand] = useState(null)
  const [CurTable, setCurTable] = useState(null)


  useEffect(() => {
    socket.on('GAME_CURRENT_TABLE', xtable => {
      setCurTable(xtable)
      console.log(xtable)
    })
    setCurTable(table)
    setPlayerHand(phand)
  }, [socket, PlayerHand, table])

  const Throw = (card) => {
    socket.emit('GAME_THROW', { room: room, number: card.number, type: card.type, pid: pid })
  }
  const Myhand = () => {
    return (<View style={styles.myhand}>
      <RenderMyCards></RenderMyCards>
    </View>)
  }
  const Tabla = () => {

    return (<View style={styles.table}>
      <RenderTable></RenderTable>
    </View>)
  }

  const RenderMyCards = () => {

    if (PlayerHand == null)
      return (<Text>Walou</Text>)
    let cards = []
    console.log(PlayerHand.PlayerHand)
    PlayerHand.PlayerHand.forEach(card => {
      //USE SERVER SIDE FUNCTION TO DISTRIBUTE IDS AND REPLACE 0 WITH ID ASSIGNED TO CURRENT CLIENT
      cards.push(<Card disabled={false} key={card.number + card.type} type={card.type} num={card.number}></Card>)
    })
    return cards
  }

  const RenderTable = () => {
    if (PlayerHand == null)
      return (<Text>Walou</Text>)
    let cards = []

    CurTable ? CurTable.forEach(card => {
      cards.push(<Card disabled={true} key={card.number + card.type} num={card.number} type={card.type}></Card>)
    }) : ''
    console.log(cards)
    return cards
  }

  const Card = ({ back, num, type, disabled }) => {

    let src = require("./img/2D.gif")
    let backcard = require("./img/back.gif")
    if (num != undefined) {
      src = require("./img/" + num + type + ".gif")
    }
    return (<View style={styles.card}>
      <TouchableOpacity disabled={back ? true : disabled} onPress={() => Throw({ number: num, type: type })}><Image resizeMode='contain' style={styles.img} source={back ? backcard : src} /></TouchableOpacity>

    </View>)
  }


  return (
    <View style={styles.container}>
      <View style={styles.OPTOP}>
        <Card back={true}></Card>
        <Card back={true} ></Card>
        <Card back={true}></Card>
        <Card back={true}></Card>
      </View>

      <Tabla></Tabla>
      <Myhand></Myhand>

    </View>
  );
}