import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { Loading } from './LoadingComponent';
const mapStatetoProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}


class Menu extends Component {

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
                <Tile
                    key={index}    //index is supplied through KeyExtractor
                    title={item.name}
                    caption={item.description}
                    featured //remove the right scroll in IOS
                    imageSrc={{ uri: baseUrl + item.image }}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                //onPress will show the view of Dishdetail component and the item.id would be available
                //to the Dishdetail component onPress
                //select the dish from the list
                //item id will be passed as parameter when the picture is pressed and that will come in maincomponent
                //which will set the selected dish, and then dish detail will be re-rendered with the selected dish
                //takes an image and renders it
                />
            )
        }
        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{props.dishes.errMess}</Text>
                </View>
            );
        }
        else {
            return (
                <FlatList
                    data={this.props.dishes.dishes}    //props.dishes i
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

}

export default connect(mapStatetoProps)(Menu);