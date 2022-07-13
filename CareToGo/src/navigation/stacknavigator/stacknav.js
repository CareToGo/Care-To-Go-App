import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Homescreen from "../../screens/homescreen/homescreen";
import ContractorDetails from "../../screens/contractordetails/contractordetails";
import OrderScreen from "../../screens/orderscreen/orderscreen";
import Datepicker from "../../screens/datepicker/datepicker";
import TabNav from "../tabnavigator/tabnav";

const Stack = createNativeStackNavigator()

export default function StackNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={TabNav} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}