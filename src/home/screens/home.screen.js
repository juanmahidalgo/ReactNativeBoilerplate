
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { resetNavigationTo } from '../../utils';

class Home extends Component {
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
                <Text> Hola </Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export const HomeScreen = connect(mapStateToProps)(Home);
