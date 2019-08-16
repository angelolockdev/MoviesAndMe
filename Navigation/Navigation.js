import { createStackNavigator, createAppContainer } from "react-navigation";
import Search from "../components/Search";
import FilmDetail from "../components/FilmDetail";

const SearchNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Recherche"
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
});

export default createAppContainer(SearchNavigator);
