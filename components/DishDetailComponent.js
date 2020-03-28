import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';


//render details of the dish
//card to create a view
function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card                   //to render the dish
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}
            >
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
            </Card>
        )
    }
    else {
        return (
            <View></View>
        )
    }
}


//return RenderDish which takes props.dish as property 
//dishdetail will render a chosen dish
function Dishdetail(props) {
    return (<RenderDish dish={props.dish} />)
}

export default Dishdetail;