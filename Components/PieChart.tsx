import React from "react";
import { Dimensions, View ,} from "react-native";
import PercentageIndicator from "./Percentage"

// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart
// } from "react-native-chart-kit";
import PieChart from 'react-native-expo-pie-chart';

type PieProps = {
  correct: number;
  total: number;
};

function Piechart({ correct, total }: PieProps) {
  const correctDegree = (correct / total) * 100;
  console.log(correctDegree)
  const incorrectDegree = 100 - correctDegree;
  console.log(incorrectDegree)
  const widthAndHeight = 250
  const series = [correctDegree,incorrectDegree]
  const sliceColor = ['#F44336','#2196F3']
  const data = [
    {
      name: "correct answers",
      Answers:`${correctDegree}`,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Incorrect Answers",
      Answers: `${incorrectDegree}`,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  
  ];

  console.log(data)
  return (
    <><PercentageIndicator numQuestions={correct} total={total} color={"green"} /><PercentageIndicator numQuestions={total - correct} total={total} color={"red"} /><View style={{ marginTop: 90 }}>

      {/*
          // @ts-ignore */}
      <PieChart
        data={[
          {
            key: 'Correct Answers',
            count: correctDegree,
            color: 'blue',
          },
          {
            key: 'Wrong Answers',
            count: incorrectDegree,
            color: 'red',
          },
        ]}
        length={200} />

    </View></>
    
  );
}

export default Piechart;