import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import TaskOutput from '../../components/TaskOutput';
import {useState} from 'react';

// import RNPickerSelect from 'react-native-picker-select';
// import {Picker} from '@react-native-picker/picker';

export default function TaskBites() {
    // const [selectedOption, setSelectedOption] = useState();

    return (
        <View style = {styles.container}> 
            {/* <View style = {styles.pickerContainer}>  */}
                {/* <RNPickerSelect
                    style = {styles.picker}
                    onValueChange={(value) => console.log(value)}
                    items={options}
                /> */}
                {/* <Picker
                    style = {{flex:1, height: 50, width: 100}}
                    selectedValue={selectedOption}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedOption()
                    }
                >
                    <Picker.Item label="All" value = "All"/>
                    <Picker.Item label="Complete" value = "Complete"/>
                    <Picker.Item label="In Progress" value = "In Progress"/>
                </Picker> */}
            {/* </View> */}
            <View style = {styles.timerContainer}> 
                <TaskOutput />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbc4ab',
    },
    // pickerContainer: {
    //     flex: 1,
    //     margin: 10
    // }, 
    // inputIOS: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     textAlign: 'center',
    //     fontSize: 16,
    //     paddingVertical: 12,
    //     paddingHorizontal: 10,
    //     borderWidth: 1,
    //     borderColor: 'gray',
    //     borderRadius: 4,
    //     color: 'red',
    //     paddingRight: 30,
    // },
    timerContainer: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});