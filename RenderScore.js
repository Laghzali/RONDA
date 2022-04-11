
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
const RenderScore = ({ score }) => {
    let cords = [{ bottom: '20%' }, { top: '20%', transform: [{ rotate: '180deg' }] }, { right: '15%', transform: [{ rotate: '270deg' }] }, { left: '15%', transform: [{ rotate: '90deg' }] }]

    return score.map((score, index) => {
        return (<View style={{ width: 50, height: 50, position: 'absolute', ...cords[index] }}>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 30 }}>
                <Text> {score.cname}</Text>
                <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 10 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Bont many={score.bont} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Hbel many={score.hbel} />
                    </View>

                </View>
                <Avatar.Image source={{ uri: 'https://w7.pngwing.com/pngs/312/283/png-transparent-man-s-face-avatar-computer-icons-user-profile-business-user-avatar-blue-face-heroes-thumbnail.png' }} size={40}></Avatar.Image>

            </View>
        </View>)
    })

}

export default RenderScore