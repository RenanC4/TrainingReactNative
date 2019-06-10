import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import {View, Card, Text, Image, TextInput, TextArea, Typography, Modal, Button} from 'react-native-ui-lib';
import {connect} from "react-redux";
import {
  userLogoff,
} from '../actions/user/user';

class ProfileDropdown extends React.Component {

  state = {
    profileDropdownVisible: false,
  }

  _toggleProfileDropdownVisibility = () => {
    this.setState({profileDropdownVisible: !this.state.profileDropdownVisible})
  }

  componentDidMount() {
    this.setState({profileDropdownVisible: false})
  }

  render() {
    return (
      <View style={{height:100}}>
        <Button
          style={styles.dropdownButton}
          title="dropdownButton"
          onPress={this._toggleProfileDropdownVisibility}>
          <Ionicons style={styles.dropdownButtonChevron}
                    name={this.state.profileDropdownVisible == true ? 'ios-arrow-up' : 'ios-arrow-down'}
                    size={25}
                    color="white"/>

          <Image style={styles.profileImage}
                 source={this.props.imageSource}
                 resizeMode="cover"
          />
        </Button>

        {this.state.profileDropdownVisible == true &&
        <View style={styles.dropdownContainer}>

          <Card width={230} style={{marginRight: 20, zIndex: 2}} elevation={7}>
            <View padding-15>
              <Button style={styles.dropdownItemSingle}>
                <Text style={styles.dropdownItemSingleText}>
                  Edit profile
                </Text>
              </Button>
              <Button style={styles.dropdownItemSingle}>
                <Text style={styles.dropdownItemSingleText}>
                  Messages
                </Text>
              </Button>
              <Button style={styles.dropdownItemSingle}
                      onPress={() => this.props.onLogoutButtonClick(this.props)}>
                <Text style={styles.dropdownItemSingleText}>
                  Logout
                </Text>
              </Button>
            </View>
          </Card>

        </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2 - 1,
  },
  dropdownButton: {
    backgroundColor: 'transparent',
    width: 80,
    overflow: 'visible',
  },
  dropdownButtonChevron: {
    marginTop: 5,
    marginRight: 5,
  },
  dropdownContainer: {
      height: 180,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    position: 'absolute',
    top: 80,
    right: -10,
    zIndex: 5000,
  },
  dropdownItemSingle: {
    backgroundColor: 'transparent',
    padding: 15,
  },
  dropdownItemSingleText: {
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'sf-regular',
  },
  dropdownItemSingleIcon: {
    position: 'relative',
    marginLeft: -10
  },

});

function mapDispatchToProps(dispatch) {
  return {
    onLogoutButtonClick: (props) => {
      props.navigation.navigate('Login')
      dispatch(userLogoff())
    }
  }
}

export default connect(null, mapDispatchToProps)(ProfileDropdown);
