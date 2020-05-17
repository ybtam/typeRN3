import React from "react";
import {Button, ListItem, Text} from "react-native-elements";
import {ApolloError, useQuery} from "@apollo/client";
import {FlatList, RefreshControl, View} from "react-native";
import {categoryQuery, productsQuery} from "../../../graphql/queries";
import {tabScreenStyle} from "../../../styles";
import {product} from "../../../interfaces";

export default function Products({route: {params}, navigation:{navigate}}) {
    let data: any | undefined, loading: boolean, error: ApolloError | undefined, refetch:any;
    let products;

    //todo fix this part so that it would only fetch data once and filter locally

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
    //todo add product function
    return(
        <View
            style={ tabScreenStyle.container }
        >
            <Button title={"Add product"} onPress={()=>navigate("AddProduct")}/>
            <FlatList
                data={
                    products.map(product => ({...product, key:product.id.toString()}))
                }
                renderItem={
                    ({item}:{item: product}) =>
                        <ListItem
                            title={item.code}
                            rightTitle={item.nowPrice.price.toFixed(2) + " zł"}
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
