import {Card, ListItem, Text} from "react-native-elements";
import React from "react";
import {useQuery} from "@apollo/client";
import {FlatList} from "react-native";
import {productQuery} from "../../../graphql/queries";

interface allPrices {
    id: number
    price: number;
    createAt: Date;
}

export default function Product({route: {params}, navigation:{setOptions}}) {
    const {code} = params;

    setOptions({
        title: code
    });

    const {data, error, loading} = useQuery(productQuery, {
        variables: {
            code: code
        }
    });

    if (loading) return null;

    if (error) return <Text>{error}</Text>;

    const {product:{id, description, allPrices, category, nowPrice}} = data;

    return(
        <Card
            title={code}
        >
            <ListItem
                title={"Description"}
                rightTitle={description}
                bottomDivider
            />
            <ListItem
                title={"Category"}
                rightTitle={category.name}
                bottomDivider
            />
            <Text
                style={{fontWeight:"bold", paddingTop:15, fontSize:18, textAlign:"center"}}
            >Price List</Text>
            <FlatList
                data={
                    allPrices.map(price => ({...price, key:price.id.toString()}))
                }
                renderItem={
                    ({item}:{item: allPrices}) => {

                        const createAt = new Date(item.createAt);

                        if (item.id == nowPrice[0].id) return (<ListItem
                            title={item.price + " zł"}
                            subtitle={"Current prize"}
                            rightSubtitle={createAt.getDay()+'.'+createAt.getDate()+'.'+createAt.getFullYear()}
                            bottomDivider
                        />);

                        return (<ListItem
                            title={item.price + " zł"}
                            rightSubtitle={createAt.getDay()+'.'+createAt.getDate()+'.'+createAt.getFullYear()}
                            bottomDivider
                        />);
                    }
                }
            />
        </Card>
    );
}