import * as React from 'react';
import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PomodoroTimer from './screens/PomodoroTimer';
import Productivity from './screens/Productivity';
import TaskBites from './screens/TaskBites';

const pom = 'Flow Timer';
const productivity = 'Productivity Scope';
const taskBites = 'Task Bites';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName = {pom}
            screenOptions = {({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === pom) {
                        iconName = focused ? 'alarm' : 'alarm-outline'

                    } else if (rn === taskBites) {
                        iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline'
                    } else if (rn === productivity) {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: {paddingBottom: 10, fontSize: 10},
                style: {padding: 10, height: 70}
            })}
            
            >
                <Tab.Screen name={pom} component={PomodoroTimer}/>
                <Tab.Screen name={taskBites} component={TaskBites}/>
                <Tab.Screen name={productivity} component={Productivity}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}