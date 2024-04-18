import axios from "axios";
import { useEffect, useState } from "react";
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
    id: string,
    nome: string,
    preco: string,
    ingredients: string,
    imagem: any,
}

const MenuList: React.FC = () => {
    const [produtos, setProdutos] = useState<Item[]>([]);

    const fetchProdutos = async () => {
        try {
            const response = await axios.get('http://10.137.11.206:8000/api/produtos');
            const produtosArray = Array.isArray(response.data) ? response.data : [response.data];
            const produtosComId = produtosArray.map((item: any, index: number) => ({
                id: index.toString(),
                nome: item.nome,
                preco: item.preco,
                ingredients: item.ingredientes,
                imagem: item.imagem
            }));

            setProdutos([...produtosComId]);
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
        }
    };

    const renderItem = ({ item, index }: { item: Item, index: number }) => {
        return (
            <View key={item.id} style={styles.item}>
                <Text style={styles.itemText1}>{item.nome}</Text>
                <Text style={styles.itemText2}>{item.preco}</Text>
                <Text style={styles.itemText3}>{item.ingredients}</Text>
                {item.imagem && <Image source={{ uri: item.imagem }} style={styles.imageIcon} />}
            </View>
        );
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/menu.png')} style={styles.imageBackground}>
                <StatusBar backgroundColor='#ec3424' barStyle='light-content' />
                <View style={styles.header}>
                    <Image source={require('../assets/images/lacerda.png')} style={styles.imageHeader} />
                </View>
                <FlatList
                    data={produtos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => <Text>Nenhum item encontrado</Text>}
                    contentContainerStyle={styles.flatListContainer}
                />
            </ImageBackground>
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
        marginTop:10,
        marginBottom:10,
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
});

export default MenuList;