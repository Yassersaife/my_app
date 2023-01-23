import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';


 const AuthContext = createContext();

 const AuthProvider = ({children}) => {
  const [login,setlogin] = useState(0);
  const [userinfo,setuserinfo] = useState([]);
  const [localhost,setlocalhost]=useState('192.168.1.12');

    const [fullName,setfullName] = useState('');
    const [email,setemail] = useState('');
    const [phoneNumber,setphoneNumber] = useState(0);
    const [password,setpassword] = useState('');
    const [goalname,setgoalname] = useState('');

    const [gender,setgender] = useState(0);
    const [height1,setheight1] = useState(170);
    const [weight1,setweight1] = useState(50);
    const [city,setcity] = useState('');
    const[age,setage]=useState(0);
    const [salary,setsallary]=useState(0);
    const Sigup1 = (name, email,phoneNumber,city ,password) => {
        setfullName(name);
        setemail(email);
        setphoneNumber(phoneNumber);
        setpassword(password);
        setcity(city);

    }
    const Sigup2 = (name,salary, email,phoneNumber,password) => {
        setfullName(name);
        setemail(email);
        setphoneNumber(phoneNumber);
        setpassword(password);
        setsallary(salary);
    }

   
    return (
        <AuthContext.Provider value={
           {
            Sigup1,
            setgender,
            setweight1,
            setheight1,
            setgoalname,
            setage,
            setemail,
            Sigup2,
            setlogin,
            userinfo,
            setuserinfo,
            localhost,
            goalname,
            login,
            fullName,
            email,
            gender,
            age,
            height1,
            weight1,
            fullName,
            phoneNumber,
            password,
            city,
            setsallary,
            salary
           }
        }>
          {children}
        </AuthContext.Provider>
      );
};
export { AuthContext, AuthProvider };