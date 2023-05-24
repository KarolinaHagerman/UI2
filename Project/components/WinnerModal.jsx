/*
File: WinnerModal.jsx

This file contains the JSX needed to create a winner modal that pops up when we have a winner.

Version 0.5
Author: Karolina Hagerman, Erik Blomsterberg

*/

// Imports
//
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal, Button } from "react-native";
import { Feather } from '@expo/vector-icons';
import { responsiveFontSize, responsiveHeight, responsiveWidth, useResponsiveFontSize } from "react-native-responsive-dimensions";

/*
WinnerModal:
A modal that pop up when we have a winner.
*/
export default function WinnerModal({ hasWinner, winner, winnerColor, language }) {
    const ICON_SIZE = useResponsiveFontSize(3);

    // Decides if the modal is visible or not
    //
    const [modalVisible, setModalVisible] = useState(false);

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

    // All elements presented to the user
    // 
    return (
        <Modal
            animationType="slide"
            transparent='true'
            visible={modalVisible}
        >
            <View style={styles.modalContainer}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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