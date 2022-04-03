import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image } from 'react-native';
import React, { useState, useEffect } from 'react';


export default function App() {
  class Table{
    CurrentTable = [];
    CurrentScore = []
    CurrentPlayers = []
    LastThrower;
    LastCard;
    CurrentTurn = 0;
    constructor(Players) {
      this.maxPlayers = Players;
    }
    get initiate() {
      function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
      }
  
      const CTypes = ['A','B','C','D']
      const CNumbers = [1,2,3,4,5,6,7,10,11,12]
      const deck = []
      CNumbers.forEach((NUM) => {
        CTypes.flatMap(TYPE =>{
  
          deck.push( {number : NUM , type : TYPE })
        })
      })
      shuffle(deck)
      var SliceStart = 0
      var SliceEnd = 5
      
      for(var x = 0 ; x < this.maxPlayers ; x++) {
        this.CurrentScore.push({p : 1 , score : 0})
        let player = new Player(x)
        this.CurrentPlayers.push[player]
        player.setHand = deck.slice(SliceStart ,SliceEnd)
        SliceEnd+=5
        SliceStart+=5
      }
      
    }
    set Thrower(ID) {
      this.LastThrower = ID;
    }
    set Throw(ThrownCard ) {
      let ToBeRemoved = []
      if(this.CurrentTable.includes(ThrownCard.number)) {
        if(this.LastCard == this.CurrentTable.includes(ThrownCard.number)){
          console.log('BONT')
        }

        for(var x = 0 ; x < this.CurrentTable.length ; x++){
          
          if(this.CurrentTable.includes(ThrownCard.number+x)){

            this.CurrentScore.forEach( score => {
              this.CurrentTable.forEach((card , index) => {
                if(card == ThrownCard.number+x) {
                  ToBeRemoved.push(index)

                }
              })

              if(score.p == this.LastThrower) {
                score.score +=1

              }
            })
          }
        }
        if(ToBeRemoved.length == this.CurrentTable.length) {
          console.log('MISA')
        }

      } else {
        this.CurrentTable.push(ThrownCard.number)
        this.LastCard = ThrownCard.number;
      }
      ToBeRemoved.forEach( card => {
        this.CurrentTable.splice(card)
      })
      console.log(this.CurrentTable)
      this.Turn += 1 
    }
  }
  
  class Player {
    PlayerHand;
    PlayerID;
  
    constructor(ID) {
      this.id = ID;
    }
    set setHand(cards) {
      this.PlayerHand = cards
  
    }
    get getHand() {
  
      console.log(this.PlayerHand)
    }
  }
  useEffect(() => {
    let table = new Table(1)
    table.initiate
    table.Thrower = 1
    table.Thrower = 5

    table.Throw = {number : 3  , type : 'syof'}
    table.Throw = {number : 4  , type : 'syof'}
    table.Throw = {number : 5 , type : 'syof'}
    table.Throw = {number : 6  , type : 'syof'}

    table.Throw = {number : 8  , type : 'syof'}






  })
  const Card = () => {
    return (<View style={styles.card}>
      <Image resizeMode='contain' style={styles.img} source = {require('./img/00.gif')}  />
    </View>)
  }
  return (
    <View style={styles.container}>
      <View style={styles.table}>

      </View>
      <View style={styles.myhand}>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </View>
      <View style={styles.op1}>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </View>

    </View>
  );        
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    backgroundColor:'green'
  },  
  myhand : {
    flex:2,
    flexDirection:'row',
    width:'80%',
    alignSelf:'center',
    justifyContent : 'center'
  },
  table : {

    flex:5,
    backgroundColor:'green'
  },
  card: {
  

  },
  img : {
    width:110,
    height:150,
  },
  op1:{

}
});
