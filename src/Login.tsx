import React, { useContext, useState } from "react";
import { View, SafeAreaView ,StyleSheet,Image} from "react-native";
import { TextInput ,Button,Text} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { actions } from "../Actions/action";
import { AppContext } from "../context/NewContext";




function Login({ navigation }: any) {
  const [name, Setname] = useState('');
  const [email, SetEmail] = useState('');
  const [Phno, SetPhno] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const {clearAns}=actions;

  const [course, setCourse] = useState([
    {label: 'Arabic', value: 'Arabic'},
    {label: 'Bengali', value: 'Bengali'},
    {label: 'Chinese ', value: 'Chinese '},
    {label: 'Dutch', value: 'Dutch'},
    {label: 'English', value: 'English'},
    {label: 'French', value: 'French'},
    {label: 'Hindi', value: 'Hindi'},
    {label: 'Kannada', value: 'kannada'},
    {label: 'Italian', value: 'Italian'},
    {label: 'Japanese', value: 'Japanese'},
    {label: 'Korean', value: 'Korean'},

  ]);

  const areAllFieldsFilled = ( name!= "" && email!="" && Phno!="" && value!=null) 


const [checkValidEmail, setCheckValidEmail] = useState(false);
const [checkPhno, setCheckphno] = useState(false);
  //@ts-ignore
  const [appData,dispatchAppData] = useContext(AppContext);
const handleChangemail=(text:any)=>{
  let re = /\S+@\S+\.\S+/;
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  SetEmail(text);
  if (re.test(text) || regex.test(text)) {
    setCheckValidEmail(false);
  } else {
    setCheckValidEmail(true);
  }
}
const handleChangPhno=(phonetext:any)=>{
  let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  SetPhno(phonetext);
  if ( regex.test(phonetext)) {
    setCheckphno(false);
  } else {
    setCheckphno(true);
  }
}
return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center",marginTop:20 }}
    >
        <View>
        <Text style={{margin:10,fontSize:50,fontWeight:"600",textAlign:"center"}}>QUIZ APP</Text>
        <Image
        style={styles.stretch}
        source={require("../assets/L2.jpg")}
      />
        </View>
        <View>
            <Text style={{margin:10,fontSize:24}}>Name</Text>
      <TextInput
        style={styles.container}
        theme={{ colors: { primary: "gray" } }}
        value={name}
        onChangeText={(text) => {
            Setname(text);
          
        }}
        
      />
      </View>
      <View>
            <Text style={{margin:10,fontSize:24}}>Email</Text>
       <TextInput
        style={styles.container}
        theme={{ colors: { primary: "gray" } }}
        value={email}
        onChangeText={(text) => {
          handleChangemail(text);
          
        }}
      /></View>
        {checkValidEmail ? (
        <Text style={styles.textFailed}>Wrong format email</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
       <View>
            <Text style={{margin:10,fontSize:24}}>Phone No</Text>
       <TextInput
        style={styles.container}
        keyboardType = 'number-pad'
        theme={{ colors: { primary: "gray" } }}
        value={Phno}
        onChangeText={(phonetext) => {
          handleChangPhno(phonetext);
          
        }}
    
      />
      </View>
      {checkPhno ? (
        <Text style={styles.textFailed}>Wrong format email</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
<View>   
      <DropDownPicker
      style={styles.container}
      open={open}
      value={value}
      items={course}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setCourse}
      placeholder="Select a language"
    /></View>
      <Button
        style={styles.button}
        mode="contained"
        labelStyle={{ fontSize: 20 }}
        contentStyle={{ 
          height:52
         }}
        onPress={() => {
          navigation.navigate("Questions");
          dispatchAppData(clearAns())
        }}
        disabled={!areAllFieldsFilled}
      >
        Get Started
      </Button>
      

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height:45,
    width:350,
    borderColor:'blue',
    marginBottom:10,
  
  },
  button: {
    width:260,
    borderRadius:15,
    marginTop:15,
  },

  stretch: {
    width: 300,
    height: 180,
    resizeMode: 'contain',
    borderRadius:200,
    margin:10
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: 'red',
    marginRight:10,
    marginBottom:5
  },
});

export default Login;