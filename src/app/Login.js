import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Container, Text, Form, Item, Input } from 'native-base';

export default class Login extends Component {
    handleLogin(){
        return NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })],
        })
    }

    render(){
        return (
            <Container style={styles.container}  >
                <Form>
                    <Item>
                        <Input placeholder="Username" />
                    </Item>
                    <Item last>
                        <Input placeholder="Password" secureTextEntry/>
                    </Item>
                    <Button onPress={()=>this.props.navigation.dispatch(this.handleLogin())} title="Login" />
                </Form>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
  });