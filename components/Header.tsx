import {useState} from "react";
import {useSetRecoilState} from "recoil";
import {pokemonsAtom} from "../atoms/pokemons";
import {getPokemons, searchPokemon} from "../services/pokeApi";
import {Image, StyleSheet, Text, TextInput, View, Animated} from 'react-native';

export default function Header({translateHeader, fadeOut, translateLogo}) {
  const [query, setQuery] = useState('');
  const setPokemons = useSetRecoilState(pokemonsAtom);

  const handleSearch = () => {
    if (query !== '') {
      searchPokemon(query.toLocaleLowerCase())
        .then((response: any) => {
          setPokemons([
            {
              name: response.name,
              url: `https://pokeapi.co/api/v2/pokemon/${response.id}/`
            }
          ]);
        })
        .catch((error: any) => {
          setPokemons([]);
          console.log(error);
        })
    } else {
      getPokemons()
        .then((response: any) => {
          setPokemons(response.results);
        })
        .catch((error: any) => {
          console.log(error);
          setPokemons([]);
        })
    }
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: translateHeader
            }
          ]
        }
      ]}
    >
      <Animated.View style={[styles.logo_container, { transform: [{ translateY: translateLogo }] }]}>
        <Image
          style={styles.logo_image}
          source={{ uri: 'https://s2.coinmarketcap.com/static/img/coins/200x200/8303.png'}}
        />
        <Text style={styles.title}>
          Pokedex
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          width: '100%',
          opacity: fadeOut
        }}
      >
        <TextInput
          value={query}
          style={styles.search}
          onChangeText={setQuery}
          returnKeyType={'search'}
          placeholder={"Buscar pokemon"}
          onSubmitEditing={handleSearch}
          placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    height: 140,
    width: '100%',
    paddingTop: 20,
    display: 'flex',
    position: "absolute",
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#E63D33'
  },
  logo_container: {
    top: 40,
    display: 'flex',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  logo_image: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  title: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center'
  },
  search: {
    height: 40,
    padding: 10,
    width: '90%',
    fontSize: 18,
    color: "#FFF",
    marginBottom: 10,
    borderRadius: 10,
    fontWeight: '500',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  }
});
