import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
//created about component to use drawer based menu
const mapStatetoProps = state => {
    return {
        leaders: state.leaders
    }
}
class About extends Component {
    render() {
        const renderAboutItem = ({ item, index }) => {
            // const { params } = this.props.navigation.state;
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                    hideChevron={true}
                />
            )
        }
        //created two card components, one for our history and second for displaying corporate information
        //put both the card components in a single scrollview
        return (
            <ScrollView>

                <Card title="Our History">
                    <Text style={styles.paragraph}>

                        Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                    {'\n'}{'\n'}
                    The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
        </Text>
                </Card>
                <Card title="Corporate Information">
                    <FlatList
                        data={this.props.leaders.leaders}
                        renderItem={renderAboutItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView >)
    }
}
const styles = StyleSheet.create({
    paragraph: {
        fontSize: 15,
    },
});

export default connect(mapStatetoProps)(About);