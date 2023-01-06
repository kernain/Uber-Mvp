import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from "twrnc"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from "@env" 
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
  return (
    <View style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Hello</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
        <GooglePlacesAutocomplete
          styles={toInputBoxStyles}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
            })
            );

            // navigation.navigate("RideOptionsCard")
          }}
          placeholder='Where to?'
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
        </View>
      </View>
    </View>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "White",
        paddingTop: 20,
        flex: 0,
    },
    textInput:{
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})