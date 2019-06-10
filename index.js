import './config/ReactotronConfig'

import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, View, YellowBox} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';

import {Provider} from 'react-redux';
import {AppNavigator} from './actions/navigator';

import Store from './store/store';

YellowBox.ignoreWarnings(['Remote debugger']);

const store = Store;
GLOBAL.self = GLOBAL;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <Provider store={store}>
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        </Provider>
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
            <AppNavigator/>
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/img/sw-logo-white.png'),
        require('./assets/img/bg/bg.png'),
        require('./assets/img/default-user.jpg'),
        require('./assets/img/dummy/timelinedummy.jpg'),
        require('./assets/img/dummy/workordercard.jpg'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'sf-bold': require('./assets/fonts/SFProDisplay-Bold.ttf'),
        'sf-light': require('./assets/fonts/SFProDisplay-Light.ttf'),
        'sf-medium': require('./assets/fonts/SFProDisplay-Medium.ttf'),
        'sf-regular': require('./assets/fonts/SFProDisplay-Regular.ttf'),
        'sf-semibold': require('./assets/fonts/SFProDisplay-Semibold.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({isLoadingComplete: true});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
