
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import { resetNavigationTo } from '../../utils';

class Login extends Component {
    props: {
        isAuthenticated: boolean,
        navigation: Object,
    };

    componentDidMount() {
        // const { isAuthenticated, navigation } = this.props;

        // if (isAuthenticated) {
        //     resetNavigationTo('Main', navigation);
        // } else {
        //     resetNavigationTo('Login', navigation);
        // }
    }

    render() {
        return (
            <View>
                <Input
                    placeholder="Email"
                    leftIcon={
                        <Icon
                            name="user"
                            size={24}
                            color="black"
                        />
                    }
                />
                <Input
                    placeholder="Password"
                    leftIcon={
                        <Icon
                            name="password"
                            size={24}
                            color="black"
                        />
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export const HomeScreen = connect(mapStateToProps)(Login);
