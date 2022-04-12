
import { View, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Avatar } from 'react-native-paper';
import { io } from "socket.io-client";
import { TextInput, Button, Text } from 'react-native-paper';

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
    const [name, setName] = useState()
    const [NameValue, setNameValue] = useState()
    const [Turn, setTurn] = useState()
    const [currentPlayers, setPlayers] = useState()
    const [round, setRound] = useState()
    useEffect(() => {
        setSocket(io('ws://localhost:3000', { transports: ['websocket'] }))
    }, [])
    useEffect(() => {

        if (!socket)
            return
        localStorage.setItem('socketID', socket.id)
        //check if player already registered
        if (localStorage.getItem('Ronda_Client_Name')) {
            setName(localStorage.getItem('Ronda_Client_Name'))
        } else {
            setName(false)
            console.log('here')
        }
        //experimenting
        socket.emit('SAVE_MY_NAME_KURWA', localStorage.getItem('Ronda_Client_Name'))

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
            console.log('received table');
            console.log(xtable)
            setTable(xtable)

        })
        //LISTEN FOR END GAME
        socket.on('GAME_FINISHED', data => {
            console.log('FINIIIIIISHED RECEIVED')
            console.log(data)

        })
        //LISTEN FOR ROUND CHANGE
        socket.on('GAME_RECEIVE_ROUND', round => {
            console.log('warouuuuund', round)
            setRound(round)
        })

        //LISTEN FOR SCORE CHANGE
        socket.on('GAME_RECEIVE_SCORE', score => {
            console.log(score)
            setScore(score)
        })
        //Listen to game start
        socket.on('GAME_START', xstatus => {
            socket.on
            setGameStatus('start')
        })
        //Listen for player ID
        socket.on('PLAYER_ID', xid => {
            localStorage.setItem('Ronda_Player_ID', xid)
            console.log(xid)
            setPlayerID(xid)

        })
        //LISTEN FOR CURRENT PLAYERS
        socket.on('CURRENT_PLAYERS', data => {
            let players = new Map()
            data.forEach(player => {
                players.set(player.cid, player.cname)
            })
            setPlayers(players)

            console.log(data)
        })
        //Listen for Player turn
        socket.on('PLAYER_TURN', turn => {
            console.log('ITS TURN : ' + turn)
            setTurn(turn)
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
            socket.emit('JOIN_ROOM', { room: toJoin, pname: localStorage.getItem('Ronda_Client_Name') })

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
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
                <Avatar.Image size={120} source={require('./assets/logo.jpg')} />

            </View>
            {name && gameStatus === 'idle' ?
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Your ROOM ID is: </Text>
                        <Text style={{ fontWeight: 'bold', color: 'lightgreen', fontSize: 15 }}>{myRoom}</Text>
                    </View>

                    <View style={{ marginTop: 20, marginBottom: 20, alignItems: 'center', flexDirection: 'row' }}>
                        <TextInput placeholder={'ROOM ID'} style={styles.input} onChange={e => { setToJoin(e.target.value.toString()) }}></TextInput>
                        <Button mode="contained" onPress={() => JoinSession()}>Join </Button>
                    </View>
                    <Text style={{ fontWeight: '600', color: 'white' }}>{connected ? "Connected to session :  " + myRoom : ''} </Text>
                    <Text style={{ fontWeight: '600', color: 'lightgreen' }}>Online Players : {onlinePlayers ? onlinePlayers : '1'}</Text>
                    <Button mode="contained" style={{ marginTop: 20 }} onPress={() => InitGame(myRoom)}><Text>START</Text> </Button>
                </View>
                : <>
                    {gameStatus === 'start' ?
                        <View>
                            <View style={{ flexDirection: 'Column', alignItems: 'center' }}>

                                <Text>EMPTY</Text>

                            </View>
                        </View> : <View>
                            <View style={{ marginTop: 20, marginBottom: 20, alignItems: 'center', flexDirection: 'row' }}>
                                <TextInput placeholder={'Your name'} style={{ height: '100%', width: '80%', marginRight: 10, backgroundColor: 'white' }} onChange={e => { setNameValue(e.target.value.toString()) }}></TextInput>
                                <Button mode="contained" onPress={() => { localStorage.setItem('Ronda_Client_Name', NameValue), setName(NameValue) }}>Join </Button>
                            </View>
                        </View >}
                </>
            }


        </View>
        <View style={styles.body}>
            {gameStatus == 'start' && myHand != null ? <Play players={currentPlayers} score={score} phand={myHand} table={table} room={myRoom} round={round} socket={socket}></Play> : ''}
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
        flex: 2,
        borderRadius: 5,
        shadowColor: "#FF6F61",
        padding: 50,
        backgroundColor: '#34568B'
    },
    body: {
        flex: 10
    },
    input: {

        height: '100%', width: '70%', marginRight: 10, backgroundColor: 'white',


    }
})