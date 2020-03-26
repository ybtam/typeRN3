import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

import CheckToken from "../screens/checkToken";
import signedOutNavigator from "./signedOut";
import signedInNavigator from "./signedIn/signedIn";
import {AsyncStorage} from "react-native";

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const app = createStackNavigator();

export default function AppNavigator(){
    const [isReady, setIsReady] = React.useState(false);
    const [initialState, setInitialState] = React.useState(__DEV__ ? false : true);

    React.useEffect(() => {
        const restoreState = async () => {
            try {
                const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
                const state = JSON.parse(savedStateString);

                setInitialState(state);
            } finally {
                setIsReady(true);
            }
        };

        if (!isReady) {
            restoreState().then();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return(
        <NavigationContainer
            initialState={initialState}
            onStateChange={state =>
                AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
            }
        >
            <app.Navigator screenOptions={{
                headerShown: false,
            }}>
                <app.Screen name="main" component={CheckToken}/>
                <app.Screen name="signedOut" component={signedOutNavigator}/>
                <app.Screen name="signedIn" component={signedInNavigator}/>
            </app.Navigator>
        </NavigationContainer>
    );
}