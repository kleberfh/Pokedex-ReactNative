import {Text, View, StyleSheet} from "react-native";
import DetailRow from "../components/DetailRow";

interface Stats {
  label: string
  value: number
}

export default function BaseStats(props: { pokemon: PokemonData; }) {
  const pokemon: PokemonData = props.pokemon;

  const getPokemonBaseStats = () => {
    return pokemon.stats.map((stat: PokemonStats) => {
      return {
        label: stat.stat.name,
        value: stat.base_stat,
      } as Stats;
    });
  }

  return (
    <View style={styles.container}>
      {getPokemonBaseStats().map(
        (stat: Stats, index: number) => (
          <DetailRow
            key={index}
            label={stat.label}
            value={stat.value}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
});