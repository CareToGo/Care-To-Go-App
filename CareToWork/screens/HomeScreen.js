import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Constructor,
} from "react-native";
import React, { useEffect } from "react";
import { GOOGLE_MAPS_APIKEY } from "@env";

import { Icon } from "react-native-elements/dist/icons/Icon";
import tw from "tailwind-react-native-classnames";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";
import { useState } from "react";
import NewOrderPopups from "../components/NewOrderPopup";
import MapViewDirections from "react-native-maps-directions";
import { Marker } from "react-native-maps";



const HomeScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const [support, setSupport] = useState(null);

  const [myPosition, setMyPosition] = useState(null);
  const [newOrders, setNewOrders] = useState([]);
  const [order, setOrder] = useState(null);
  // const [order, setOrder] = useState({
  //   id: "1",
  //   type: "Nursing Care",
  //   application: "Nursing Assessment",
  //   applicationInfo: "For non-emergency medical concerns.",
  //   description: "Whatever the provider wants to write about themselves.",

  //   destLatitude: 43.7635932,
  //   destLongitude: -79.4107051,
  //   originLatitude: 43.7635932,
  //   originLongitude: -79.4107051,

  //   user: {
  //     rating: 4.97,
  //     name: "Bueyoung Lee",
  //     age: "24",
  //     gender: "Male",
  //     language: "English",
  //     address: "56 Grenville St, Toronto, ON M5S 1B1",
  //     screen: "Account",
  //   },
  // });

  const fetchSupport = async () => {
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      const supportData = await API.graphql(
        graphqlOperation(getSupport, { id: authenticatedUser.attributes.sub })
      );
      setSupport(supportData.data.getSupport);
    } catch (e) {
      console.error(e);
    }
  };
  const fetchOrders = async () => {
    try {
      const ordersData = await API.graphql(
        graphqlOperation(listOrders, { filter: { status: { eq: false } } })
      );
      setNewOrders(ordersData.data.listOrders.items);
      console.log(newOrders);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchSupport();
    fetchOrders();
  }, []);

  const onDecline = () => {
    setNewOrders(newOrders.slice(1));
    navigation.navigate("HomeScreen");
  };
  const onAccept = () => {
    // setOrder(newOrder);
    // setNewOrder(null);
    navigation.navigate("HomeScreen");
  };
  const onGoPress = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const change = {
        id: userData.attributes.sub,
        _version: support._version,
        isActive: !support.isActive,
      };
      const updatedSupportData = await API.graphql(
        graphqlOperation(updateSupport, { input: change })
      );
      setSupport(updatedSupportData.data.updateSupport);
    } catch (e) {
      console.error(e);
    }
  };

  const onUserLocationChange = (event) => {
    setMyPosition(event.nativeEvent.coordinate);
  };

  const onDirectionFound = (event) => {
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        landed: order.landed || event.distance < 0.4,
      });
    }
  };

  const getDestination = () => {
    if (order && order.landed) {
      return {
        latitude: order.destLatitude,
        longitude: order.destLongitude,
      };
    }
    return {
      latitude: order.originLatitude,
      longitude: order.originLongitude,
    };
  };

  const renderBottomTitle = () => {
    if (order && order.landed) {
      return (
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 4,
            }}
          >
            <Text>{order.duration ? order.duration.toFixed(0) : "?"}min</Text>
            <View
              style={{
                backgroundColor: "#1F2937",
                marginHorizontal: 10,
                width: 40,
                height: 40,
                alignItems: "center",
                borderRadius: 20,
                justifyContent: "center",
              }}
            >
              <Icon name="user" color="white" type="antdesign" size={22} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : "?"} km</Text>
          </View>
          <Text style={tw`text-center py-5 text-lg`}>
            {order.application} - {order.user.name}
          </Text>
        </View>
      );
    }
    if (order) {
      return (
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 4,
            }}
          >
            <Text>{order.duration ? order.duration.toFixed(0) : "?"}min</Text>
            <View
              style={{
                backgroundColor: "#1F2937",
                marginHorizontal: 10,
                width: 40,
                height: 40,
                alignItems: "center",
                borderRadius: 20,
                justifyContent: "center",
              }}
            >
              <Icon name="user" color="white" type="antdesign" size={22} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : "?"} km</Text>
          </View>
          <Text style={tw`text-center py-5 text-lg`}>
            Heading to {order.user.name}
          </Text>
        </View>
      );
    }
    if (support?.isActive) {
      return <Text style={tw`text-center py-5 text-lg`}>You're Online</Text>;
    }
    return <Text style={tw`text-center py-5 text-lg`}>You're Offline</Text>;
  };

  return (
    <View>
      <View style={tw`h-5/6`}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={tw`flex-1`}
          showsUserLocation={true}
          onUserLocationChange={onUserLocationChange}
          initialRegion={{
            latitude: 43.7635932,
            longitude: -79.4107051,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
          }}
        >
          {order && (
            <MapViewDirections
              origin={myPosition}
              onReady={onDirectionFound}
              destination={getDestination()}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="black"
            />
          )}
        </MapView>

        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          style={tw`bg-gray-100 absolute top-12 left-5 p-3 z-50 rounded-full shadow-lg`}
        >
          <Icon name="menu" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          style={tw`bg-black z-50 absolute top-12 inset-x-1/3 p-3 rounded-lg shadow-lg`}
        >
          <Text style={tw`text-white text-center `}>$0.00</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          style={tw`bg-gray-100 absolute top-12 right-5 z-50 p-3 rounded-full shadow-lg`}
        >
          <Icon name="search" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          style={tw`bg-gray-100 absolute bottom-8 left-5 z-50 p-3 rounded-full shadow-lg`}
        >
          <Icon name="shield" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          style={tw`bg-gray-100 absolute bottom-8 right-5 z-50 p-3 rounded-full shadow-lg`}
        >
          <Icon name="chat" />
        </TouchableOpacity>
        {!order && (
          <TouchableOpacity
            onPress={onGoPress}
            style={tw`bg-gray-100 absolute inset-x-1/3 bottom-8 z-50 p-3 rounded-full shadow-lg `}
          >
            {support?.isActive ? (
              <Text style={tw`text-center py-0 text-sm `}>Sleep</Text>
            ) : (
              <Text style={tw`text-center py-0 text-sm  `}>GO</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={tw`h-1/6`}>
        <SafeAreaView style={tw`bg-white flex-grow`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("NavNursingCard")}
            style={tw`bg-gray-100 absolute top-3 left-5 z-50 p-3 rounded-full shadow-lg`}
          >
            <Icon name="menufold" type="antdesign" />
          </TouchableOpacity>

          {renderBottomTitle()}

          <TouchableOpacity
            onPress={() => navigation.navigate("NavNursingCard")}
            style={tw`bg-gray-100 absolute top-3 right-5 z-50 p-3 rounded-full shadow-lg`}
          >
            <Icon name="bars" type="antdesign" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      {newOrders.length > 0 && !order && (
        <NewOrderPopups
          newOrders={newOrders}
          onDecline={onDecline}
          setNewOrders={setNewOrders}
          onAccept={onAccept}
        />
      )}
    </View>
  );
};

export default HomeScreen;
