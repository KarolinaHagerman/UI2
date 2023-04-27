import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { undoBoard, redoBoard } from 'C:/Users/hager/OneDrive/Dokument/UI Programming II/Project/js/gameLogic';

// TODO: should this be a class instead? Can we even get to navigation in that case?
export default function GameMenu(props) {
    const SYMBOL_SIZE = 20;
    const { navigation, showMenu, hideMenu, language, openCloseMenu, isVisible } = props;
    const menuReference = useRef();

    return (
        <MenuProvider
            style={styles.container}
            ref={menuReference}
        >
            <Menu style={styles.menu}>
                <MenuTrigger style={styles.menuButton} onPress={openCloseMenu}>
                    <Entypo name="menu" size={45} color="black" />
                </MenuTrigger>
                <MenuOptions style={styles.menuOptions}>
                    <MenuOption style={styles.menuOption} onSelect={openCloseMenu}>
                        <Text>{language.GameMenu.hideMenu}</Text>
                    </MenuOption>
                    <MenuOption
                        style={styles.menuOption}
                        onSelect={() => navigation.popToTop()}
                    >
                        <Text>{language.GameMenu.toMain}</Text>
                    </MenuOption>
                    <MenuOption
                        style={styles.menuOption}
                        onSelect={() => undo()}
                    >
                        <Text>{language.GameMenu.undo}</Text>
                        <EvilIcons name="undo" size={SYMBOL_SIZE} color="black" />
                    </MenuOption>
                    <MenuOption
                        style={styles.menuOption}
                        onSelect={() => redo()}
                    >
                        <Text>{language.GameMenu.redo}</Text>
                        <EvilIcons name="redo" size={SYMBOL_SIZE} color="black" />
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
        padding: 4,
        backgroundColor: 'red',
        flex: 1
    },
    menuButton: {
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 16,
    },
    menuOptions: {
        padding: 10,
        backgroundColor: 'lightblue',
    },
    menuOption: {
        flexDirection: 'row',
    }
});