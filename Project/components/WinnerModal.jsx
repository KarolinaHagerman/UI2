/*
File: WinnerModal.jsx

This file contains the JSX needed to create a winner modal that pops up when we have a winner.

Version 0.5
Author: Karolina Hagerman, Erik Blomsterberg

*/

// Imports
//
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Modal, Animated } from "react-native";
import { Feather } from '@expo/vector-icons';
import { responsiveFontSize, responsiveHeight, responsiveWidth, useResponsiveFontSize } from "react-native-responsive-dimensions";
import { SoundContext } from '../components/SoundContext';

/*
WinnerModal:
A modal that pop up when we have a winner.
*/
export default function WinnerModal({ hasWinner, winner, winnerColor, language, players, colors }) {
    const ICON_SIZE = useResponsiveFontSize(3);

    // Decides if the modal is visible or not
    //
    const [modalVisible, setModalVisible] = useState(false);

    // Getting the needed information from the sound context
    //
    const { playApplause } = useContext(SoundContext);

    // Create the initial values of the animation variables
    //
    const [rotate] = useState(new Animated.Value(0));
    const [bounce] = useState(new Animated.Value(0));

    // Listens to changes in hasWinner, if we have a winner modalVisible is set to true so the modal is shown
    //
    useEffect(() => {
        if (hasWinner) {
            setModalVisible(true);
        }
    }, [hasWinner]);

    // Closes the modal by setting modalvisible to false
    //
    const closeModal = () => {
        setModalVisible(false);
    }

    // This animation and sound is called when modalVisible is changed to true
    //
    useEffect(() => {
        if (modalVisible) {

            // Play applause
            //
            playApplause();

            // Creates a looped wiggling effect by rotating from side to side and then to the middle to get a smooth transition in the loop
            //
            const wiggling = Animated.loop(
                Animated.sequence([
                    Animated.timing(rotate, {
                        toValue: 0.02,
                        duration: 1000,
                        delay: 0,
                        useNativeDriver: true,
                        isInteraction: false
                    }),
                    Animated.timing(rotate, {
                        toValue: -0.02,
                        duration: 1000,
                        delay: 0,
                        useNativeDriver: true,
                        isInteraction: false
                    }),
                    Animated.timing(rotate, {
                        toValue: 0,
                        duration: 500,
                        delay: 0,
                        useNativeDriver: true,
                        isInteraction: false
                    }),
                ]),

                // Loop forever
                //
                { iterations: -1 },
            )

            // Creates a looped bouncing effect up and down
            //
            const bouncing = Animated.loop(
                Animated.sequence([
                    Animated.timing(bounce, {
                        toValue: -30,
                        duration: 500,
                        delay: 0,
                        useNativeDriver: true
                    }),
                    Animated.timing(bounce, {
                        toValue: 0,
                        duration: 400,
                        delay: 0,
                        useNativeDriver: true
                    }),


                ]),

                // Loop forever
                //
                { iterations: -1 }
            )

            // Combine and start the two animations at the same time
            //
            Animated.parallel([wiggling, bouncing]).start();
        }
    }, [modalVisible])

    // All elements presented to the user
    // 
    return (
        <Modal
            animationType="slide"
            transparent='true'
            visible={modalVisible}
        >

            <View style={styles.modalContainer}>
                <View style={[styles.playersContainer]}>

                    {/** Writes each player with their corresponding color */}
                    {players.map((player, index) => (
                        <Animated.Text
                            key={index}
                            style={[styles.players,
                            { color: colors[index] },

                            // Animation for the winner
                            //
                            players[index] === winner && {
                                transform: [
                                    {
                                        // Interpolate translates the values 0-1 (added to the Animation.value rotate) to degrees
                                        //
                                        rotate: rotate.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '360deg'],
                                        })
                                    },
                                    {
                                        // Add the bounce animation to the Y position
                                        //
                                        translateY: bounce
                                    },
                                ],
                                fontSize: responsiveFontSize(14)
                            }]}>
                            {player}
                        </Animated.Text>
                    ))}
                </View>

                <View style={styles.modalContent}>

                    {/* The clickable "close modal button" displayed as an X */}
                    <Feather name="x" size={ICON_SIZE} color="black" onPress={closeModal} style={styles.close} />

                    {/* Text displayed based on the winner*/}
                    <View style={styles.textView}>
                        <Text style={[styles.congrats, { color: winnerColor }]}>{language.WinnerModal.congrats}</Text>
                        <Text style={styles.modalText}>
                            {language.WinnerModal.winnerIs}
                            <Text style={[styles.winner, { color: winnerColor }]}>
                                {language.WinnerModal.player}{winner}
                            </Text>
                            {language.WinnerModal.goBack}</Text>
                    </View>

                </View>
            </View>

        </Modal>

    );
}

// Styles for winner modal
//
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: responsiveWidth(100),
    },
    modalContent: {
        width: responsiveWidth(80),
        padding: '3%',
        backgroundColor: '#F8FFFF',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    playersContainer: {
        alignItems: 'baseline',
        flexDirection: "row",
        alignSelf: 'center',
    },
    players: {
        fontSize: responsiveFontSize(12),
        fontFamily: 'bold',
        color: '#C2933F',
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    close: {
        textAlign: 'right',
    },
    textView: {
        padding: '2%',
    },
    modalText: {
        fontSize: responsiveFontSize(2.5),
        marginBottom: responsiveHeight(2),
    },
    winner: {
        fontWeight: 'bold',
    },
    congrats: {
        marginTop: '5%',
        fontFamily: 'oxfordStreet',
        fontSize: responsiveFontSize(5),
    }
});

//************
// END of file WinnerModal.jsx
//************