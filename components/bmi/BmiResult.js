import React, { useState } from 'react'
import { Colors, Fonts, Sizes,images } from '../../constants/styles';
import {  Text,StyleSheet,ToastAndroid , View, Image,SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native'


const BmiResult = (props) => {
   
    const handleColors=()=>{
        if(props.data <= 18.5){
            return styles.blue.color
        }else if (props.data > 18.5 && props.data<=24.9){
            return styles.green.color
        }else if (props.data>25 && props.data<=29.9){
            return styles.yellow.color
        }else{
            return styles.red.color
        }
    }
    function nextButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('GoalSelection')}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    Skip
                </Text>
            </TouchableOpacity>
        )
    }
    const statusColor=handleColors()
    
    return (
        <View>
        {
            props.data==='NaN' || props.data==='Infinity' || props.data<=0.00 ? 
            ToastAndroid.show('Enter valid info',2000)
            :
            <View>
                <Text style={styles.label}>Your Body status : <Text style={{color:statusColor}}>{props.status}</Text></Text>
            </View>
        }
        </View>

    )
}

export default BmiResult
const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.5,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    label:{
        ...Fonts.primaryColor18SemiBold
    },
    green:{
        color:'green',
    },
    blue:{
        color:'#1a238a',
    },
    yellow:{
        color:'#e6d045',
    },
    red:{
        color:'red'
    }
});