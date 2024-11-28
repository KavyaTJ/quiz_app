import questions from "../Questions.json";
import React, { useContext } from "react";
import { AppContext } from "../context/NewContext";
import { View ,Text, TouchableOpacity,Pressable} from "react-native";



type QuestionStatusProps = {
    currentQuestion: number;
    setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  };

 

function QuestionStatus({ currentQuestion, setCurrentQuestion }: QuestionStatusProps) {
  //@ts-ignore
  const [appData] = useContext(AppContext);
  return (
    <View style={{ display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:90,
    marginBottom:100
}}>
      {questions.map((question, index) => (
        <View key={index}>
       <TouchableOpacity 
          onPress={() => setCurrentQuestion(index + 1)}
          key={index}
          style={{
          
            backgroundColor:
              currentQuestion === index + 1
                ? "#f5e72d"
                : appData.answers[index + 1]
                ? appData.answers[index + 1].value !== ""
                  ? "#4CAF50"
                  : "gray"
                : "gray",
            borderRadius: 50,
            width:50,
            height:50,
          }}
        >
        <Text style={{textAlign:'center'}}> {index + 1}</Text> 
        </TouchableOpacity ></View>
      ))}
    </View>
  );
}

export default QuestionStatus;