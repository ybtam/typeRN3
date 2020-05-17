import {Button, Header, ListItem, Text} from "react-native-elements";
import React, {useCallback} from "react";
import {FlatList, RefreshControl, View} from "react-native";
import {useQuery} from "@apollo/client";
import {categoriesQuery} from "../../../graphql/queries";
import {useFocusEffect} from "@react-navigation/native";
import {category} from "../../../interfaces";
import CategoriesOverlay from "../../../components/signedIn/products/categoriesOverlay";

interface categoriesData {
    categories: category[]
}

export default function Categories({navigation:{navigate}}) {

    const {data, loading, error, refetch} = useQuery<categoriesData>(categoriesQuery);

    useFocusEffect(
        useCallback(()=>{
            refetch().then();
        },[])
    );

    if (loading) return null;
    if (error) {
        console.info(error);
        return null;
    }

    const {categories} = data;

    return(
        <View>
            <Button title={"Create a new category"} onPress={()=>navigate("CreateCategory")}/>
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
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch}/> }
            />
        </View>
    )
}