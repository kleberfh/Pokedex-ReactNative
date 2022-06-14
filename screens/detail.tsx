import {useEffect, useState} from "react";
import { AntDesign } from '@expo/vector-icons';
// @ts-ignore
import CachedImage from 'expo-cached-image';
import DetailMenu from "../components/DetailMenu";
import {useNavigation} from "@react-navigation/native";
import PokeballLoading from "../components/PokeballLoading";
import {View, Text, StyleSheet, Pressable} from "react-native";
import {convertIdToThreeDigits, pokemonTypesColors, getFirstPokemonType} from "../utilities/utilities";

// @ts-ignore
export default function Detail({ route }) {
  const navigation = useNavigation();
  const pokemon = route.params.pokemon;

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState(null as PokemonData | null);

  const getPokemon = async () => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    setPokemonData(data);
    setLoading(false);
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

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
    <View
      style={[
        styles.container,
        { backgroundColor: pokemonTypesColors[getFirstPokemonType(pokemonData)] }
      ]}
    >
      <View style={styles.headerContainer}>
        <View style={styles.nameRow}>
          <Pressable
            onPress={handleGoBack}
            style={styles.backContainer}
          >
            {/* @ts-ignore */}
            <AntDesign name="arrowleft" size={32} color="#FFF" />
            <Text style={styles.name}>
              {`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`}
            </Text>
          </Pressable>
          <Text style={styles.name}>
            {`#${convertIdToThreeDigits(pokemon.id.toString())}`}
          </Text>
        </View>
        <View style={styles.typeRow}>
          {pokemonData?.types.map((type: PokemonTypes, index: number) => (
            <View style={styles.typeContainer} key={index}>
              <Text style={styles.type}>
                {`${type.type.name.charAt(0).toUpperCase()}${type.type.name.slice(1)}`}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.imageContainer}>
        <CachedImage
          style={styles.icon}
          cacheKey={"pokeball-icon"}
          source={{ uri: 'https://icon-library.com/images/pokeball-icon-png/pokeball-icon-png-12.jpg'}}
        />
        <CachedImage
          style={styles.image}
          cacheKey={pokemon.name}
          source={{ uri: pokemon.image }}
        />
      </View>
      <View style={styles.detailContainer}>
        <DetailMenu
          pokemon={pokemonData}
        />
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
    marginLeft: 10,
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
  backContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailContainer: {
    flex: 1,
    display: 'flex',
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  }
});