import {Header, ListItem, Text} from "react-native-elements";
import React from "react";
import {FlatList, View} from "react-native";
import {useQuery} from "@apollo/client";
import {categoriesQuery} from "../../../graphql/queries";

interface category {
    id: number,
    name: string,
    description: string,
}

export default function Categories({navigation:{navigate}}) {

    const {data, loading, error} = useQuery(categoriesQuery);

    if (loading) return null;

    if (error) {
        console.info(error);
        return null;
    }

    const {categories} = data;

    return(
        <View>
            <ListItem
                title={"All"}
                onPress={() => navigate("Products", {categoryId: 0})}
                bottomDivider
                chevron
            />
            <FlatList
                data={
                    categories.map(category => ({...category, key:category.id.toString()}))
                }
                renderItem={
                    ({item}:{item: category}) =>
                        <ListItem
                            title={item.name}
                            onPress={() => navigate("Products", {
                                categoryId: item.id
                            })}
                            bottomDivider
                            chevron
                        />
                }
            />
        </View>
    )
}