import {Button, Card, ListItem, Text} from "react-native-elements";
import React from "react";
import {useQuery} from "@apollo/client";
import {company_query} from "../../../graphql/queries";
import {FlatList} from "react-native";

interface company {
    id: number,
    name: string,
    nip: string,
    addresses: [address]
    contacts: [contact]
    orders: [order]
}

interface address {
    id: number,
    name: string,
    address1: string,
    address2: string,
    city: string,
    post_code: string
}

interface contact {
    id: number,
    name: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: number
}

interface order {
    id: number,
    total: number
}

export default function Company({route: {params}, navigation:{setOptions}}) {
    const {id, name} = params;

    setOptions({
        title: name
    });

    const {data, loading, error} = useQuery(company_query,{
        variables:{
            id: id
        }
    });

    if (loading) return null;

    if (error) return <Text>{error}</Text>;

    const {company:company} = data;

    return (
        <Card title={name}>
            <ListItem
                title={"NIP"}
                rightTitle={company.nip}
                bottomDivider
            />
            <Text h4 h4Style={{textAlign:"center", marginTop:15}}>Addresses</Text>
            <Button title={"Add address"}/>
            <FlatList
                data={company.addresses.map(address => ({...address, key: address.id.toString()}))}
                renderItem={
                    ({item}:{item:address}) =>
                        <ListItem
                            title={item.name}
                            rightTitle={item.city}
                        />
                }
            />

            <Text h4 h4Style={{textAlign:"center", marginTop:15}}>Contacts</Text>
            <Button title={"Add contact"}/>
            <FlatList
                data={company.contacts.map(contact => ({...contact, key: contact.id.toString()}))}
                renderItem={
                    ({item}:{item:contact}) =>
                        <ListItem
                            title={item.name}
                            rightTitle={item.email}
                        />
                }
            />
            <Text h4 h4Style={{textAlign:"center", marginTop:15}}>Orders</Text>
            <Button title={"Create order"}/>
            <FlatList
                data={company.orders.map(order => ({...order, key: order.id.toString()}))}
                renderItem={
                    ({item}:{item:order}) =>
                        <ListItem
                            title={"#" + item.id.toString()}
                            subtitle={"Total: " +item.total.toString() + "zł"}
                        />
                }
            />
        </Card>
    );
}