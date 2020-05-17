import {ListItem, Overlay, SearchBar, Text} from "react-native-elements";
import React, { useState} from "react";
import {useQuery} from "@apollo/client";
import {productsQuery} from "../../../graphql/queries";
import {FlatList, View} from "react-native";
import {product} from "../../../interfaces";

export default function OrderProductSearchOverlay({isVisible, onBackdropPress}) {
    const [search, setSearch] = useState("");
    const {data, loading, error} = useQuery(productsQuery);

    if (loading) return null;
    if (error) return <Text>{error}</Text>;

    const {products} = data;

    return (
        <Overlay isVisible={isVisible} onBackdropPress={onBackdropPress}>
            <View>
                <SearchBar
                    placeholder={"Search"}
                    value={search}
                    onChangeText={setSearch}
                    lightTheme={true}
                />
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
                                bottomDivider
                                chevron
                            />
                    }
                />
            </View>
        </Overlay>
    );
}