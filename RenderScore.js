
import { View, Image, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Avatar } from 'react-native-paper';

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
const RenderScore = ({ score, players, teamscore }) => {
    let cords = [{ right: '15%', transform: [{ rotate: '270deg' }] }, { top: '20%', transform: [{ rotate: '180deg' }] }, { left: '15%', transform: [{ rotate: '90deg' }] }]
    let map = []
    let map2 = []
    let ind = 0
    if (score.length == 2) {
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

    }
    if (score.length == 4) {

        map.push(<View style={{ width: 50, height: 50, position: 'absolute', bottom: '20%' }} >
            <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 30 }}>
                <Text> TEAM 1</Text>
                <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 10 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Bont many={localStorage.getItem('Ronda_Player_ID') == 0 || localStorage.getItem('Ronda_Player_ID') == 2 ? teamscore[0].bont : teamscore[1].bont} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Hbel many={localStorage.getItem('Ronda_Player_ID') == 0 || localStorage.getItem('Ronda_Player_ID') == 2 ? teamscore[0].hbel : teamscore[1].hbel} />
                    </View>

                </View>
            </View>
        </View >)

        map2.push(
            <View style={{ width: 50, height: 50, position: 'absolute', right: '15%', transform: [{ rotate: '270deg' }] }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 30 }}>
                    <Text> TEAM 2</Text>
                    <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 10 }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Bont many={localStorage.getItem('Ronda_Player_ID') == 0 || localStorage.getItem('Ronda_Player_ID') == 2 ? teamscore[1].bont : teamscore[0].bont} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Hbel many={localStorage.getItem('Ronda_Player_ID') == 0 || localStorage.getItem('Ronda_Player_ID') == 2 ? teamscore[1].hbel : teamscore[0].hbel} />
                        </View>

                    </View>
                </View>
            </View>)
    }
    return map.concat(map2)
}

export default RenderScore