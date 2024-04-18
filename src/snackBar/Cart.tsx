import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, StatusBar, ScrollView } from "react-native";

interface Item {
    id: string;
    nome: string;
    price: string;
    qtd: string;
    image: any;
    quantity: number;
}

const Cart: React.FC = () => {
    const [dados, setDados] = useState<Item[]>([
        { id: '1', nome: '𝙲𝚕𝚞𝚋 𝚜𝚊𝚗𝚍𝚠𝚒𝚌𝚑', qtd: '1', price: '$12', image: require('../assets/images/ClubSandwich.jpg'), quantity: 0 },
        { id: '2', nome: '𝙲𝚕𝚞𝚋 𝚜𝚊𝚗𝚍𝚠𝚒𝚌𝚑', qtd: '1', price: '$12', image: require('../assets/images/ClubSandwich.jpg'), quantity: 0 },
        { id: '3', nome: '𝙲𝚕𝚞𝚋 𝚜𝚊𝚗𝚍𝚠𝚒𝚌𝚑', qtd: '1', price: '$12', image: require('../assets/images/ClubSandwich.jpg'), quantity: 0 },
        { id: '4', nome: '𝙲𝚕𝚞𝚋 𝚜𝚊𝚗𝚍𝚠𝚒𝚌𝚑', qtd: '1', price: '$12', image: require('../assets/images/ClubSandwich.jpg'), quantity: 0 },
    ]);

    const decreaseQuantity = (itemId: string) => {
        setDados(prevData => {
            return prevData.map(item => {
                if (item.id === itemId && item.quantity > 0) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };
                }
                return item;
            });
        });
    };

    const increaseQuantity = (itemId: string) => {
        setDados(prevData => {
            return prevData.map(item => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                }
                return item;
            });
        });
    };

    const totalPrice = dados.reduce((total, item) => {
        return total + (parseFloat(item.price.replace('$', '')) * item.quantity);
    }, 0);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#ec3424' barStyle='light-content' />
            <ImageBackground source={require('../assets/images/menu.png')} style={styles.imageBackground}>
                <View style={styles.header}>
                    <Image source={require('../assets/images/lacerda.png')} style={styles.imageHeader} />
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {dados.map(item => (
                        <View style={styles.item} key={item.id}>
                            <Text style={styles.text1}>{item.nome}</Text>
                            <Image source={item.image} style={styles.imageIcon} />
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                                    <Image source={require('../assets/images/subtract.png')} style={styles.subtractIcon} />
                                </TouchableOpacity>
                                <Text style={styles.quantity}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                                    <Image source={require('../assets/images/addItem.png')} style={styles.addIcon} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.text3}>{item.price}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Preço total: {totalPrice.toFixed(2)}$</Text>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/home.png')} style={styles.footerIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/orders.png')} style={styles.footerIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/profile.png')} style={styles.footerIcon} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#000',
        alignItems: 'center',
        paddingVertical: 1,
        paddingHorizontal: 40,
        borderBottomStartRadius: 22,
        borderBottomEndRadius: 22,
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    totalText: {
        fontSize: 20,
        color: 'yellow',
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
    },
    totalContainer: {
        backgroundColor: 'black',
        padding: 10,
        marginBottom: 5,
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 3,
        alignItems: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 3,
        borderColor: 'red',
    },
    item: {
        backgroundColor: 'black',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 25,
        borderColor: 'red',
        borderWidth: 3,
    },
    text1: {
        fontSize: 25,
        fontWeight: '700',
        color: 'red',
        borderBottomWidth: 2,
        borderBottomColor: 'red',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    quantity: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        marginHorizontal: 10,
    },
    text3: {
        fontSize: 20,
        fontWeight: '500',
        color: 'yellow',
        marginTop: 10,
    },
    subtractIcon: {
        width: 31,
        height: 31,
    },
    addIcon: {
        width: 30,
        height: 30,
    },

    text2: {
        marginLeft: 150,
        marginTop: -28,
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
    },
    imageIcon: {
        marginTop: 15,
        width: 300,
        height: 160,
        marginHorizontal: 10,
        borderRadius: 20,
        borderColor: 'red',
        borderWidth: 2,
        marginBottom: 20
    },
    imageHeader: {
        width: 320,
        height: 150,
    },
    footerIcon: {
        width: 30,
        height: 30
    },
});


export default Cart;