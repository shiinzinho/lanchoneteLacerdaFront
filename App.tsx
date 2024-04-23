import React from "react";
import { FlatList } from "react-native";
import MenuList from "./src/snackBar/MenuList";
import Cart from "./src/snackBar/Cart";
import CadastroProduto from "./src/screens/CadastroProduto";
import CadastroCliente from "./src/screens/CadastroCliente";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Cardapio' component={MenuList} options={{headerShown: false}}/>
      <Stack.Screen name='Carrinho' component={Cart} options={{headerShown: false}}/>
      <Stack.Screen name='CadastroProduto' component={CadastroProduto} options={{headerShown: false}}/>
      <Stack.Screen name='CadastroCliente' component={CadastroCliente} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;