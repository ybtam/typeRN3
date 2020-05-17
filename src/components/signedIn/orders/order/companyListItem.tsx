import {Button, ListItem} from "react-native-elements";
import React, {useCallback} from "react";
import {useNavigation} from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';

export default function CompanyListItem ({orderId, company, onRefresh}) {
    const {navigate} = useNavigation();

    useFocusEffect(
        useCallback(()=>{
            onRefresh();
        },[])
    );

    if (!company) return (
            <ListItem
                title={"Add Company"}
                titleStyle={{color:"red"}}
                rightElement={
                    <Button
                        title={"Select Company"}
                        onPress={()=>navigate("SearchStack", {
                            screen: "searchCompany",
                            params:{
                                orderId: orderId,
                            }
                        })}
                    />
                }
            />
    );

    return (
        <ListItem
            title={company.name}
            rightElement={
                <Button
                    title={"Change Company"}
                    onPress={()=>navigate("SearchStack", {
                        screen: "searchCompany",
                        params:{
                            orderId: orderId,
                        }
                    })}
                />
            }
            subtitle={"Company"}
        />
    )
}