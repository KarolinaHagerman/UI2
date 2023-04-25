import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

// TODO: should this be a class instead? Can we even get to navigation in that case?
export default function GameMenu( props ) {
    const { navigation, showMenu, hideMenu, language } = props;
    const menuReference = useRef();

    return (
        <MenuProvider
            style={styles.container}
            ref={menuReference}
        >
            <Menu>
                <MenuTrigger style={styles.menuButton} onPress={showMenu}>
                    <Entypo name="menu" size={45} color="black" />
                </MenuTrigger>
                <MenuOptions style={styles.menuOptions}>
                    <MenuOption style={styles.menuOption} onSelect={hideMenu}>
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
                        onSelect={() => alert(`Undo`)}
                    >
                        <Text>{language.GameMenu.undo}</Text>
                        <EvilIcons name="undo" size={20} color="black" />
                    </MenuOption>
                    <MenuOption
                        style={styles.menuOption}
                        onSelect={() => alert(`Redo`)}
                    >
                        <Text>{language.GameMenu.redo}</Text>
                        <EvilIcons name="redo" size={20} color="black" />
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </MenuProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
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
        margin: 10,
    },
    menuOption: {
        flexDirection: 'row',
    }
});