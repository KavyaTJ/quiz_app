import React, { useState } from 'react'
import { View ,Text, SafeAreaView} from 'react-native'
import questions from "../Questions.json"
import { useRoute } from '@react-navigation/native';
import { Button, RadioButton } from 'react-native-paper';
import Quiz, { QuestionType } from '../Components/Quiz';
import QuestionStatus from '../Components/QuestionStatus';



export const TOTAL_QUESTIONS = questions.length;

export default function Questions({navigation}:any) {

    // const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(questions[0].id);
  
    function handleNextButtonClick(index: number) {
      if (index === TOTAL_QUESTIONS - 1) {
        navigation.navigate('Results');
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    }
  
  
   return (
     <SafeAreaView>
       <QuestionStatus
         currentQuestion={currentQuestion}
         setCurrentQuestion={setCurrentQuestion}
       />
       <View>
         {questions.map(
           (question, index) =>
             currentQuestion === question.id && (
               <View key={question.id}>
                 <View>
                   <Text style={{fontSize:26,margin:10}}>Question: {index + 1}</Text>
                   <View key={question.id}>
                     <Quiz
                       id={question.id}
                       question={question.question}
                       questionType={question.questionType as QuestionType}
                       answers={question.answerOptions}
                     />
                     <View>
                       <Button
                         disabled={index === 0}
                         onPress={() => setCurrentQuestion((prev) => prev - 1)}
                       >
                         Previous
                       </Button>

                       <Button onPress={() => handleNextButtonClick(index)}>
                         {index === TOTAL_QUESTIONS - 1 ? "Submit" : "Next"}
                       </Button>
                     </View>
                   </View>
                 </View>
               </View>
             )
         )}
       </View>
     </SafeAreaView>
   );
}

