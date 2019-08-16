import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class FilmDetail extends Component {
  state = {};
  render() {
    return (
      <View style={styles.main_container}>
        <Text>Détail du film {this.props.navigation.state.params.idFilm}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
});
export default FilmDetail;
