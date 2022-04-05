
import { View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ronda from './Game';
import styles from './styles';


const ronda = Ronda(3)
ronda.init
const players = ronda.Players
ronda.Thrower = 1


export default function App() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [PlayerHand, SetPlayerHand] = useState([])
  const [CurTable, SetTable] = useState()
  useEffect(() => {
    SetPlayerHand(players)
    console.log('effect')
  }, [])

  const Throw = (card) => {
    ronda.Throw = { number: card.number, type: card.type }
    SetTable(ronda.CurrentTable)
    forceUpdate()
    SetTable(ronda.CurrentTable)
    console.log(ronda.CurrentTable)
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

  const RenderMyCards = () => {
    let cards = []
    PlayerHand.forEach(player => {
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

  return (
    <View style={styles.container}>
      <View style={styles.OPTOP}>
        <Card back={true}></Card>
        <Card back={true} ></Card>
        <Card back={true}></Card>
        <Card back={true}></Card>
      </View>

      <View style={styles.table}>
        <RenderTable></RenderTable>

      </View>
      <View style={styles.myhand}>
        <RenderMyCards></RenderMyCards>
      </View>
    </View>
  );
}

