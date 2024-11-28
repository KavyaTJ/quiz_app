import React, { useContext, useState } from 'react'
import {
  Button,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph, Checkbox, RadioButton, TextInput, List } from 'react-native-paper';
import { actions } from '../Actions/action';
import RadioOptions from './Radio';

import { AppContext } from "../context/NewContext";
import DnD from './DragnDrop';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import initialData from "../Questions.json"



    type QuestionCardProps = {
        id: number;
        question: string;
        questionType: QuestionType;
        answers: Array<any>;
    
      };
   
       export type QuestionType = "checkbox" | "radio" | "textInput"|"Dnd";
      
      function Quiz({
        id,
        question,
        questionType,
        answers
      }: QuestionCardProps) {
        const { setAnswer } = actions;

        //@ts-ignore
        const [appData, dispatchAppData] = useContext(AppContext);
        const mydata = initialData[4].initialData;
        const myOptions = initialData[4].questionM;
        const [listItems, setListItems] = useState(myOptions);
        const ItemView = ({ item }: any) => {
          return (
            // FlatList Item
            <View>
              <Text style={styles.item} onPress={() => setListItems(listItems)}>
                {item}
              </Text>
            </View>
          );
        };
        // const myArray=myOptions.join('')
        // const myarray2=myArray.split('')
        // console.log("dfdfdf",myarray2)
        const [data, setData] = useState(mydata);
        console.log("isisis", initialData[4].initialData);
        console.log("App data is", appData.answers);

        const handleTap = (option: string) => {
          const selectedOptions = appData.answers[2]?.value || [];
          const alreadySelected = selectedOptions.includes(option);
          let newOptions = [...selectedOptions];

          if (alreadySelected) {
            const indexOfOption = selectedOptions.indexOf(option);
            if (indexOfOption > -1) {
              const temp = [...selectedOptions];
              temp.splice(indexOfOption, 1);
              newOptions = temp;
            }
          } else {
            newOptions = [...selectedOptions, option];
          }
          dispatchAppData(setAnswer(2, newOptions, "checkbox"));
        };

        const handlechoice = (data: any) => {
          setData(data);
          dispatchAppData(setAnswer(5, data, "Dnd"));
          console.log(dispatchAppData);
     
        };

        console.log(answers);
        return (
          <SafeAreaView>
            <Card style={styles.menuContainer}>
              <Text style={styles.menuItemHeader}>{question}</Text>
              <Card.Content style={styles.menuItemBody}>
                {(() => {
                  switch (questionType) {
                    case "checkbox":
                      return (
                        <View>
                          {answers.map((item: any, index: number) => {
                            const Checkboxanswers =
                              appData.answers[2]?.value || [];
                            const isChecked = Checkboxanswers.includes(
                              item.option
                            );
                            return (
                              <View key={index}>
                                <Checkbox.Item
                                  key={index}
                                  label={item.option}
                                  status={isChecked ? "checked" : "unchecked"}
                                  onPress={() => {
                                    handleTap(item.option);
                                  }}
                                />
                              </View>
                            );
                          })}
                        </View>
                      );

                    case "radio":
                      return (
                        <RadioOptions
                          options={answers.map((answer) => answer.option)}
                          value={appData.answers[id]?.value || ""}
                          handleChange={
                            (e) =>
                              dispatchAppData(setAnswer(id, e, questionType))
                            // console.log(dispatchAppData)
                          }
                        />
                      );
                    case "textInput":
                      return (
                        <TextInput
                          value={appData.answers[id]?.value || ""}
                          onChangeText={(e) =>
                            dispatchAppData(setAnswer(id, e, questionType))
                          }
                        />
                      );
                    case "Dnd":
                      const renderItem = ({
                        item,
                        index,
                        drag,
                        isActive,
                      }: any) => (
                        <View style={styles.item}>
                          <TouchableOpacity onLongPress={drag}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        </View>
                      );

                      return (
                        <GestureHandlerRootView>
                          <Animated.View>
                            {/* style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}} */}
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                         
                              <FlatList
                                data={listItems}
                                renderItem={ItemView}
                                keyExtractor={(item, index) => index.toString()}
                                style={{ marginRight: 70 }}
                              />
                              <DraggableFlatList
                              //@ts-ignore
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                onDragEnd={({data}) => {
                                  handlechoice(data);
                                }}
                              />
                            </View>
                          </Animated.View>
                        </GestureHandlerRootView>
                      );

                    default:
                      return <div>Not found</div>;
                  }
                })()}
              </Card.Content>
            </Card>
          </SafeAreaView>
        );
      }
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer:{
      // backgroundColor: 'orange',
    borderRadius: 10,
     marginLeft:10,
     marginRight:10,
  
  },
  menuItemHeader:{
      backgroundColor: '#a2a8d3',
      borderRadius: 5,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      height:60,
  },
  

  menuItemBody:{
      backgroundColor: '#e7eaf6',
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderTopWidth: 0,
  },
  screen: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#212121',
  },
  item: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
});




export default Quiz;


