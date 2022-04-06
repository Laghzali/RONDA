
import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { TextInput, TouchableOpacity } from 'react-native-web';
import Play from './Play';


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
//var socket = io('ws://localhost:3000', { transports: ['websocket'] })

export default function App() {

    const [myRoom, setRoom] = useState()
    const [toJoin, setToJoin] = useState(false)
    const [connected, SetConnected] = useState(false)
    const [onlinePlayers, setOnlinePlayers] = useState(false)
    const [myHand, setHand] = useState(null)
    const [table, setTable] = useState(null)
    const [gameStatus, setGameStatus] = useState('idle')
    const [socket, setSocket] = useState()
    const [PlayerID, setPlayerID] = useState()
    const [score, setScore] = useState()
    useEffect(() => {
        setSocket(io('ws://localhost:3000', { transports: ['websocket'] }))
    }, [])
    useEffect(() => {
        if (!socket)
            return
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
        //RECEIVE HAND 
        socket.on('GAME_RECEIVE_HAND', hand => {
            setHand(hand)
        })
        //LISTEN TO TABLE CHANGE
        socket.on('GAME_CURRENT_TABLE', xtable => {
            setTable(xtable)

        })
        //LISTEN FOR END GAME
        socket.on('GAME_FINISHED', score => {
            console.log(score)
            setScore(score)

        })
        //Listen to game start
        socket.on('GAME_START', xstatus => {
            setGameStatus('start')
        })
        //Listen for player ID
        socket.on('PLAYER_ID', xid => {
            console.log('pid : ' + xid)
            setPlayerID(xid)

        })
    }, [socket])

    const InitGame = (ROOM) => {
        if (onlinePlayers > 1) {
            ROOM ? socket.emit('GAME_INIT', { id: ROOM, status: 'start', maxplayers: onlinePlayers }) : false
        } else {
            alert('Not enough players')
        }
    }
    const JoinSession = async () => {
        //ask server to join me on toJoin Room
        if (toJoin.length > 0) {
            socket.emit('JOIN_ROOM', toJoin)

        } else {
            alert('Invalid room ID')
        }

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

            <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row' }}>
                <TextInput placeholder={'ROOM ID'} style={styles.input} onChange={e => { setToJoin(e.target.value.toString()) }}></TextInput>
                <TouchableOpacity style={{ backgroundColor: 'red', alignItems: 'center', height: 20, width: 50 }} type={'contained'} title='Join Session' onPress={() => JoinSession()}><Text>Join</Text> </TouchableOpacity>
            </View>
            <Text>{connected ? "Connected to session :  " + myRoom : 'no session'} </Text>
            <Text>Online Players : {onlinePlayers ? onlinePlayers : '1'}</Text>
            <TouchableOpacity style={{ margin: '10%', backgroundColor: 'red', alignItems: 'center', height: 20, width: 50 }} type={'contained'} title='Join Session' onPress={() => InitGame(myRoom)}><Text>START</Text> </TouchableOpacity>



        </View>
        <View style={styles.body}>
            {gameStatus == 'start' && myHand != null ? <Play phand={myHand} table={table} room={myRoom} pid={PlayerID} socket={socket}></Play> : ''}
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    sidebar: {
        flex: 3,
        backgroundColor: 'blue'
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