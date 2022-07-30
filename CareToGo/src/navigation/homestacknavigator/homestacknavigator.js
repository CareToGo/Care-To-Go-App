import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from "../../screens/homescreen/homescreen";
import ContractorDetails from '../../screens/contractordetails/contractordetails';
import OrderScreen from '../../screens/orderscreen/orderscreen';
import Datepicker from '../../screens/datepicker/datepicker';
import Appointments from "../../screens/appointments/appointments";
import InstantPayments from "../../screens/paymentscreens/instantpayment";
import ScheduledPayments from "../../screens/paymentscreens/scheduledpayment";

const HomeStack = createNativeStackNavigator()

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='contrator-list' component={Homescreen} options={{headerShown: false}} />
            <HomeStack.Screen name='contractor-details' component={ContractorDetails} options={{headerShown: false}}/>
            <HomeStack.Screen name='orders' component={OrderScreen} options={{headerShown: false}}/>
            <HomeStack.Screen name='date-picker' component={Datepicker} options={{headerShown: false}}/>
            <HomeStack.Screen name='appointment-order' component={Appointments} options={{headerShown: false}}/>
            <HomeStack.Screen name='instant-payment' component={InstantPayments} options={{headerShown: false}} />
            <HomeStack.Screen name= 'scheduled-payments' component={ScheduledPayments} options={{headerShown: false}} />
        </HomeStack.Navigator>
    )
}

export default HomeStackNavigator;