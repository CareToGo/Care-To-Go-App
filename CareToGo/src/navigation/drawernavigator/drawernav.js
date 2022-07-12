import { createDrawerNavigator } from '@react-navigation/drawer';
import Homescreen from '../../screens/homescreen/homescreen';
import TabNav from '../tabnavigator/tabnav';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerActiveBackgroundColor: '#001A72',
                drawerActiveTintColor: '#FFDE59'
            }}
        >
            <Drawer.Screen name='Home' component={TabNav} />
        </Drawer.Navigator>
    )
}