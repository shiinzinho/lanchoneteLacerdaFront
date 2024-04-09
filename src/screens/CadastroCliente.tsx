import React, { useState } from "react";
import { Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const CadastroCliente: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [foto, setFoto] = useState<any>('');
    const [nome, setNome] = useState<string>('');
    const [endereco, setEndereco] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const cadastrarCliente = async () => {
        try {
            const formData = new FormData();
            formData.append('foto', {
                uri: foto,
                type: 'foto/jpeg',
                name: new Date() + '.jpg'
            });
            formData.append('nome', nome);
            formData.append('endereco', endereco);
            formData.append('telefone', telefone);
            formData.append('email', email);
            formData.append('cpf', cpf);
            formData.append('password', password);

            const response = await axios.post('http://10.137.11.208:8000/api/clientes', formData, {
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
                let fotoUri = response.uri || response.assets?.[0]?.uri;
                setFoto(fotoUri);
                console.log(fotoUri);

            }
        });
    }

    const selecionarFoto = () => {
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
                let fotoUri = response.uri || response.assets?.[0]?.uri;
                setFoto(fotoUri);
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
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Cliente"
                    value={nome}
                    onChangeText={setNome}
                    placeholderTextColor={'red'}
                    color = 'white'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Endereço do Cliente"
                    value={endereco}
                    onChangeText={setEndereco}
                    placeholderTextColor={'red'}
                    color = 'white'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Telefone do Cliente"
                    value={telefone}
                    onChangeText={setTelefone}
                    placeholderTextColor={'red'}
                    color = 'white'
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail do Cliente"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={'red'}
                    color = 'white'
                />
                <TextInput
                    style={styles.input}
                    placeholder="CPF do Cliente"
                    value={cpf}
                    onChangeText={setCpf}
                    placeholderTextColor={'red'}
                    color = 'white'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha do Cliente"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={'red'}
                    color = 'white'
                />
                <View style={styles.alinhamentofotoSelecionada}>
                    {foto ? <Image source={{ uri: foto }} style={styles.fotoSelecionada} /> : null}
                </View>
                <TouchableOpacity style={styles.imageButton} onPress={selecionarFoto}>
                    <Text style={styles.imageButtonText}>Selecionar foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageButton} onPress={abrirCamera}>
                    <Text style={styles.imageButtonText}>Tirar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={cadastrarCliente}>
                    <Text style={styles.buttonText}>Cadastrar Cliente</Text>
                </TouchableOpacity>
            </View>
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
        marginTop:-65,
        marginBottom: 30,
        backgroundColor: '#000',
        alignItems: 'center',
        paddingHorizontal: 40,
        borderBottomStartRadius:22,
        borderBottomEndRadius:22
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    form: {
        borderRadius:20,
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
        color:'black',
    },
    imageButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    imageButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    fotoSelecionada: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 5,
        marginBottom: 10,
    },
    alinhamentofotoSelecionada: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
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
        borderTopWidth: 0.2,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10
    },
    footerIcon: {
        width: 30,
        height: 30
    },
});

export default CadastroCliente;