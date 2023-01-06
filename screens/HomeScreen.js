import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import tw from "twrnc"
import NavOptions from '../components/NavOptions'
import {GOOGLE_MAPS_APIKEY} from "@env" 
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={tw`bg-white h-full`}>
      <View style={tw`p-3 pt-2`}>
        <Image style={{
          width: 80,
          height: 80,
          resizeMode: "contain",
        }} source={{
          uri: "https://links.papareact.com/gzs",
        }} />
        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput:{
              fontSize: 18,
            },
          }} 
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
            })
            );

            dispatch(setDestination(null));
          }}
          placeholder='Where From?'
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
            components: 'country:pk',
          }}
          returnKeyType={"search"}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
          enablePoweredByContainer={false}
          minLength={2}
          fetchDetails={true}
        />
        <NavOptions />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})