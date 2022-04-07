import { View, Text } from 'react-native';
import styles from './styles';

import Card from './Card'

const MyHand = ({ hand, socket, room }) => {
    if (!socket)
        return
    return (<View style={styles.myhand}>
        <RenderMyCards room={room} socket={socket} Hand={hand}></RenderMyCards>
    </View>)
}
const RenderMyCards = ({ Hand, socket, room }) => {

    if (Hand == null)
        return (<Text>Walou</Text>)
    let cards = []
    console.log(Hand)
    Hand.PlayerHand.forEach(card => {
        //USE SERVER SIDE FUNCTION TO DISTRIBUTE IDS AND REPLACE 0 WITH ID ASSIGNED TO CURRENT CLIENT
        cards.push(<Card pid={Hand.PlayerID} room={room} disabled={false} socket={socket} key={card.number + card.type} type={card.type} num={card.number}></Card>)
    })
    return cards
}


export default MyHand