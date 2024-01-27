<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="media/css/estilos.css">
    <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="/laboratorioJoia/media/js/script.js"></script>
    
    <title>Painel de controle</title>
</head>
<body>
    <?php
        $resultadoPositivo = "";
        $resultadoNegativo = "";
        include 'treatment.php';
        include 'dbConnection.php';
    ?>

    <header>
        <!-- notificação positiva do php -->
        <div class="mensagem mensagemPositiva" id="mensagemPositiva" style="opacity: 0; visibility: hidden;"> 
            <span><?php echo $resultadoPositivo;?></span>
        </div>
        <!-- notificação negativa do php -->
        <div class="mensagem mensagemNegativa" id="mensagemNegativa"> 
            <span><?php echo $resultadoNegativo; ?></span>
        </div>

        <div class="dashBoard">
            <img src="media/img/icones/iconePainelDeControle.svg" alt="">
            <p>dashBoard</p>
        </div>
        <div class="logoMarca">
            <figure>
                <img src="media/img/denteJoia.png" alt="">
            </figure>
            <div class="logoTipo">
                <h1>L.J. - Laboratório de <em>Prótese Dentária Joia</em></h1>
                <address>
                    <p>RUA VICENTE PEREIRA DE ASSUNÇÃO, 134 | CEP - 04658000 - VL CONTÂNCIA</p>
                    <p>CONTATO: (11) 99836-17314 (11) 94945-2727</p>
                </address>
            </div>
        </div>
    </header>
    <main>
        <div class="menuLateral">
            <ul>
                <li class="textoMenu">
                    <p>Menu</p>
                </li>
                <li class="vendas menu-item desativada tamanhoAtivo">
                    <p>Vendas</p>
                    <ul class="subMenu">
                        <li class="subBotao" data-target="vitrineVenda" onclick="controleCarrinho()">Realizar Venda</li>
                        <li class="subBotao" data-target="vitrineHistoricoDeVenda">Histórico de Venda</li>
                    </ul>
                </li>
                <li class="clientes menu-item desativada tamanhoAtivo">
                    <p>Clientes</p>
                    <ul class="subMenu">
                        <li class="subBotao" data-target="vitrineConultarClientes">Consultar Clientes</li>
                        <li class="subBotao" data-target="vitrineAlterarClientes">Alterar Clientes</li>
                        <li class="subBotao" data-target="vitrineCadastrarClientes">Cadastrar Clientes</li>
                        <li class="subBotao" data-target="vitrinePagamento">Pagamento</li>
                    </ul>
                </li>
                <li class="produtos menu-item desativada tamanhoAtivo">
                    <p>Produtos</p>
                    <ul class="subMenu">
                        <li class="subBotao" data-target="vitrineConsultarProdutos">Consultar Produtos</li>
                        <li class="subBotao" data-target="vitrineAlterarProdutos">Alterar Produtos</li>
                        <li class="subBotao" data-target="vitrineCadastrarProdutos">Cadastrar Produtos</li>
                    </ul>
                </li>
                <li class="extratos menu-item desativada" data-target="vitrineExtratos">
                    <p>Extratos</p>
                </li>
            </ul>
        </div>
        <div class="bemVindo">
            <p class="textoBemVindo">Bem-vindo!</p>

            <!--  Realizar Venda -->
            <div class="vitrine vitrineVenda desativada">
                <div class="formularios">
                    <p>Realizar venda</p>
                    <form id="salesForm" class="formularioGeral formularioRealizarVenda">

                        <div class="inputMesmaLinha">

                            <div class="containerInputLabel">
                                <!-- Client Dropdown -->
                                <select id="client" name="client">
                                    <!-- Clients will be displayed here -->
                                </select>
                                <label for="client">Cliente</label>
                            </div>

                            <div class="containerInputLabel">
                                <!-- Product Dropdown -->
                                <select id="product" name="product" onchange="getProductDetails()">
                                    <!-- Populate this dynamically with product options -->
                                </select>
                                <label for="product">Produto</label>
                            </div>
                            
                            <div class="containerInputLabel">
                                <!-- Price Dropdown -->
                                <select id="price" name="price" >
                                    <!-- Prices will be displayed here onchange="updatePriceDisplay()"-->
                                </select>
                                <label for="price">Preço</label>
                            </div>

                            <div class="containerInputLabel">
                                <!-- Quantity Input -->
                                <input type="number" id="quantity" name="quantity" value="1" min="1">
                                <label for="quantity">Qt</label>
                            </div>

                            <div class="containerInputLabel">
                                <!-- Paciente (Patient) Input -->
                                <input type="text" id="paciente" name="paciente" placeholder="Insira o nome do Paciente">
                                <label for="paciente">Insira o nome do Paciente</label>
                            </div>

                            <!-- Botão adicionar items no carrinho -->
                            <div class="botaoCarrinho" onclick="addToCart()">
                                <span>adicionar</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg" class="IconHeaderCart" size="20">
                                    <path d="M7.19975 19.2C5.8798 19.2 4.81184 20.28 4.81184 21.6C4.81184 22.92 5.8798 24 7.19975 24C8.51971 24 9.59967 22.92 9.59967 21.6C9.59967 20.28 8.51971 19.2 7.19975 19.2ZM0 0V2.4H2.39992L6.71977 11.508L5.09982 14.448C4.90783 14.784 4.79984 15.18 4.79984 15.6C4.79984 16.92 5.8798 18 7.19975 18H21.5993V15.6H7.70374C7.53574 15.6 7.40375 15.468 7.40375 15.3L7.43974 15.156L8.51971 13.2H17.4594C18.3594 13.2 19.1513 12.708 19.5593 11.964L23.8552 4.176C23.9542 3.99286 24.004 3.78718 23.9997 3.57904C23.9955 3.37089 23.9373 3.16741 23.8309 2.98847C23.7245 2.80952 23.5736 2.66124 23.3927 2.55809C23.2119 2.45495 23.0074 2.40048 22.7992 2.4H5.05183L3.92387 0H0ZM19.1993 19.2C17.8794 19.2 16.8114 20.28 16.8114 21.6C16.8114 22.92 17.8794 24 19.1993 24C20.5193 24 21.5993 22.92 21.5993 21.6C21.5993 20.28 20.5193 19.2 19.1993 19.2Z" fill="white" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #e8e6e3;"></path></g>
                                </svg>
                            </div>
                        </div>

                        <!-- Botão para limpar o carrinho
                        <button type="button" onclick="clearCart()">Clear Cart</button> -->

                        <!-- Conteudo do carrinho -->
                        <div id="cartDisplay" class="tabelaGeral tabelaCarrinho">
                            <!-- Cart contents will be displayed here -->
                        </div>
                        
                        <!-- Botão para executar a venda 
                        <button type="button" onclick="executeSale()">Executar Venda</button> -->
                    </form>
                </div>
            </div>

            <!--  Histórico de Vendas -->
            <div class="vitrine vitrineHistoricoDeVenda desativada">
                <div class="formularios">
                    <p>Histórico de Vendas</p>
                    <form action="">
                    </form>
                </div>
            </div>

            <!-- Consultar clientes -->
            <div class="vitrine vitrineConultarClientes desativada">
                <div class="formularios">
                    <p>Consultar Clientes</p>
                    <div id="" class="tabelaGeral tabelaConsultarClientes">
                    </div>
                </div>
            </div>

            <!-- Alterar clientes -->
            <div class="vitrine vitrineAlterarClientes desativada">
                <div class="formularios">
                    <p>Alterar Clientes</p>
                </div>
            </div>

            <!-- Cadastrar clientes -->
            <div class="vitrine vitrineCadastrarClientes desativada"> 
                <div class="formularios"> 
                    <p class="tituloCadastrarCliente">Cadastrar Cliente</p>
                    <form action="index.php" name="cadastrar_clientes" method="POST" class="formularioGeral formularioCadastrarClientes">
                        <input type="text" id="client_name" name="client_name" placeholder="Nome" required>
                        <label for="client_name">Nome</label>

                        <input type="email" id="client_email" name="client_email" placeholder="E-mail" required>
                        <label for="client_email">E-mail</label>

                        <input type="tel" id="phone" name="phone" placeholder="Telefone" required>
                        <label for="phone">Telefone</label>

                        <input type="text" id="cpf_cnpj" name="cpf_cnpj" placeholder="CPF/ CNPJ" required>
                        <label for="cpf_cnpj">CPF/ CNPJ</label>

                        <input type="text" id="address" name="address" placeholder="Endereço">
                        <label for="address">Endereço</label>

                        <div class="inputMesmaLinha">
                            <input type="number" id="number" name="number" placeholder="Número">
                            <label for="number">Nº</label>
                                
                            <input class="complemento" type="text" id="complemento" name="complemento" placeholder="Complemento">
                            <label for="complemento">Complemento</label>
                        </div>

                        <input type="text" id="neighborhood" name="neighborhood" placeholder="Bairro">
                        <label for="neighborhood">Bairro</label>

                        <input type="text" id="city" name="city" placeholder="Cidade">
                        <label for="city">Cidade</label>

                        <input type="text" id="zipcode" name="zipcode" placeholder="CEP">
                        <label for="zipcode">CEP</label>

                        <input type="text" id="debit_amount" name="debit_amount" placeholder="R$ 0,00 - Possui saldo devedor? Se sim, inserir o valor.">
                        <label for="debit_amount">Saldo Devedor</label>

                        <button type="submit" name="cadastrar_clientes">Cadastrar Cliente</button>
                    </form>
                </div>
            </div>

            <!-- Pagamento -->
            <div class="vitrine vitrinePagamento desativada">
                <div class="formularios">
                    <p>Atualize os Débitos do Cliente</p>
                    <form name="paymentform" action="index.php" method="post" class="formularioGeral formularioCadastrarClientes">
                        <select id="client_id_payment" name="client_id_payment" required>
                            <!-- PHP para gerar a lista de clientes automaticamente -->
                            <?php
                                // Pegando os clientes do banco de dados.
                                $result = $conn->query("SELECT client_id, client_name FROM clients");

                                // Verificando se há cliente no banco de dados.
                                if ($result->num_rows > 0) {
                                    while ($row = $result->fetch_assoc()) {
                                        // Mostra as opções de clientes cadastrados.
                                        echo "<option value='{$row['client_id']}'>{$row['client_name']}</option>";
                                    }
                                } else {
                                    echo "<option value='' disabled>Nenhum cliente encontrado..</option>";
                                }
                                // Fecha a conexão com o banco de dados.
                                $conn->close();
                            ?>
                        </select>
                        <label for="client_id_payment">Cliente</label>

                        <!-- <label for="current_debt">Divida Atual</label> -->
                        <div class="saldoDevedor">
                            <span class="debito" id="current_debt">N/A</span>
                            <span class="labelDebito">Divida Atual</span>
                        </div>

                        <input type="date" id="payment_date" name="payment_date" required>
                        <label for="payment_date">Data do pagamento</label>

                        <input type="text" id="amount" name="amount" placeholder="R$ 0,00 - Insira valor a ser descontado da divida." required>
                        <label for="amount">Valor Pago</label>

                        <!--<input type="text" id="type_of_payment" name="type_of_payment" placeholder="Observação"> -->
                        <select type="text" id="type_of_payment" name="type_of_payment">
                            <option value="PIX">PIX</option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Cartão de Débito">Cartão de Débito</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </select>
                        <label for="type_of_payment">Método de pagamento</label>

                        <!-- Add a hidden input field to identify the action -->
                        <input type="hidden" name="update_payment" value="1">

                        <button type="submit" name="paymentform">Atualizar conta</button>
                    </form>
                </div>
            </div>

            <!-- Consultar produtos -->
            <div class="vitrine vitrineConsultarProdutos desativada">
                <div class="formularios">
                    <p>Consultar produtos</p>
                    <div id="" class="tabelaGeral tabelaConsultarProdutos">
                        <!-- Os dados de pagamento serão exibidos aqui -->
                        <?php
                        include 'dbConnection.php';
                        
                        // Consulta os produtos
                        $sql = "SELECT * FROM products";
                        $resultProducts = $conn->query($sql);

                        // Verifica se a consulta retornou resultados
                        if ($resultProducts->num_rows > 0) {
                            // Exibe os dados em uma tabela
                            echo "<table border='1'>";
                            echo "<tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Preço 1</th><th>Preço 2</th><th>Preço 3</th><th>Preço 4</th><th>Preço 5</th><th>Preço 6</th></tr>";

                            while ($row = $resultProducts->fetch_assoc()) {
                                echo "<tr>";
                                echo "<td>" . $row["product_id"] . "</td>";
                                echo "<td>" . $row["product_name"] . "</td>";
                                echo "<td>" . $row["product_description"] . "</td>";
                                $preço_1 = str_replace (".",",", $row["price_type_1"]);
                                echo "<td>" . "R$ ". $preço_1. "</td>";
                                $preço_2 = str_replace (".",",", $row["price_type_3"]);
                                echo "<td>" . "R$ ". $preço_2. "</td>";
                                $preço_3 = str_replace (".",",", $row["price_type_3"]);
                                echo "<td>" . "R$ ". $preço_3. "</td>";
                                $preço_4 = str_replace (".",",", $row["price_type_4"]);
                                echo "<td>" . "R$ ". $preço_4. "</td>";
                                $preço_5 = str_replace (".",",", $row["price_type_5"]);
                                echo "<td>" . "R$ ". $preço_5. "</td>";
                                $preço_6 = str_replace (".",",", $row["price_type_6"]);
                                echo "<td>" . "R$ ". $preço_6. "</td>";
                                echo "</tr>";
                            }

                            echo "</table>";
                        } else {
                            echo "Nenhum produto encontrado.";
                        }
                    $conn->close();
                    ?>
                    </div>
                </div>
            </div>

            <!-- Alterar produtos -->
            <div class="vitrine vitrineAlterarProdutos desativada">
                <div class="formularios">
                    <p>Alterar produtos</p>
                </div>
            </div>

            <!-- Cadastrar produtos -->
            <div class="vitrine vitrineCadastrarProdutos desativada">
                <div class="formularios">
                    <p>Cadastrar produtos</p>
                    <form action="index.php" name="cadastrar_produtos" method="POST" class="formularioGeral formularioCadastrarProdutos">
                        <input type="text" id="product_name" name="product_name" placeholder="Nome do Produto" required>
                        <label for="product_name">Nome do Produto</label>

                        <textarea id="product_description" name="product_description" rows="4"placeholder="Decrição do Produto" ></textarea>
                        <label for="product_description">Decrição do Produto</label>

                        <input type="text" id="price_type_1" name="price_type_1" placeholder="R$ 0,00 - Preço tipo - 1" required>
                        <label for="price_type_1">Preço tipo - 1</label>

                        <input type="text" id="price_type_2" name="price_type_2" placeholder="R$ 0,00 - Preço tipo - 2">
                        <label for="price_type_2">Preço tipo - 2</label>

                        <input type="text" id="price_type_3" name="price_type_3" placeholder="R$ 0,00 - Preço tipo - 3">
                        <label for="price_type_3">Preço tipo - 3</label>

                        <input type="text" id="price_type_4" name="price_type_4" placeholder="R$ 0,00 - Preço tipo - 4">
                        <label for="price_type_4">Preço tipo - 4</label>

                        <input type="text" id="price_type_5" name="price_type_5" placeholder="R$ 0,00 - Preço tipo - 5">
                        <label for="price_type_5">Preço tipo - 5</label>

                        <input type="text" id="price_type_6" name="price_type_6" placeholder="R$ 0,00 - Preço tipo - 6">
                        <label for="price_type_6">Preço tipo - 6</label>

                        <button type="submit" name="cadastrar_produtos">Cadastrar Produtos</button>
                    </form>
                </div>
            </div>

            <!-- Extrato -->
            <div class="vitrine vitrineExtratos desativada">
                <div class="formularios">
                    <p>extrato</p>
                </div>
            </div>

        </div>
    </main>


</body>
</html>