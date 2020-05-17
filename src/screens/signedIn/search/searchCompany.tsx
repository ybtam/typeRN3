import React, {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {companies_query, productsQuery} from "../../../graphql/queries";
import {ListItem, SearchBar, Text} from "react-native-elements";
import {company, product} from "../../../interfaces";
import AddProductListItem from "../../../components/signedIn/search/addProductListItem";
import {FlatList, RefreshControl, View} from "react-native";
import {setCustomerToOrderMutation} from "../../../graphql/mutations";

export default function SearchCompany({route:{params:{orderId, company}}, navigation:{setOptions, goBack}}){
    setOptions({
        title: "Set company to order #" + orderId
    });

    const [search, setSearch] = useState("");
    const {data, loading, error, refetch} = useQuery(companies_query);
    const [setCompany] = useMutation(setCustomerToOrderMutation);

    if (loading) return null;
    if (error) return <Text>{error}</Text>;

    const {companies} = data;

    const searchResult =  companies.filter(company => company.name.includes(search));

    const renderItem = ({item}:{item: company}) => {
        async function setCustomer(){
            const response = await setCompany({
                variables:{
                    orderId: orderId,
                    companyId: item.id
                }
            });

            const {setCustomerToOrder} = response.data;

            //todo something if it is false, but not urgent
            if (setCustomerToOrder) {
                goBack();
            }
        }

        return(
            <ListItem
                title={item.name}
                onPress={setCustomer}
                bottomDivider
            />
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
            data={searchResult.map(company => ({...company, key:company.id.toString()}))}
            renderItem={renderItem}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch}/>}
        />
    </View>
)
}