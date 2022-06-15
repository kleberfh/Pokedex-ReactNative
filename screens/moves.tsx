import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import PokeballLoading from "../components/PokeballLoading";
import {pokemonTypesColors} from "../utilities/utilities";

interface Moves {
  label: string
  value: string
  type: string
}

export default function Moves(props: { pokemon: PokemonData; }) {
  const pokemon: PokemonData = props.pokemon;

  const [moves, setMoves] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  const fetchMoveType = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.type.name;
  }

  const getPokemonMoves = async () => {
    let movesWithType: Moves[] = [];
    await Promise.all(pokemon.moves.map(async (move: PokemonMove) => {
      const moveType = await fetchMoveType(move.move.url);
      movesWithType.push({
        label: move.move.name,
        value: move.move.url,
        type: moveType,
      });
    }));
    setMoves(movesWithType)
  }

  const fixMoveName = (label: string) => {
    const moveName = label.split("-");
    const firstLetter = moveName[0].charAt(0).toUpperCase();
    const restOfName = moveName[0].slice(1);
    return `${firstLetter}${restOfName} ${moveName[1] ?? ''}`;
  }

  useEffect(() => {
    getPokemonMoves().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <PokeballLoading />
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {moves.map(
        (move: Moves, index: number) => (
          <View key={index} style={[styles.moveContainer, { backgroundColor: pokemonTypesColors[move.type] }]}>
            <Text style={styles.move}>
              {fixMoveName(move.label)}
            </Text>
          </View>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    marginTop: 20,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  moveContainer: {
    padding: 10,
    width: "45%",
    borderRadius: 80,
    marginBottom: 20,
    alignItems: "center",
  },
  move: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: "center",
  }
});