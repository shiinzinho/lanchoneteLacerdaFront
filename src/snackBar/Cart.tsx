import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Image,
    ImageBackground
} from "react-native";

interface Item {
    id: string;
    nome: string;
    preco: string;
    ingredients: string;
    imagem: any;
    quantity: number;
}

const Cart: React.FC = () => {
    const [dados, setDados] = useState<Item[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://10.137.11.208:8000/api/cart');
            const dataArray = Array.isArray(response.data) ? response.data : [response.data];
            const dataWithQuantity = dataArray.map((item: any) => ({
                ...item,
                quantity: 0
            }));

            setDados(dataWithQuantity);
        } catch (error) {
            console.error('Erro ao obter dados:', error);
        }
    };
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
        return total + (parseFloat(item.preco.replace('$', '')) * item.quantity);
    }, 0);

    useEffect(() => {
        fetchData();
    }, []);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/menu.png')} style={styles.imageBackground}>
                <StatusBar backgroundColor='#ec3424' barStyle='light-content' />
                <View style={styles.header}>
                    <Image source={require('../assets/images/lacerda.png')} style={styles.imageHeader} />
                </View>
                <FlatList
                    data={dados}
                    renderItem={({ item, index }) => (
                        <View style={styles.item} key={item.id}>
                            <Text style={styles.itemText1}>{item.nome}</Text>
                            <Text style={styles.itemText2}>{item.preco}</Text>
                            <Text style={styles.itemText3}>{item.ingredients}</Text>
                            {item.imagem && <Image source={{ uri: item.imagem }} style={styles.imageIcon} />}
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                                    <Image source={require('../assets/images/subtract.png')} style={styles.subtractIcon} />
                                </TouchableOpacity>
                                <Text style={styles.quantity}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                                    <Image source={require('../assets/images/addItem.png')} style={styles.addIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => <Text>Nenhum item encontrado</Text>}
                    contentContainerStyle={styles.flatListContainer}
                />
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Preço total: {totalPrice.toFixed(2)}$</Text>
                </View>
                <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Cardapio')}>
                    <Image 
                    source={require('../assets/images/home.png')}
                    style={styles.footerIcon} //cardapio
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('CadastroProduto')}>
                    <Image 
                    source={require('../assets/images/orders.png')}
                    style={styles.footerIcon} //cadastro produto
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('CadastroCliente')}>
                    <Image 
                    source={require('../assets/images/profile.png')}
                    style={styles.footerIcon} // cadastro cliente
                    />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
                    <Image 
                    source={require('../assets/images/menuIcon.png')}
                    style={styles.footerIcon} // carrinho
                    />
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    itemText1: {
        fontSize: 25,
        fontWeight: '700',
        color: 'red',
        borderBottomWidth: 2,
        borderBottomColor: 'red',
    },
    itemText2: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: '500',
        color: 'yellow',
    },
    itemText3: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
    },
    header: {
        backgroundColor: '#000',
        alignItems: 'center',
        paddingVertical: 1,
        paddingHorizontal: 40,
        borderBottomStartRadius: 22,
        borderBottomEndRadius: 22,
    },
    imageIcon: {
        width: 296,
        height: 400,
        borderRadius: 20,
        borderColor: 'red',
        borderWidth: 2,
        marginBottom: 20,
        resizeMode: 'cover',
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    imageHeader: {
        width: 320,
        height: 150,
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
    footerIcon: {
        width: 30,
        height: 30,
    },
    flatListContainer: {
        flexGrow: 1,
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
    subtractIcon: {
        width: 31,
        height: 31,
    },
    addIcon: {
        width: 30,
        height: 30,
    },
    totalContainer: {
        backgroundColor: 'black',
        padding: 10,
        width: 500,
        marginBottom: 50,
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 3,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 20,
        color: 'yellow',
    },
});

export default Cart;