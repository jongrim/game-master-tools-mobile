/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput
} from "react-native";

import { Button, Overlay } from "react-native-elements";

class App extends React.Component {
  state = {
    characters: [],
    newCharacterOverlayVisible: true
  };

  handleInitiativeChange = ({ name, text }) => {
    this.setState(state => ({
      ...state,
      [name]: text
    }));
  };

  sortCharacters = () => {
    this.setState(state => {
      const newState = {
        ...state
      };
      newState.characters = state.characters.sort((a, b) => {
        return (Number(newState[a]) > Number(newState[b])) * -1;
      });
      return newState;
    });
  };

  addCharacter = ({ name, initiative }) => {
    this.setState(state => {
      const newCharacters = state.characters.concat(name);
      const newState = {
        ...state,
        [name]: initiative
      };
      newState.characters = newCharacters.sort((a, b) => {
        return (Number(newState[a]) > Number(newState[b])) * -1;
      });
      return newState;
    }, this.toggleNewCharacterOverlay);
  };

  removeCharcter = name => {
    this.setState(state => {
      const newCharacters = state.characters.filter(c => c !== name);
      const newState = {
        ...state,
        characters: newCharacters
      };
      delete newState[name];
      return newState;
    });
  };

  toggleNewCharacterOverlay = () => {
    this.setState(({ newCharacterOverlayVisible }) => ({
      newCharacterOverlayVisible: !newCharacterOverlayVisible
    }));
  };

  render() {
    const { characters, newCharacterOverlayVisible } = this.state;
    return (
      <SafeAreaView style={styles.sectionContainer}>
        <Text style={styles.heading}>Initiative Tracker</Text>
        <ScrollView>
          {characters.map(c => (
            <Character
              key={c}
              initiative={this.state[c]}
              name={c}
              onChange={this.handleInitiativeChange}
              onDelete={this.removeCharcter}
              onEnd={this.sortCharacters}
            />
          ))}
        </ScrollView>
        <Button
          buttonStyle={styles.button}
          onPress={this.toggleNewCharacterOverlay}
          raised
          title="Add New"
        />
        <Overlay
          isVisible={newCharacterOverlayVisible}
          height={175}
          onBackdropPress={this.toggleNewCharacterOverlay}
        >
          <NewCharacter onSubmit={this.addCharacter} />
        </Overlay>
      </SafeAreaView>
    );
  }
}

const Character = ({ initiative, name, onChange, onDelete, onEnd }) => (
  <View style={styles.characterContainer}>
    <Text style={{ flex: 1 }}>{name}</Text>
    <TextInput
      keyboardType="numeric"
      value={`${initiative}`}
      onChangeText={text => onChange({ name, text })}
      onEndEditing={onEnd}
      selectTextOnFocus
    />
    <View>
      <Button
        buttonStyle={styles.removeButton}
        icon={{ color: "white", name: "close", size: 15 }}
        onPress={() => onDelete(name)}
        raised
      />
    </View>
  </View>
);

class NewCharacter extends React.Component {
  _defaultState = {
    name: "",
    initiative: ""
  };

  state = {
    ...this._defaultState
  };

  handleChange = ({ field, text }) => {
    this.setState({ [field]: text });
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  };

  render() {
    return (
      <View>
        <TextInput
          autoFocus
          placeholder="Character name"
          onChangeText={text => this.handleChange({ field: "name", text })}
        />
        <TextInput
          keyboardType="numeric"
          placeholder="Initiative"
          onChangeText={text =>
            this.handleChange({ field: "initiative", text })
          }
        />
        <Button
          buttonStyle={styles.addCharacterButton}
          title="Add Character"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#444554"
  },
  body: {
    color: "#172121"
  },
  sectionContainer: {
    color: "#172121",
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 24,
    flex: 1
  },
  characterContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  removeButton: {
    borderRadius: 50,
    backgroundColor: "#444554"
  },
  addCharacterButton: {
    backgroundColor: "#708D81"
  },
  heading: {
    fontWeight: "600",
    fontSize: 24
  }
});

export default App;
