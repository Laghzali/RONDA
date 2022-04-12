
import { View, Image, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Avatar, configureFonts } from 'react-native-paper';

const Bont = ({ many }) => {
    let totalBont = []
    for (let x = 0; x < many; x++) {
        console.log('render bont')
        totalBont.push(<Avatar.Image style={{ backgroundColor: 'none' }} size={30} source={require('./assets/bont.png')} />)
    }
    return totalBont
}
const Hbel = ({ many }) => {
    let totalBont = []
    for (let x = 0; x < many; x++) {
        console.log('render bont')
        totalBont.push(<Image style={{ backgroundColor: 'none', width: 34, height: 60 }} resizeMode={'contain'} source={require('./assets/7bel.png')} />)
    }
    return totalBont
}
const RenderScore = ({ score, players }) => {
    let cords = [{ right: '15%', transform: [{ rotate: '270deg' }] }, { top: '20%', transform: [{ rotate: '180deg' }] }, { left: '15%', transform: [{ rotate: '90deg' }] }]
    let map = []
    let map2 = []
    let ind = 0
    score.forEach((score, index) => {
        console.log(players.get(score.p) + ind)
        if (score.p == localStorage.getItem('Ronda_Player_ID')) {
            map.push(<View style={{ width: 50, height: 50, position: 'absolute', bottom: '20%' }} >
                <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 30 }}>
                    <Text> {players.get(score.p)}</Text>
                    <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 10 }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Bont many={score.bont} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Hbel many={score.hbel} />
                        </View>

                    </View>
                </View>
            </View >)
        }
        if (score.p != localStorage.getItem('Ronda_Player_ID')) {
            map2.push(
                <View style={{ width: 50, height: 50, position: 'absolute', ...cords[ind] }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 30 }}>
                        <Text> {players.get(score.p)}</Text>
                        <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 10 }}>

                            <View style={{ flexDirection: 'row' }}>
                                <Bont many={score.bont} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Hbel many={score.hbel} />
                            </View>

                        </View>
                    </View>
                </View>)
            ind += 1
        }
    })


    return map.concat(map2)
}

export default RenderScore