import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Menu(props) {
    const renderMenuItem = ({ item, index }) => {
        return (
            <ListItem
                key={index}    //index is supplied through KeyExtractor
                title={item.name}
                subtitle={item.description}
                hideChevron={true}  //remove the right scroll in IOS
                leftAvatar={{ source: require('./images/uthappizza.png') }}
            />
        )
    }

    return (
        <FlatList
            data={props.dishes}    //props.dishes i
            renderItem={renderMenuItem}  //renderItem: how to render each item in the list,
            //this takes a parameter which renders each item at the list
            //props.dishes are an object and FLatlist would iterate over each of them
            //and render each given on the view in renderItem
            keyExtractor={item => item.id.toString()} //keyExtractor:
        //extract one of props of each item and use it as a key
        />

    )
}

export default Menu;