import Header from "./Header";
import ListItem from "./ListItem";
import {useRecoilState} from "recoil";
import {pokemonsAtom} from "../atoms/pokemons";
import {getPokemons} from "../services/pokeApi";
import {useEffect, useRef, useState} from "react";
import {StyleSheet, Text, ImageBackground, Animated} from "react-native";

const HEADER_MIN_HEIGHT = 80;
const HEADER_MAX_HEIGHT = 140;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const LOGO_MIN_TOP = 40;
const LOGO_MAX_TOP = 98;
const LOGO_SCROLL_DISTANCE = LOGO_MAX_TOP - LOGO_MIN_TOP;

export default function List() {
  const scroll = useRef(new Animated.Value(0)).current;
  const translateHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, - HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });
  const translateLogo = scroll.interpolate({
    inputRange: [0, LOGO_SCROLL_DISTANCE],
    outputRange: [0, LOGO_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });
  const fadeOut = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useRecoilState(pokemonsAtom);

  const fetchPokemons = () => {
    setLoading(false);
    getPokemons()
      .then((response: any) => {
        setPokemons(response.results);
        setLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        setLoading(false);
      })
  };

  useEffect(() => {
    if (loading) {
     fetchPokemons();
    }
  }, []);

  return (
    <Animated.View style={styles.container}>
      {loading ? (
        <Text>
          Carregando pokemons...
        </Text>
      ) : (
        <ImageBackground
          style={styles.background}
          source={{ uri: 'https://i.pinimg.com/originals/df/4e/8b/df4e8ba28f912bf9cdf9fa0dfc196411.png' }}
        >
          <Header
            fadeOut={fadeOut}
            translateLogo={translateLogo}
            translateHeader={translateHeader}
          />
          <Animated.FlatList
            data={pokemons}
            numColumns={2}
            horizontal={false}
            keyExtractor={item => item.name}
            renderItem={
              ({item}) => <ListItem pokemon={item} />
            }
            contentContainerStyle={styles.listContainer}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scroll}}}], {
              useNativeDriver: true,
            })}
            scrollEventThrottle={1}
          />
        </ImageBackground>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  background: {
    height: '100%',
  },
  listContainer: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 180,
    marginTop: HEADER_MAX_HEIGHT
  }
});
