import React, { useState,useEffect,useContext } from 'react'
import {StyleSheet,View,Text,TextInput,Button,SafeAreaView, Keyboard} from 'react-native'
import BmiResult from './BmiResult'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { AuthContext } from '../../constants/AuthContext';

function BmiForm() {
    const [displayResult,setDisplayResult]=useState(false)
    const [weight,setWeight]=useState(0)
    const [height,setHeight]=useState(0)
    const [bmiValue,setBmiValue]=useState(0)
    const [bmiStatus,setBmiStatus]=useState('')
    const [bminew,setbminew]=useState(0)
    const {setage,setweight1,setheight1} = useContext(AuthContext);

    const calculateBmi=(weight,height)=>{
        const ht=height/100
        const bmi=weight/(ht*ht)
        
        setBmiValue(bmi.toFixed(2))  

    }

    const clickHandler=()=>{
        setweight1(weight);
        setheight1(height);
        setDisplayResult(true)
        calculateBmi(weight,height)
        Keyboard.dismiss()
    }

    const handleBmiStatus=()=>{
        if(bmiValue <= 18.5){
          
            setBmiStatus('Under Weight Of')
        }else if (bmiValue > 18.5 && bmiValue<=24.9){
            setBmiStatus('Normal Weight')
        }else if (bmiValue>25 && bmiValue<=29.9){
            setBmiStatus('Over Weight of')
        }else{
            setBmiStatus('Obesity')
        }
    }
    useEffect(()=>{
        handleBmiStatus()
    },[bmiValue])
    const Separator=()=>(
        <View style={styles.separator}/>
    )
    
    const styles=StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 16,
          },
        input:{
            display:'flex',
            height:40,
            backgroundColor:'#f1f3f6',
            marginLeft:10,
            borderRadius:8,
            paddingHorizontal:80,
            borderColor:'grey'          
        },
        label:{
            fontSize:18,
            fontWeight:'bold',
            paddingHorizontal:5
        },
        separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        },
        btn:{
            padding:20,
            backgroundColor: Colors.primaryColor,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: Sizes.fixPadding,
            paddingVertical: Sizes.fixPadding + 5.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginTop: Sizes.fixPadding * 3.5,
            marginBottom: Sizes.fixPadding * 2.0,
            color:Colors.DEFAULT_WHITE,
        }
    })
    
        return (
        <SafeAreaView>
            <View style={{
            paddingTop:40,
            display:'flex',
            flexDirection:'row',
            allignItems:'center'
            }}>
                <Text style={styles.label}>Enter Weight <Text style={{fontWeight:'normal'}}>(in kg)</Text></Text>
                <TextInput style={styles.input} keyboardType='decimal-pad' onChangeText={(val)=>setWeight(val)}/>
            </View>
    
            <View style={{
            paddingTop:40,
            display:'flex',
            flexDirection:'row',
            allignItems:'center'
            }}>
                <Text style={styles.label}>Enter Height <Text style={{fontWeight:'normal'}}>(in cm)</Text></Text>
                <TextInput style={styles.input} keyboardType='decimal-pad' onChangeText={(val)=>setHeight(val)}/>
            </View>
            <View style={{
            paddingTop:40,
            display:'flex',
            flexDirection:'row',
            allignItems:'center'
            }}>
                <Text style={styles.label}>Enter age<Text style={{fontWeight:'normal'}}>(in years)</Text></Text>
                <TextInput style={styles.input} keyboardType='decimal-pad' onChangeText={(val)=>setage(val)}/>
            </View>
            <Separator/>
            <View style={styles.btn}>
            <Button style={{ color:Colors.DEFAULT_WHITE}} title='Check BMI' onPress={clickHandler}/>
            </View>
            
            {
                displayResult ? <BmiResult data={bmiValue}  status={bmiStatus}/>: <Text></Text>                 
            }
            
        </SafeAreaView>
        
    )
}

export default BmiForm
