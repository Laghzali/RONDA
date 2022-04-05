
import { View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ronda from './Game';
import styles from './styles';
import { io } from "socket.io-client";
const ronda = Ronda(3)
ronda.init
const players = ronda.Players
ronda.Thrower = 0
var socket = io('ws://localhost:3000', { transports: ['websocket'] })

export default function App() {

  const [PlayerHand, SetPlayerHand] = useState([])
  const [CurTable, SetTable] = useState()
  const [messageText, setMessageText] = React.useState('');
  const [CurrentSession, setSession] = useState()
  useEffect(() => {
    socket.on('message', msg => {
      console.log(msg)
    })
  }, [])

  const Throw = (card) => {
    console.log(socket.emit('message', { status: 'start' }))
    ronda.Throw = { number: card.number, type: card.type }
    SetTable(ronda.CurrentTable)

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
    SetPlayerHand(players)
    let cards = []
    PlayerHand.forEach(player => {
      //USE SERVER SIDE FUNCTION TO DISTRIBUTE IDS AND REPLACE 0 WITH ID ASSIGNED TO CURRENT CLIENT
      if (player.pid == 0) {
        player.phand.map(card => {
          cards.push(<Card disabled={false} key={card.number + card.type} type={card.type} num={card.number}></Card>)
        })

      }
    })
    return cards
  }

  const RenderTable = () => {
    let cards = []
    CurTable ? CurTable.forEach(card => {
      cards.push(<Card disabled={true} key={card.number + card.type} num={card.number} type={card.type}></Card>)
    }) : ''
    return cards
  }

  const Card = ({ back, num, type, disabled }) => {

    let src = require("./img/2D.gif")
    let backcard = require("./img/back.gif")
    if (num != undefined) {
      src = require("./img/" + num + type + ".gif")
    }
    return (<View style={styles.card}>
      <TouchableOpacity disabled={disabled} onPress={() => Throw({ number: num, type: type })}><Image resizeMode='contain' style={styles.img} source={back ? backcard : src} /></TouchableOpacity>

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