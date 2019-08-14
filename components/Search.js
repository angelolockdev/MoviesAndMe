import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Button,
  TextInput,
  FlatList
} from "react-native";
import FilmItem from "../components/FilmItem";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchedText = "";
    this.page = 0;
    this.totalPages = 0;
    this.state = { films: [], isLoading: false };
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        data => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false
          });
        }
      );
    }
  }

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: []
      },
      () => {
        this._loadFilms();
      }
    );
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadin_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textInput}
          placeholder="Titre du film"
          onChangeText={text => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button
          title="Rechercher"
          onPress={() => {
            this._searchFilms();
          }}
        />
        <FlatList
          data={this.state.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              this._loadFilms();
            }
          }}
        />
        {this._displayLoading()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main_container: {
    marginTop: 30,
    marginHorizontal: 10,
    flex: 1
  },
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#0be",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  loadin_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default Search;
