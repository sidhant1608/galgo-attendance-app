import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import {setHeartBeat, store } from './store';

const MyHeadlessTask = async () => {
  navigator.geolocation.watchPosition(
    position => {
      var user = store.getState().App.user;
      position.user = user;
      var location = JSON.stringify(position);
      fetch("https://galgo-app.herokuapp.com/api/locations/add",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: location
      })
      console.log(location);
    },
    error => {console.log(error);},{enableHighAccuracy: true}
  );
  console.log('Receiving HeartBeat!');
  store.dispatch(setHeartBeat(true));
  setTimeout(() => {
    store.dispatch(setHeartBeat(false));
  }, 1000);
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
