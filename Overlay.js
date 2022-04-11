import { Overlay } from 'react-native-elements'
import { Image, Animated, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';


export default function CustomOverlay({ round }) {
    const fadeIn = useState(new Animated.Value(Dimensions.get('window').width * 2))[0]

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true)
        console.log(fadeIn)
        Animated.timing(
            fadeIn,
            {
                toValue: 0,
                duration: 3000,
            }
        ).start(() => {
            setVisible(false)
        });

    }, [round, fadeIn])

    return (
        <Overlay overlayStyle={{ backgroundColor: 'transparent', borderWidth: 0, shadowOffset: 0, shadowRadius: 0, shadowColor: 'none' }} backdropStyle={{ backgroundColor: 'black', opacity: 0.1 }} isVisible={visible}>
            <Animated.View>
                <Image resizeMode='contain' style={{ width: 400, height: 100 }} source={require('./assets/roundend.png')} />
            </Animated.View>
        </Overlay>
    )

}