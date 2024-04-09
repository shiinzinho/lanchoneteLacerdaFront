import React from "react";
import { FlatList } from "react-native";
import MenuList from "./src/snackBar/MenuList";
import Cart from "./src/snackBar/Cart";
import CadastroProduto from "./src/screens/CadastroProduto";
import CadastroCliente from "./src/screens/CadastroCliente";

function App(): React.JSX.Element {
  return(
    <CadastroCliente />
  );
}
export default App;