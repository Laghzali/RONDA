
import { View, Image } from 'react-native';
import styles from './styles';





const TableCard = ({ num, type }) => {

    let src = require("./img/" + num + type + ".jpg")
    return (
        <View style={styles.tableCard}>
            <Image resizeMode='contain' style={styles.img} source={src} />
        </View>

    )
}

export default TableCard