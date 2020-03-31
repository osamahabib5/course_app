import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';


class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES

        }
    }
    static navigationOptions = {
        title: 'Menu'
    }
    //set NavigationOptions to tell this is the Menu component

    render() {

        //when you use a navigator, there is a prop called navigation
        //the props that come from this component (react component) , we are extracting the navigation 
        //component from it
        const { navigate } = this.props.navigation;
        const renderMenuItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}    //index is supplied through KeyExtractor
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}  //remove the right scroll in IOS
                    leftAvatar={{ source: require('./images/uthappizza.png') }}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    navigate={this.props.navigation}
                //onPress will show the view of Dishdetail component and the item.id would be available
                //to the Dishdetail component onPress
                //select the dish from the list
                //item id will be passed as parameter when the picture is pressed and that will come in maincomponent
                //which will set the selected dish, and then dish detail will be re-rendered with the selected dish
                //takes an image and renders it
                />
            )
        }

        return (
            <FlatList
                data={this.state.dishes}    //props.dishes i
                renderItem={renderMenuItem}  //renderItem: how to render each item in the list,
                //this takes a parameter which renders each item at the list
                //props.dishes are an object and FLatlist would iterate over each of them
                //and render each given on the view in renderItem
                keyExtractor={item => item.id.toString()} //keyExtractor:
            //extract one of props of each item and use it as a key
            />

        )
    }

}

export default Menu;