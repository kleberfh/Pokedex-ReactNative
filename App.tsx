import {RecoilRoot} from "recoil";
import List from "./components/List";
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <RecoilRoot>
      <View style={styles.container}>
        <List />
      </View>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
