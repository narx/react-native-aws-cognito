import React, { Component } from 'react';
import { Platform } from "react-native"
import { Container, Content, List, ListItem, Left, Text, Icon } from "native-base";

const datas = [
    {
        name: "TransactionPage",
        route: "TransactionPage",
        icon: "phone-portrait",
        bg: "#C5F442"
    },
    {
        name: "PayrollPage",
        route: "PayrollPage",
        icon: "phone-portrait",
        bg: "#C5F442"
    },
];


class BottomNavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          shadowOffsetWidth: 1,
          shadowRadius: 4
        };
    }

    render() {
        return (
            <Container>
                <Content>
                <List 
                    dataArray={datas}
                    renderRow={data => 
                        <ListItem
                            button
                            noBorder
                            onPress={() => this.props.navigation.navigate(data.route)}>
                            <Left>
                                <Icon
                                    active
                                    name={data.icon}
                                    style={{ color: "#777", fontSize: 26, width: 30 }}
                                />
                                <Text style={{
                                    fontWeight: Platform.OS === "ios" ? "500" : "400",
                                    fontSize: 16,
                                    marginLeft: 20
                                }}>
                                    {data.name}
                                </Text>
                            </Left>
                        </ListItem>}
                        />
                    </Content>
            </Container>
        )
    }
}

export default BottomNavigationBar;