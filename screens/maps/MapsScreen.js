import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { fonts } from 'react-native-elements/dist/config';
import { State } from 'react-native-gesture-handler';
import { locations } from '../../Data/locations';
import { MaterialIcons } from '@expo/vector-icons';

const mapDarkStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];

const mapStandardStyle = [
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
];

const MapTestScreen = ({navigation}) => {

    return (
     
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          customMapStyle={  mapDarkStyle}
          region={{
            latitude: 32.2385621922917,   
            longitude: 35.223833436542115,  
            latitudeDelta: 1,  
            longitudeDelta: 1, 
            zoom:9999 }}
        >
         <MaterialIcons
                    name={"arrow-back" }
                    size={34}
                    color={Colors.whiteColor}
                    style={{ margin: Sizes.fixPadding * 3.0, alignSelf:  'flex-start'  }}
                    onPress={() => navigation.pop()}
                />
        {
        locations.map((item, index) => (
          <Marker 
              key={index}
             coordinate={{
              latitude: item.lat,
              longitude:item.lng,
            }}
            image={require('../../assets/images/map.png')}
            title={item.gymName}
          >
          
            <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text style={{...Fonts.primaryColor14SemiBold, marginBottom: 5,
}}>{item.gymName}</Text>
                  {/* <Text>A short description</Txt> */}
                  <Image 
                    style={styles.image}
                    source={item.gymImage}
                  />
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
          </Marker>))}
        </MapView>
    );
};

export default MapTestScreen;

const styles = StyleSheet.create({
  map: {
    height: '90%'
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    padding: 15,
    width: 150,
    height:150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: Colors.primaryColor,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    
    marginBottom: 5,
    ...Fonts.blackColor16Bold
  },
  // Character image
  image: {
    width: 120,
    height: 110,
  },
});