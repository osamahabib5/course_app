import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View } from 'react-native';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishDetailComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    onDishSelect(SelectId) {
        this.setState({ selectedDish: SelectId })
    }
    render() {
        return (
            <View>
                <Menu dishes={this.state.dishes}
                    onPress={(dishid) => this.onDishSelect(dishid)}      //selecting a dish where all dishes 
                //are rendered
                />

                {/* render the selected dish */}
                <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                {/* filter return the subarray meeting the criteria where dishid is same as selected dish */}
            </View>
        )
    }
}

export default Main;