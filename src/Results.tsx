import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/NewContext";
import questions from "../Questions.json";
import Piechart from "../Components/PieChart";
import { SafeAreaView, Text,View,StyleSheet} from 'react-native'
import { Button } from "react-native-paper";
import { actions } from "../Actions/action";

const Results = ({navigation}:any) => {
  //@ts-ignore
  const [appData,dispatchAppData] = useContext(AppContext);
  const [counter, setCounter] = useState(0);
// const {clearAns}=actions;

  function correctOptions(index: number) {
    const options = questions[index].answerOptions.filter(
      (option: { isCorrect: any; }) => option.isCorrect
    );
    const ans = options.map((option) => option.option);
    return ans;
  }

  function setValueOfPieChart() {
   
    let count = 0;
    Object.entries(appData.answers).map(([currentIndex, answer]: any) => {
      console.log(`appData : ${answer.value.toString()}`);
      console.log(`ans :${correctOptions(currentIndex - 1)}`);

      if (answer.value.toString() == correctOptions(currentIndex - 1)) {
        count++;
      }
   

    });
    setCounter(count);
  }

  useEffect(() => {
    setValueOfPieChart();
    const length = Object.entries(appData.answers).length;
    console.log(`length is ${length}`);
  }, [appData]);

  const handleSubmit=()=>{
    navigation.navigate("Login");
  // dispatchAppData(clearAns())
  }
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 40, textAlign: "center", marginTop: 50 }}>
        REPORT
      </Text>

      {Object.entries(appData.answers).map(([currentIndex, answer]: any) => (
        <View
          key={currentIndex}
          style={{
            padding: 5,
          }}
        >
          <Text
            style={{
              borderStyle: "solid",
              borderWidth: 2,
              margin: 0,
              padding: 10,
              borderRadius: 5,
              borderColor:
                answer.value.toString() == correctOptions(currentIndex - 1)
                  ? "green"
                  : "red",
            }}
          >
            {currentIndex}.{answer.value}
          </Text>
          {answer.value.toString() == correctOptions(currentIndex - 1) ? (
            <></>
          ) : (
            <Text>
              correct answer: {correctOptions(currentIndex - 1).join(", ")}
            </Text>
          )}
        </View>
      ))}
      <Piechart correct={counter} total={questions.length} />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 140,
          alignItems: "center",
        }}
      >
        <Button
          style={styles.button}
          mode="contained"
          labelStyle={{ fontSize: 20 }}
          contentStyle={{
            height: 52,
          }}
          onPress={handleSubmit}
        >
          Try Again
        </Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 260,
    borderRadius: 15,
  },
});
export default Results;