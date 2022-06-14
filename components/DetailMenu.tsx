import {View, StyleSheet, Text} from "react-native";
import About from "../screens/about";
import Moves from "../screens/moves";
import BaseStats from "../screens/baseStats";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {getFirstPokemonType, pokemonTypesColors} from "../utilities/utilities";

const Tab = createMaterialTopTabNavigator();

export default function DetailMenu(props: { pokemon: PokemonData; }) {
  const pokemon: PokemonData = props.pokemon;

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
        <Tab.Screen name="About">
          {/* @ts-ignore */}
          {props => <About
            {...props}
          />}
        </Tab.Screen>
        <Tab.Screen name="Moves">
          {/* @ts-ignore */}
          {props => <Moves
            {...props}
          />}
        </Tab.Screen>
        <Tab.Screen name="BaseStats">
          {/* @ts-ignore */}
          {props => <BaseStats
            {...props}
          />}
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