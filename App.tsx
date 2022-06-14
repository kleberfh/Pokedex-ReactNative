import {RecoilRoot} from "recoil";
import Router from "./router/router";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
    <RecoilRoot>
      {/* @ts-ignore */}
      <NavigationContainer initialRouteName="Home">
        <Router />
      </NavigationContainer>
    </RecoilRoot>
  );
}