import {Text, View, StyleSheet} from "react-native";

const StatNameDictionary = {
  "hp": "HP",
  "attack": "Attack",
  "defense": "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  "speed": "Speed",
}

const StatColorDictionary = {
  "hp": "#fc4646",
  "attack": "#5ec039",
  "defense": "#f1c94b",
  "special-attack": "#006d94",
  "special-defense": "#e88e20",
  "speed": "#119b9b",
}

export default function DetailRow(props: { label: string; value: string | number; }) {
  const label: string = props.label;
  const value: string | number = props.value;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {StatNameDictionary[label]}
      </Text>
      <Text style={styles.value}>
        {value}
      </Text>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { backgroundColor: StatColorDictionary[label] }]} />
        <View style={{ width: `${100 - Number(value)}%` }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  label: {
    width: '25%',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.4)',
  },
  value: {
    width: '10%',
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.8)',
  },
  barContainer: {
    height: 5,
    width: '65%',
    display: 'flex',
    borderRadius: 80,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  bar: {
    flex: 1,
    height: 5,
    borderRadius: 80,
  }
});