import React, { Component } from 'react';
import { View, StatusBar } from "react-native";
import { Container, Button, Header, Left, Right, Text, Content, Icon, Body, Title } from "native-base";

import { connect } from 'react-redux';

class TransactionPage extends Component {
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
                    <Title>TransactionPage</Title>
                </Body>
                <Right />
                </Header>
            <Content style={{padding:40}}>
                <Text>로그인 :</Text>
                <Text>{this.props.name}</Text>
            </Content>
        </Container>
    )
}

let mapStateToProps = (state) => {
    return {
        name: state.persist.user.name
    }
}

TransactionPage = connect(mapStateToProps)(TransactionPage);

export default TransactionPage
