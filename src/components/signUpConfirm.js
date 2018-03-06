import React, { Component } from 'react';
import { View, StatusBar } from "react-native";
import { Container, Button, Header, Left, Right, Text, Content, Icon, Body, Title, Form, Item, Input, Label } from "native-base";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { setUser } from "../actions/user";
import { Auth } from 'aws-amplify';





const validate = values => {
    const error = {};
    error.code = "";
    var code = values.code;
    if (values.code === undefined) {
        code = "";
    }

    if (code == "") {
      error.code = "Required";
    }
    
    
    return error;
  };

class SignUpComfirm extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (values, dispatch) => {
        return new Promise((resolve, reject) => {
            
            Auth.confirmSignUp(this.props.name, values.code).then((result) => {
                resolve(this.props.name)
            }).catch(error=> {
                reject(error);
            });
            
        })
    }

    renderInput({
        input,
        label,
        type,
        meta: { touched, error, warning },
        inputProps
      }) {
        var hasError = false;
        if (error !== undefined) {
          hasError = true;
        }
        return (
          <Item error={hasError}>
            <Icon active name={"unlock"} />
            <Input
              placeholder={"CODE"} autoCapitalize='none'
              {...input}
            />
            {hasError
              ? <Item style={{ borderColor: "transparent" }}>
                  <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>
                </Item>
              : <Text />}
          </Item>
        );
      }

    render = () => (
        <Container>
            <View style={{flex: 1, justifyContent: "center", padding:30}}>
                <Text>{this.props.name} 메일로 발송된 승인코드를 입력해주세요.</Text>
                <Field name="code" component={this.renderInput} />
                <Button primary={true}
                style={{alignSelf: "center", marginTop: 10 }}
                onPress={this.props.handleSubmit(this.onSubmit)} disabled={this.props.pristine || this.props.invalid || this.props.submitting}>
                <Text>인증</Text>
                </Button>
            </View>
        </Container>
    )
}

let mapStateToProps = (state) => {
    return {
        name: state.persist.user.name
    }
}

SignUpComfirm = connect(mapStateToProps)(SignUpComfirm);

const SignUpComfirmSwag = reduxForm(
    {
        form: "signupconfirm",
        validate,
        onSubmitSuccess: (result, dispatch, props) => {
            dispatch(setUser(result));
            props.navigation.navigate("Login");
        }
    }
)(SignUpComfirm);

export default SignUpComfirmSwag;