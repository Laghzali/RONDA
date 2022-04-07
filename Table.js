import { View, Text } from 'react-native';
import Card from './Card'
import styles from './styles';

const Tabla = ({ table }) => {

    return (<View style={styles.table}>
        <RenderTable table={table}></RenderTable>
    </View>)
}

const RenderTable = ({ table }) => {
    if (table == null)
        return (<Text>Walou</Text>)
    let cards = []

    table ? table.forEach(card => {
        cards.push(<Card disabled={true} key={card.number + card.type} num={card.number} type={card.type}></Card>)
    }) : ''
    return cards
}


export default Tabla