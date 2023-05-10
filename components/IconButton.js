import { Pressable, View, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ManageTask} from '../navigation/screens/ManageTask';
import {useState} from 'react';


function IconButton({icon, size, color, onPress}) {
    return (
    <View> 
        <Pressable 
            onPress={onPress} 
            style={({pressed}) => pressed && styles.pressed}
        >
            <View style = {styles.buttonContainer}>
                <Ionicons name = {icon} size = {size} color = {color}/>
            </View>
        </Pressable>
    </View>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6, 
        marginHorizontal: 8,
        marginVertical: 2,
    },
    pressed: {
        opacity: 0.75
    }
});