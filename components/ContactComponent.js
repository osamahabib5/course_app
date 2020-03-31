import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-elements';
//created contact component to use drawer based menu
class Contact extends Component {
    render() {
        return (
            <Card title="Contact Information">
                <Text style={styles.paragraph}>
                    Our Address
{'\n'}{'\n'}
121, Clear Water Bay Road
{'\n'}{'\n'}
Clear Water Bay, Kowloon
{'\n'}{'\n'}
HONG KONG
{'\n'}{'\n'}
Tel: +852 1234 5678
{'\n'}{'\n'}
Fax: +852 8765 4321
{'\n'}{'\n'}
Email:confusion@food.net
        </Text>
            </Card>
        )
    }
}
const styles = StyleSheet.create({
    paragraph: {
        fontSize: 15,
    },
});
export default Contact;