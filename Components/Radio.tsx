
  import React from "react";
import { View } from "react-native";
// import RadioForm, { RadioButton } from "react-native-simple-radio-button";
import { RadioButton, Text } from 'react-native-paper';
  type RadioOptionsProps = {
    options: string[];
    value: string;
    handleChange: (e:any) => void;
  };
  
  const RadioOptions = ({ options, value, handleChange }: RadioOptionsProps) => {

      return (
        <View>
      
      <RadioButton.Group  onValueChange={handleChange} value={value}>
          {options.map((option) => (  
          <RadioButton.Item label={option} value={option} style={{flexDirection:'row-reverse'}}  key={option}/>
          ))}
        
      </RadioButton.Group></View>
    );
  };
  
  export default RadioOptions;