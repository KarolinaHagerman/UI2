import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal, Button } from "react-native";
import { isWinnerModalOpen } from "../js/gameLogic";
import { Feather } from '@expo/vector-icons';

export default function WinnerModal(props) {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(isWinnerModalOpen);
    }, [isWinnerModalOpen]);

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent='false'>

            <View style={styles.modalContent}>
                <Feather name="x" size={24} color="black" onPress={closeModal} style={styles.close} />
                <Text>Här står det lite kul text om vem som vunnit, även tiden ska stoppas och kanske nån knapp så man kan gå tillbaka till main menu. Men denna ruta kan stängas så att man se spelbrädet innan man väljer att gå tillbaka.</Text>

            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({

    modalContent: {
        margin: '13%',
        padding: '5%',
        backgroundColor: 'white',
        borderRadius: '5%',
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    close: {
        textAlign: 'right',
    }
});