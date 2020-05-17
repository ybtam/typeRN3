import {FlatList, RefreshControl, View} from "react-native";
import React, {useState} from "react";
import {Button, ListItem, Overlay, SearchBar, Text} from "react-native-elements";
import {useQuery} from "@apollo/client";
import {categoriesQuery} from "../../../graphql/queries";
import {category} from "../../../interfaces";
import {useNavigation} from "@react-navigation/native";
interface categoriesData {
    categories: category[]
}

export default function CategoriesOverlay({setCategory}) {
    const {data, loading, error, refetch} = useQuery<categoriesData>(categoriesQuery);
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState("");

    if (loading) return null;

    if (error) return null;

    const {categories} = data;

    const searchResult =  categories.filter(categories => categories.name.includes(search));

    const toggleOverlay = () => setVisible(!visible);

    return (
        <View>
            <Button title="Select Category" onPress={toggleOverlay} type={"clear"}/>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{
                width: '90%'
            }} >
                <View>
                    <SearchBar
                        placeholder={"Search"}
                        value={search}
                        onChangeText={setSearch}
                        lightTheme={true}
                    />
                    <FlatList
                        data={
                            searchResult.map(category => ({...category, key:category.id.toString()}))
                        }
                        renderItem={
                            ({item}:{item: category}) =>
                                <ListItem
                                    title={item.name}
                                    onPress={()=>{
                                        setCategory(item);
                                        toggleOverlay();
                                    }}
                                />
                        }
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch}/> }
                    />
                </View>

            </Overlay>
        </View>
    );
}