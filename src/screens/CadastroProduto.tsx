import React, { useState } from "react";
import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const CadastroProduto: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [nome, setNome] = useState<string>('');
    const [preco, setPreco] = useState<string>('');
    const [ingredientes, setIngredientes] = useState<string>('');
    const [imagem, setImagem] = useState<any>('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validarCampos = () => {
        const errors: Record<string, string> = {};
    
        if (!nome) {
            errors.nome = "Nome é obrigatório";
        } else {
            if (nome.length < 10) {
                errors.nome = "Nome deve ter no mínimo 10 caracteres";
            } else if (nome.length > 200) {
                errors.nome = "Nome deve ter no máximo 200 caracteres";
            }
        }
    
        if (!preco) {
            errors.preco = "Preço é obrigatório";
        } else if (!/^(\d{1,10}(\.\d{1,2}))$/.test(preco)) {
            errors.preco = "Preço deve ser um número decimal com no máximo 10 caracteres e no máximo duas casas decimais";
        }
    
        if (!ingredientes) {
            errors.ingredientes = "Ingredientes é obrigatório";
        } else {
            if (ingredientes.length < 10) {
                errors.ingredientes = "Ingredientes deve ter no mínimo 10 caracteres";
            } else if (ingredientes.length > 500) {
                errors.ingredientes = "Ingredientes deve ter no máximo 500 caracteres";
            }
        }
    
        if (!imagem) {
            errors.imagem = "Imagem é obrigatória";
        }
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const cadastrarProduto = async () => {
        if (!validarCampos()) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('preco', preco);
            formData.append('ingredientes', ingredientes);
            formData.append('imagem', {
                uri: imagem,
                type: 'imagem/jpeg',
                name: new Date() + '.jpg'
            });

            const response = await axios.post('http://10.137.11.208:8000/api/produtos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const abrirCamera = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000
        };
        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('cancelado pelo usuário');
            } else if (response.error) {
                console.log('erro ao abrir a câmera');
            } else {
                let imagemUri = response.uri || response.assets?.[0]?.uri;
                setImagem(imagemUri);
                console.log(imagemUri);

            }
        });
    }

    const selecionarImagem = () => {
        const options = {
            mediatype: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('cancelado pelo usuário');
            } else if (response.error) {
                console.log('erro ao abrir a galeria');
            } else {
                let imagemUri = response.uri || response.assets?.[0]?.uri;
                setImagem(imagemUri);
            }
        });
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/menu.png')} style={styles.imageBackground}>
                <StatusBar backgroundColor='#ec3424' barStyle='light-content' />
                <View style={styles.header}>
                    <Image source={require('../assets/images/lacerda.png')} style={styles.imageHeader}></Image>
                </View>
                <ScrollView>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do Produto"
                            value={nome}
                            onChangeText={setNome}
                            placeholderTextColor={'red'}
                            color='white'
                        />{errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Preço"
                            value={preco}
                            onChangeText={setPreco}
                            placeholderTextColor={'red'}
                            color='white'
                        />{errors.preco && <Text style={styles.errorText}>{errors.preco}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Ingredientes"
                            value={ingredientes}
                            onChangeText={setIngredientes}
                            multiline
                            placeholderTextColor={'red'}
                            color='white'
                        />{errors.ingredientes && <Text style={styles.errorText}>{errors.ingredientes}</Text>}
                        <View style={styles.alinhamentoImagemSelecionada}>
                            {imagem ? <Image source={{ uri: imagem }} style={styles.imagemSelecionada} /> : null}
                        </View>{errors.imagem && <Text style={styles.errorText}>{errors.imagem}</Text>}
                        <TouchableOpacity style={styles.imageButton} onPress={selecionarImagem}>
                            <Text style={styles.imageButtonText}>Selecionar imagem</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageButton} onPress={abrirCamera}>
                            <Text style={styles.imageButtonText}>Tirar imagem</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={cadastrarProduto}>
                            <Text style={styles.buttonText}>Cadastrar Produto</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
            <View style={styles.footer}>
                <TouchableOpacity>
                    <Image
                        source={require('../assets/images/home.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require('../assets/images/orders.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require('../assets/images/profile.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require('../assets/images/menuIcon.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>


    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginBottom: 30,
        backgroundColor: '#000',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 40,
        borderBottomStartRadius: 22,
        borderBottomEndRadius: 22
    },
    errorText: {
        color: 'yellow',
        marginBottom: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    form: {
        borderRadius: 15,
        padding: 10,
        backgroundColor: 'black',
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: 350,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        color: 'black',
    },
    imageButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    imageButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    imagemSelecionada: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 5,
        marginBottom: 10,
    },
    alinhamentoImagemSelecionada: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
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
        height: 30
    },
});

export default CadastroProduto;