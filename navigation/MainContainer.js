import * as React from 'react';
import {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PomodoroTimer from './screens/PomodoroTimer';
import Productivity from './screens/Productivity';
import TaskBites from './screens/TaskBites';
import StartTimer from './screens/StartTimer';
import Register from './screens/Register';
import Login from './screens/Login';
import { SignInContext } from '../userContexts/Context';

const Tab = createBottomTabNavigator();

//below handles the taskbar
function Tabs () {
    return (
        <Tab.Navigator
            //initialRouteName describes the default screen
            
            initialRouteName = {"Register"}
            //screenOptions describes properties for each
            //tab in the navBar.
            //Screenoptions takes in route, which is the current tab.
            //Screenoptions will return an object describing the properties for that tab
            screenOptions = {({route}) => ({
                tabBarButton: [
                    //all the screens listed here will not show up in the task bar, but can still be navigated to 
                    "Register",
                    "Login",
                    "StartTimer"
                  ].includes(route.name)
                    ? () => {
                        return null;
                      }
                    : undefined,
                //tabBarIcon is the icon for each tab in the task bar
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    //if the route or current screen is the pomodoro timer,
                    //then highlight the alarm tab IF it is focused.
                    //else, just show the outline
                    if (rn === "Flow Timer") {
                        //focused describes whether the tab is focused or not
                        iconName = focused ? 'alarm' : 'alarm-outline'

                    } else if (rn === "Task Bites") {
                        iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline'
                    } else if (rn === "Productivity Scope") {
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
            //below describes all of the screens; define all screens here
            //any new screens you define here, make sure to also define up above 
            //                <Tab.Screen name={"Register"} component={Register} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}/>
            //<Tab.Screen name={"Login"} component={Login} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}/>
            //under "tabBarButton"; this ensures that the new screens don't appear on the taskbar
            >
                <Tab.Screen name={"Flow Timer"} component={PomodoroTimer} options={{ headerShown: false } }/>
                <Tab.Screen name={"Task Bites"} component={TaskBites} options={{ headerShown: false }}/>
                <Tab.Screen name={"Productivity Scope"} component={Productivity} options={{ headerShown: false }}/>
                <Tab.Screen name={"StartTimer"} component={StartTimer} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
}

const Auth = createStackNavigator();
function AuthStack(){
    return(
        <Auth.Navigator>

                    <Auth.Screen 
                        name ="Register"
                        component = {Register}
                        options ={{
                            headerShown: false,
                        }}
                    />  

                    <Auth.Screen 
                        name ="Login"
                        component = {Login}
                        options ={{
                            headerShown: false,
                        }}
                    /> 

          
                   
                   
        </Auth.Navigator>
    )
}

export default function MainContainer() {
    const {signedIn} = useContext(SignInContext)
    return (
            <NavigationContainer>
                {signedIn.userToken === null  ?  <AuthStack />: <Tabs />}
            </NavigationContainer>
    )
}