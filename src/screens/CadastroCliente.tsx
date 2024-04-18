import React, { useState } from "react";
import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const validarCampos = () => {
        const errors: Record<string, string> = {};

        if (!foto) {
            errors.foto = "Foto é obrigatória";
        }
        if (!nome) {
            errors.nome = "Nome é obrigatório";
        } else {
            if (nome.length < 10) {
                errors.nome = "Nome deve ter no mínimo 10 caracteres";
            } else if (nome.length > 200) {
                errors.nome = "Nome deve ter no máximo 200 caracteres";
            }
        }
        if (!endereco) {
            errors.endereco = "Endereço é obrigatório";
        } else {            if (nome.length < 10) {
                errors.endereco = "Endereço deve ter no mínimo 10 caracteres";
            } else if (endereco.length > 120) {
                errors.endereco = "Endereço deve ter no máximo 120 caracteres";
            }}
        if (!telefone) {
            errors.telefone = "Telefone é obrigatório";
        } else if (!/^\d{10,14}$/.test(telefone)) {
            errors.telefone = "Telefone deve conter apenas números e ter entre 10 e 14 caracteres";
        }
        if (!email) {
            errors.email = "E-mail é obrigatório";
        }
        if (!cpf) {
            errors.cpf = "CPF é obrigatório";
        }
        if (!password) {
            errors.password = "Senha é obrigatória";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const cadastrarCliente = async () => {
        if (!validarCampos()) {
            return;
        }
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

            const response = await axios.post('http://10.137.11.206:8000/api/clientes', formData, {
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
            <ScrollView>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Cliente"
                    value={nome}
                    onChangeText={setNome}
                    placeholderTextColor={'red'}
                    color = 'white'
                />{errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="Endereço do Cliente"
                    value={endereco}
                    onChangeText={setEndereco}
                    placeholderTextColor={'red'}
                    color = 'white'
                />{errors.endereco && <Text style={styles.errorText}>{errors.endereco}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="Telefone do Cliente"
                    value={telefone}
                    onChangeText={setTelefone}
                    placeholderTextColor={'red'}
                    color = 'white'
                />{errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="E-mail do Cliente"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={'red'}
                    color = 'white'
                />{errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="CPF do Cliente"
                    value={cpf}
                    onChangeText={setCpf}
                    placeholderTextColor={'red'}
                    color = 'white'
                />{errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="Senha do Cliente"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={'red'}
                    color = 'white'
                />{errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                <View style={styles.alinhamentofotoSelecionada}>
                    {foto ? <Image source={{ uri: foto }} style={styles.fotoSelecionada} /> : null}
                </View>{errors.foto && <Text style={styles.errorText}>{errors.foto}</Text>}
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
        borderBottomStartRadius:22,
        borderBottomEndRadius:22
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
        borderRadius:15,
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
        borderRadius: 10,
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