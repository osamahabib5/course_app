import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

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
class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    render() {

        const { dishId } = this.props.route.params; //getting the dishId of the
        //selected dish when selecting a dish from the menu

        return (<RenderDish dish={this.state.dishes[+dishId]} />)  //we are using [+dishId] to show only
        //that dish whose dishId we have retrieved and + is used to convert the id from string to number 

    }
}

export default Dishdetail;