import { StyleSheet, FlatList, View } from 'react-native';
import Resturauntitem from '../../components/resturauntitem';
import resturant from '../../../assets/data/restaurants.json';

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <FlatList
        data={resturant}
        renderItem={({item}) => <Resturauntitem resturant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  }
});