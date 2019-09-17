import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button
} from 'react-native';
import { connect } from 'react-redux';
import Heartbeat from './Heartbeat';
import work from './work.png';
import {store, setUser} from "./store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

class AddUser extends React.Component {
  state = {
    user: ""
  }

  addNewUser = () => {
    store.dispatch(setUser(this.state.user));
  }

  render() {
    return (
      <View style = {styles.view}>
        <Text>Enter Name:</Text>
        <TextInput onChangeText={text => this.setState({user: text})} value={this.state.user}/>
        <Button title="Login" onPress={this.addNewUser}></Button>
      </View>
    )
  }
}

const App = ({ heartBeat, user}) => {
  const imageSize = heartBeat ? '90deg': '270deg';
  let AttendanceComponent =   (
  <View style={styles.container}>
    <View style={styles.view}>
      <Image source={work} style={{ width: 100, height: 100, transform: [{rotate: imageSize}] }} resizeMode="contain" />
    </View>
    <View style={styles.view}>
      <TouchableOpacity style={styles.button} onPress={() => Heartbeat.startService()}>
        <Text style={styles.instructions}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => Heartbeat.stopService()}>
        <Text style={styles.instructions}>Stop</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
    
  if (user == ''){
    return (<AddUser></AddUser>);
  }
  else {
    return  (AttendanceComponent);
  }
};

const mapStateToProps = store => ({
  heartBeat: store.App.heartBeat,
  user: store.App.user
});

export default connect(mapStateToProps)(App);
