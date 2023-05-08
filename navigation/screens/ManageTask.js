import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, TextInput, View, Text, Animated, Pressable, Button,} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useCardAnimation } from '@react-navigation/stack';

function ManageTask({navigation}) {
    const { colors } = useTheme();
    const { current } = useCardAnimation();

    return (
        <View style = {styles.modal}>
            {/* {/* <Text>
                Manage Task Screen
            </Text> */}
            <Pressable
                style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                ]}
                onPress={navigation.goBack}
                // onPress={() => {navigation.navigate("taskBites")}}
            />
            <Animated.View
                style={{
                padding: 16,
                width: '90%',
                maxWidth: 400,
                borderRadius: 3,
                backgroundColor: colors.card,
                transform: [{
                    scale: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                        extrapolate: 'clamp',
                    }),
                },
                ],
            }}>
                <Text>
                    Inside animated View Part of Manage Task 
                </Text>
                <Button
                    title="Okay"
                    color={colors.primary}
                    style={{ alignSelf: 'flex-end' }}
                    // onPress={() => {navigation.navigate("taskBites")}}
                    onPress={navigation.goBack}
                />
            </Animated.View>  
        </View>
    );
}

export default ManageTask;

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        height: '50%',
        top: '50%',
        backgroundColor: 'white'
    }
})