import { View, Text, ImageBackground, Image } from 'react-native';
import styles from './styles';
import TableCard from './TableCard';
import RenderScore from './RenderScore';

const Tabla = ({ table, score, round, players, teamscore }) => {

    return (<View style={styles.tableWrap}>
        <ImageBackground resizeMode='cover' style={styles.table} source={require('./assets/table2.png')}>
            <View style={styles.innerWrap}>
                <View style={styles.innerTable}>
                    <RenderTable table={table}></RenderTable>
                </View>
                <RenderScore teamscore={teamscore} players={players} score={score}></RenderScore>
            </View>
        </ImageBackground>
    </View>)
}

const RenderTable = ({ table }) => {
    if (table == null)
        return (<Text>Walou</Text>)
    let cards = []

    table ? table.forEach(card => {
        cards.push(<TableCard key={card.number + card.type} num={card.number} type={card.type}></TableCard>)
    }) : ''
    return cards
}


export default Tabla