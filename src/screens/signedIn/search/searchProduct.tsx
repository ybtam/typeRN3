import {SearchBar, Text} from "react-native-elements";
import React, { useState} from "react";
import {FlatList, RefreshControl, View} from "react-native";
import {useQuery} from "@apollo/client";
import {productsQuery} from "../../../graphql/queries";
import {product} from "../../../interfaces";
import AddProductListItem from "../../../components/signedIn/search/addProductListItem";

export default function SearchProduct({route:{params:{orderId, orderProducts}}, navigation:{setOptions}}){
    setOptions({
        title: "Add products to order #" + orderId
    });

    const [search, setSearch] = useState("");
    const {data, loading, error, refetch} = useQuery(productsQuery);

    if (loading) return null;
    if (error) return <Text>{error}</Text>;

    const {products} = data;

    const searchResult =  products.filter(product => product.code.includes(search));

    const renderItem = ({item}:{item: product}) => {

        let orderQuantity: number = 0;

        for (let i = 0; i < orderProducts.length; i++){
            if (orderProducts[i].product.code.match(item.code)){
                orderQuantity = orderProducts[i].quantity;
                break;
            }
        }

        return(
            <AddProductListItem orderId={orderId} orderQuantity={orderQuantity} item={item}/>
        );
    };

    return (
        <View>
            <SearchBar
                placeholder={"Search"}
                value={search}
                onChangeText={setSearch}
                lightTheme={true}
            />
            <FlatList
                data={searchResult.map(product => ({...product, key:product.id.toString()}))}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch}/>}
            />
        </View>
    )
}