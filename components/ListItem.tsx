import {Image, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import Loading from "./Loading";
import {getPokemon} from "../services/pokeApi";

interface ListItem {
  pokemon: Pokemon,
}

export default function ListItem(props: ListItem) {
  const [pokemon, setPokemon] = useState(props.pokemon);
  const [loading, setLoading] = useState(true);

  const name: string = pokemon.name;
  const id: string = pokemon.url.split('/pokemon/')[1];

  useEffect(() => {
    getPokemon(id)
      .then((response: any) => {
        setPokemon({
          ...pokemon,
          id: response.order,
          image: response.sprites.other['official-artwork'].front_default
        });
        setLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container} key={name}>
      {loading ? (
        <View style={styles.loading}>
          <Loading
            size={60}
            color={'#E63D33'}
          />
        </View>
      ) : (
        <View style={styles.pokemon_container}>
          <Image
            key={pokemon.image}
            style={styles.pokemon_image}
            source={{ uri: pokemon.image }}
          />
          <Text style={styles.pokemon_name}>
            {name}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 165,
    height: 165,
    padding: 10,
    marginTop: 20,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loading: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pokemon_container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  pokemon_image: {
    width: 120,
    height: 110
  },
  pokemon_name: {
    marginTop: 5,
    fontSize: 26,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.8)',
  }
});
