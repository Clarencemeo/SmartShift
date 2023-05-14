# SmartShift
 
 May need to import with the following commands:
 
 Firebase: npx expo install firebase
 --- Checkbox: npx expo install expo-checkbox

Made a change in timer.js, in node_modules/react-native-stopwatch-timer.
added "this.setState({remainingTime: this.props.totalDuration})" on line 72 to prevent recursion. 
