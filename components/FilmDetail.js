import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  Image
} from "react-native";
import { getFilmDetailFromApi, getImageFromApi } from "../API/TMDBApi";

class FilmDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true
    };
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  _displayFilm() {
    if (this.state.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.backdrop_image}
            source={{ uri: getImageFromApi(this.state.film.backdrop_path) }}
          />
          <Text style={styles.detail_container}>{this.state.film.title}</Text>
          <Text>{this.state.film.overview}</Text>
          <Text>Sorti le {this.state.film.release_date}</Text>
          <Text>Note : {this.state.film.vote_average}</Text>
          <Text>Nombre de votes : {this.state.film.vote_count}</Text>
          <Text>Budget : {this.state.film.budget}</Text>
          <Text>Genre(s) : le {this.state.film.genres}</Text>
          <Text>Companie(s) {this.state.film.production_companies}</Text>
        </ScrollView>
      );
    }
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(
      data => {
        this.setState({
          film: data,
          isLoading: false
        });
      }
    );
  }

  render() {
    console.log("Render");
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}

        {this._displayFilm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollview_container: {
    flex: 1
  },
  backdrop_image: {
    flex: 1,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 4
  },
  detail_container: {
    flex: 1,
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
    margin: 10
  }
});
export default FilmDetail;
