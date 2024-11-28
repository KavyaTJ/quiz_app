import React from "react";
import { View ,Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PieProps = {
    numQuestions: number;
    total: number;
    color: string;
  };
  
  function PercentageIndicator({ numQuestions, total, color }: PieProps) {
    const percentage = (numQuestions / total) * 100;
  
    return (
      <SafeAreaView>
      <View style={{flexDirection:'row'}}>
          <Text>{percentage} %</Text>
        <Text>- {color === "red" ? "incorrect answers" : "correct answers"}</Text>
      </View></SafeAreaView>
    );
  }
  
  export default PercentageIndicator;