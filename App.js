import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import CreateAccountScreen from "./src/screens/CreateAccountScreen";
import TermsAndConditionsScreen from "./src/screens/TermsAndConditionsScreen";
import MapScreen from "./src/screens/MapScreen";

const mainStack = createStackNavigator(
  {
    Login: LoginScreen,
    CreateAccount: CreateAccountScreen,
    MapScreen: MapScreen,
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      title: "Bathroom Break",
      headerShown: false,
    },
  }
);

const rootStack = createStackNavigator(
  {
    Main: {
      screen: mainStack,
    },
    TermsAndConditions: {
      screen: TermsAndConditionsScreen,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);

export default createAppContainer(rootStack);
