import * as React from 'react';
import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PomodoroTimer from './screens/PomodoroTimer';
import Productivity from './screens/Productivity';
import TaskBites from './screens/TaskBites';
import StartTimer from './screens/StartTimer';

const pom = 'Flow Timer';
const productivity = 'Productivity Scope';
const taskBites = 'Task Bites';

const Tab = createBottomTabNavigator();

//below handles the taskbar
function Tabs () {
    return (
        <Tab.Navigator
            //initialRouteName describes the default screen
            initialRouteName = {pom}
            //screenOptions describes properties for each
            //tab in the navBar.
            //Screenoptions takes in route, which is the current tab.
            //Screenoptions will return an object describing the properties for that tab
            screenOptions = {({route}) => ({
                //tabBarIcon is the icon for each tab in the task bar
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    //if the route or current screen is the pomodoro timer,
                    //then highlight the alarm tab IF it is focused.
                    //else, just show the outline
                    if (rn === pom) {
                        //focused describes whether the tab is focused or not
                        iconName = focused ? 'alarm' : 'alarm-outline'

                    } else if (rn === taskBites) {
                        iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline'
                    } else if (rn === productivity) {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline'
                    }
                    //Ionicons is a library of icons we can use provided by React
                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: {paddingBottom: 10, fontSize: 10},
                style: {padding: 10, height: 70}
            })}
            //below describes all the possible tabs. so, we have 3 tabs. 
            >
                <Tab.Screen name={pom} component={TimerStack}/>
                <Tab.Screen name={taskBites} component={TaskBites}/>
                <Tab.Screen name={productivity} component={Productivity}/>
        </Tab.Navigator>
    );
}

//The stack describes any screens associated with a particular screen.
//Here, this is the stack of screens associated with the flow timer screen.
//The flow timer can either go to itself or the StartTimer screen.
//Define any new screens related to the flow timer screen here.
//Feel free to make a new stack for a new list of screens.
//It's also useful to link screens in a stack, since this is
//how the program determines which screen the "back button" on a phone links to
const Stack = createStackNavigator();
function TimerStack() {
    return (
      <Stack.Navigator initialRouteName="Flow Timer2">
        <Stack.Screen name="Flow Timer2" component={PomodoroTimer} options={{ headerShown: false }} />
        <Stack.Screen name='StartTimer' component={StartTimer} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tabs/>
        </NavigationContainer>
    )
}