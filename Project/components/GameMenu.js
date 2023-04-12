import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

export default function GameMenu({ navigation }) {
    const menuReference = useRef();

    return (
        <MenuProvider style={styles.container} ref={menuReference}>
            <Menu>
                <MenuTrigger style={styles.menuButton}>
                    <Entypo name="menu" size={45} color="black" />
                </MenuTrigger>
                <MenuOptions style={styles.menuOptions}>
                    <MenuOption
                        style={styles.menuOption}
                    >
                        <Text>Hide menu</Text>
                    </MenuOption>
                    <MenuOption
                        style={styles.menuOption}
                        onSelect={() => navigation.popToTop()}
                    >
                        <Text>Back to main menu</Text>
                    </MenuOption>
                    <MenuOption
                        style={styles.menuOption}
                        onSelect={() => alert(`Undo`)}
                    >
                        <EvilIcons name="undo" size={24} color="black" />
                        <Text>Undo</Text>
                    </MenuOption>
                    <MenuOption
                        style={styles.menuOption}
                        onSelect={() => alert(`Redo`)}
                    >
                        <EvilIcons name="redo" size={24} color="black" />
                        <Text>Redo</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </MenuProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "grey",
        padding: 4,
    },
    menuButton: {
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 16,
    },
    menuOptions: {
    },
    menuOption: {
        flexDirection: 'row'
    }
});