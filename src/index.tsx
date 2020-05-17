import React from "react";
import AppNavigator from "./navigation/navigation";
import {ThemeProvider} from "react-native-elements";
import {HttpLink, InMemoryCache, ApolloClient, ApolloProvider} from "@apollo/client";

const link = new HttpLink({
    uri:"https://zjo9h3bqle.execute-api.eu-west-2.amazonaws.com/dev/graphql",
    credentials: 'include'
});

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});

export default () => (
        <ApolloProvider client={client}>
            <ThemeProvider>
                <AppNavigator/>
            </ThemeProvider>
        </ApolloProvider>
);