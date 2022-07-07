import { StyleSheet, Text, View, Image, FlatList} from 'react-native';
import Contractor from '../../components/contractorcomponent/contractor';
import restaurants from '../../../assets/data/restaurants.json';

export default function Homescreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={({item}) => <Contractor restaurant={item}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 110,
    left: 20
  }
});
