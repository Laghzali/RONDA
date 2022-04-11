import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems: 'center',


  },
  myhand: {
    flexDirection: 'row',
    marginTop: 'auto',
    backgroundColor: 'transparent',
    width: '100%',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'

  },
  OPTOP: {
    flexDirection: 'row',

  },
  card: {
    alignItems: 'flex-start',
    width: '10%',
    height: '80%'

  },
  tableCard: {

    width: '12%',
    height: '28%'
  },
  img: {
    width: '100%',
    height: '100%'
  },
  tableWrap: {
    height: '100%',
    width: '100%',
    flex: 12,
    flexDirection: 'row',


  }, table: {

    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }, innerTable: {

    margin: '10%',
    borderWidth: 2,
    borderColor: 'red',
    height: '50%',
    width: '50%',
    flexDirection: 'row',
    flexWrap: 'wrap',

    padding: 5

  }, innerWrap: {

    padding: 20,

    margin: '20%',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }


});
export default styles  