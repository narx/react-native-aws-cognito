import React, { Component } from 'react';
import { View, StatusBar } from "react-native";
import { Container, Button, Header, Left, Right, Text, Content, Icon, Body, Title } from "native-base";

class PayrollPage extends Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <Container>
            <Header>
                <Left>
                    <Button
                    transparent
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}
                    >
                    <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>PayrollPage</Title>
                </Body>
                <Right />
                </Header>
            <Content>
                <Text>PayrollPage2333322</Text>
            </Content>
        </Container>
    )
}

export default PayrollPage
