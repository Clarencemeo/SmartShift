import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function Productivity(navigation) {

    // https://www.youtube.com/watch?v=RdaQIkE47Og 
    // to do calendar agenda list for reflections with dummy data 

    // https://www.youtube.com/watch?v=HF5qgqQRCWA 
    // to do calendar agenda list for the reflecttions with APIs 
    // (USE this one)

    // to do ... on the rest of text shown 
    // https://stackoverflow.com/questions/50132088/react-native-limit-the-length-of-text-displayed-in-a-card-section 
    // useful for the titles used (which would be the titles of all reflections on a day one after another)

    // To make those tappable just use Pressable or TouchableOpacity 

    // Once clicking on a date - show modal with all the enteries / reflections made on that date 

    // once you click on a reflection show a modified / different form  (Edit vs Add) of the Create Reflection Form from before 
    // which was used to create a recflection

    // Create a reflection form - only (Skip) and (Add) buttons 
    //   - Skip = to not do a reflection / don't submit form at all 
    //   - Add  = to submit a reflection form 

    // Edit / View a reflection form - only (Finish) and (Trash) buttons 
    //   - Trash  = to delete the form / reflection permenantly 
    //   - Finish = to submit all edits made / stop looking at form 

    return (
        <View style = {styles.timerContainer}> 
            
            {/* <Text style = {styles.timerText} onPress={() => navigation.navigate('PomodoroTimer')}>Productivity Scope</Text> */}
        </View>
    );

}

const styles = StyleSheet.create({
    timerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fbc4ab',
    },
    timerText: {
        fontSize: 26,
        fontWeight: 'bold'
    }
});