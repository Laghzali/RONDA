
import { View, StyleSheet, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { TextInput } from 'react-native-web';

function generate_token(length) {
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}
const ClientID = generate_token(5)
localStorage.setItem('ClientID', ClientID)
var socket = io('ws://localhost:3000', { transports: ['websocket'] })

export default function App() {
    const [myRoom, setRoom] = useState()
    const [toJoin, setToJoin] = useState(false)
    const [connected, SetConnected] = useState(false)
    const [onlinePlayers, setOnlinePlayers] = useState(false)


    useEffect(async () => {
        //experimenting
        socket.on(myRoom, msg => {
            console.log(msg)
        })

        //listen for room asignment (first time socket is connected)
        socket.on('room', room => {
            localStorage.setItem('myRoom', room.id)
            setRoom(room.id)
            SetConnected(true)
        })
        //Listen for update players
        socket.on('UPDATE_PLAYERS', length => {
            setOnlinePlayers(length)
        })
        InitGame(myRoom)
        //RECEIVE HAND 
        socket.on('GAME_RECEIVE_HAND', hand => {
            console.log(hand)
        })

    }, [myRoom])

    const InitGame = (R) => {

        R ? socket.emit('GAME_INIT', { id: R, status: 'start', maxplayers: onlinePlayers }) : false
    }
    const JoinSession = async () => {
        //ask server to join me on toJoin Room
        socket.emit('JOIN_ROOM', toJoin)

        //listen on toJoin ID room
        socket.on(toJoin, status => {
            if (status) {
                setRoom(toJoin)
                localStorage.setItem('myRoom', toJoin)
                SetConnected(true)
            }
        })
    }

    return (<View style={styles.container}>
        <View style={styles.sidebar}>

            <Text>Your ROOM ID is: {myRoom} </Text>

            <View style={{ marginTop: 20, flexDirection: 'row' }}>
                <TextInput placeholder={'ROOM ID'} style={styles.input} onChange={e => { setToJoin(e.target.value.toString()) }}></TextInput>
                <Text>Online Players : {onlinePlayers ? onlinePlayers : '1'}</Text>
                <Button style={{ flex: 0 }} title='Join Session' onPress={() => JoinSession()}> </Button>
            </View>
            <Text>{connected ? "Connected to session :  " + myRoom : 'no session'} </Text>


        </View>
        <View style={styles.body}></View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'blue'
    },
    sidebar: {
        flex: 3,
        backgroundColor: 'red'
    },
    body: {
        flex: 9
    },
    input: {
        width: '50%',
        padding: 5,
        backgroundColor: 'white',
        margin: 10,

    }
})