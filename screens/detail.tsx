import {View, Text, StyleSheet, Image} from "react-native";
import {useEffect, useState} from "react";
import Loading from "../components/Loading";
import {pokemonTypesColors} from "../utilities/utilities";
import PokeballLoading from "../components/PokeballLoading";

// @ts-ignore
export default function Detail({ route }) {
  const pokemon = route.params.pokemon;

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState(null);

  const getPokemon = async () => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    setPokemonData(data);
    setLoading(false);
  }

  useEffect(() => {
    getPokemon();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <PokeballLoading />
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: pokemonTypesColors[pokemonData.types[0].type.name]}]}>
      <View style={styles.headerContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>
            {`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`}
          </Text>
          <Text style={styles.name}>
            {`#${pokemon.id}`}
          </Text>
        </View>
        <View style={styles.typeRow}>
          {pokemonData?.types.map((type, index) => (
            <View style={styles.typeContainer} key={index}>
              <Text style={styles.type}>
                {`${type.type.name.charAt(0).toUpperCase()}${type.type.name.slice(1)}`}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: 'https://icon-library.com/images/pokeball-icon-png/pokeball-icon-png-12.jpg'}} style={styles.icon} />
        <Image source={{ uri: pokemon.image }} style={styles.image} />
      </View>
      <View style={styles.detailContainer}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#e6e6e6',
    flexDirection: 'column',
  },
  headerContainer: {
    paddingLeft: 20,
    display: 'flex',
    paddingRight: 20,
    flexDirection: 'column',
  },
  nameRow: {
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: 'bold',
  },
  typeRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  typeContainer: {
    paddingTop: 5,
    marginTop: 10,
    paddingLeft: 10,
    marginRight: 10,
    borderRadius: 80,
    paddingRight: 10,
    paddingBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  type: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  imageContainer: {
    zIndex: 1,
    display: 'flex',
    marginBottom: -80,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  icon: {
    top: -20,
    right: -50,
    width: 250,
    height: 250,
    opacity: 0.2,
    position: 'absolute',
  },
  image: {
    width: 320,
    height: 320,
  },
  detailContainer: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  }
});