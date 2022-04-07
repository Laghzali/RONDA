
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';



const Throw = (socket, card, room, pid) => {

    socket.emit('GAME_THROW', { room: room, number: card.number, type: card.type, pid: pid })
}

const Card = ({ back, num, type, disabled, socket, room, pid }) => {

    let src = require("./img/2D.jpg")
    let backcard = require("./img/back.jpg")
    if (num != undefined) {
        src = require("./img/" + num + type + ".jpg")
    }
    return (<View style={styles.card}>
        <TouchableOpacity disabled={back ? true : disabled} onPress={() => Throw(socket, { number: num, type: type }, room, pid)}><Image resizeMode='contain' style={styles.img} source={back ? backcard : src} /></TouchableOpacity>

    </View>)
}

export default Card