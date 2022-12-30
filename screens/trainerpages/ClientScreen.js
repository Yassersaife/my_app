import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, FlatList, TextInput, Image, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const client = [
    {
        id: '1',
        Image: require('../../assets/images/trainers/trainer7.png'),
        Name: "Jems joy",
        goal: "loss weight",
        email: "yassersaife@mail.ru",
       
    },
    {
        id: '2',
        Image: require('../../assets/images/trainers/trainer7.png'),
        Name: "Jems joy",
        goal: "loss weight",
        email: "yassersaife@mail.ru",

    },
    {
        id: '3',
        Image: require('../../assets/images/trainers/trainer7.png'),
        Name: "Jems joy",
        goal: "loss weight",
        email: "yassersaife@mail.ru",

    },
    {
        id: '4',
        Image: require('../../assets/images/trainers/trainer7.png'),
        Name: "Jems joy",
        goal: "loss weight",
        email: "yassersaife@mail.ru",

    },
    
];

const ClientScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`trainersScreen:${key}`)
    }

    const [search, setSearch] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {searchField()}
                {trainersData()}
            </View>
        </SafeAreaView>
    )

    function trainersData() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('TrainerProfile',{item:item})}
                style={{ ...styles.trainerInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}
            >
                <View style={{ flex: 1, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', }}>
                    <Image
                        source={item.Image}
                        style={{ width: 70.0, height: 70.0, borderRadius: 35.0, }}
                    />
                    <View style={{ flex: 1, marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0 }}>
                        <View style={{ marginBottom: Sizes.fixPadding - 6.0 }}>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.Name}
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                {item.email}
                            </Text>
                        </View>
                        <View style={{ marginTop: Sizes.fixPadding - 6.0, }}>
                        
                            <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                            
                                {item.goal} 

                            </Text>
                            
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialIcons name="chat" size={20} color={Colors.primaryColor} />
                    
                </View>
                
            </TouchableOpacity >
        )
        return (
            <FlatList
                data={client}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0, }}
            />
        )
    }

    function searchField() {
        return (
            <View style={{ ...styles.searchFieldWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <MaterialIcons name="search" size={22} color={Colors.grayColor} />
                <TextInput
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name={isRtl ? "arrow-forward" : "arrow-back"}
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    My Clients
                </Text>
            </View>
        )
    }
}

export default ClientScreen;

const styles = StyleSheet.create({
    searchFieldWrapStyle: {
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: '#F0F0F0',
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    textFieldStyle: {
        marginLeft: Sizes.fixPadding,
        ...Fonts.blackColor14Medium,
        flex: 1,
        height: 20.0,
    },
    trainerInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        paddingHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 1.5,
        borderRadius: Sizes.fixPadding + 2.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderBottomWidth: 0.5,
    }
})