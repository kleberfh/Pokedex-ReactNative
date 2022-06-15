import {View, StyleSheet, Text} from "react-native";
import Moves from "../screens/moves";
import BaseStats from "../screens/baseStats";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {getFirstPokemonType, pokemonTypesColors} from "../utilities/utilities";

const Tab = createMaterialTopTabNavigator();

export default function DetailMenu(props: { pokemon: PokemonData | null; }) {
  const pokemon: PokemonData | null = props.pokemon;

  const getPokemonTypeColor = () => {
    return pokemonTypesColors[getFirstPokemonType(pokemon)];
  }

  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: getPokemonTypeColor(),
          }
        }}
      >
        <Tab.Screen name="BaseStats">
          {/* @ts-ignore */}
          {props => <BaseStats pokemon={pokemon} {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Moves">
          {/* @ts-ignore */}
          {props => <Moves pokemon={pokemon} {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});