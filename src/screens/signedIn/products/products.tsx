import React from "react";
import {Button, ListItem, Text} from "react-native-elements";
import {ApolloError, useQuery} from "@apollo/client";
import {FlatList, RefreshControl, View} from "react-native";
import {categoryQuery, productsQuery} from "../../../graphql/queries";
import {tabScreenStyle} from "../../../styles";

interface price{
    price: number
}

interface category{
    id: number,
    name: string
}

interface product {
    code: string,
    description, string,
    nowPrice: [price]
    category: category
}

export default function Products({route: {params}, navigation:{navigate}}) {
    let data: any | undefined, loading: boolean, error: ApolloError | undefined, refetch:any;
    let products;

    if (params) {
        const {categoryId} = params;

        if (categoryId == 0) {
            ({data, loading, error, refetch} = useQuery(productsQuery));

            if (loading) return null;

            if (error) {
                console.info(error);
                return null;
            }
            ({products} = data);
        } else {
            ({data, loading, error, refetch} = useQuery(categoryQuery, {
                variables: {
                    id: categoryId
                }
            }));

            if (loading) return null;

            if (error) {
                console.info(error);
                return null;
            }

            const {category} = data;

            ({products} = category);
        }
    } else {
        ({data, loading, error, refetch} = useQuery(productsQuery));

        if (loading) return null;

        if (error) {
            console.info(error);
            return null;
        }
        ({products} = data);
    }

    return(
        <View
            style={ tabScreenStyle.container }
        >
            <Button title={"Add product"}/>
            <FlatList
                data={
                    products.map(product => ({...product, key:product.id.toString()}))
                }
                renderItem={
                    ({item}:{item: product}) =>
                        <ListItem
                            title={item.code}
                            rightTitle={item.nowPrice[0].price + " zł"}
                            subtitle={item.category.name}
                            onPress={() => navigate("Product", {
                                code: item.code,
                            })}
                            bottomDivider
                            chevron
                        />
                }
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={refetch}/>
                }
            />
        </View>
);
}
