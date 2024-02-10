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

        <a href="#" class="dashBoard">
            <img src="media/img/icones/iconePainelDeControle.svg" alt="">
            <p>dashBoard</p>
        </a>
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
                        <li class="subBotao" data-target="vitrineHistoricoDeVenda" onclick="getClients()">Histórico de Venda</li>
                    </ul>
                </li>
                <li class="clientes menu-item desativada tamanhoAtivo">
                    <p>Clientes</p>
                    <ul class="subMenu">
                        <li class="subBotao" data-target="vitrineConultarClientes">Consultar Clientes</li>
                        <li class="subBotao" data-target="vitrineAlterarClientes">Alterar Clientes</li>
                        <li class="subBotao" data-target="vitrineCadastrarClientes">Cadastrar Clientes</li>
                        <li class="subBotao" data-target="vitrinePagamento">Pagamento</li>
                        <li class="subBotao" data-target="vitrineHistoricoPagamento" onclick="getClients()">Histórico de Pagamento</li>
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
                <li class="extratos menu-item desativada" data-target="vitrineExtratos" onclick="getClients()">
                    <p>Extratos</p>
                </li>
            </ul>
                <!--botao de logout -->
            <form method="post" action="treatment.php" class="botaoLogout">
                <input type="hidden" name="logout" value="true">
                <em><?php echo "<b></b>". $_SESSION['username']; ?></em>
                <button type="submit">
                    <p>finalizar sessão</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-SignOut"><path d="M13 12h9m0 0l-3.333-4M22 12l-3.333 4"/><path d="M14 7V5.174a2 2 0 0 0-2.166-1.993l-8 .666A2 2 0 0 0 2 5.84v12.32a2 2 0 0 0 1.834 1.993l8 .667A2 2 0 0 0 14 18.826V17"/></svg>
                </button>
                <span> Laboratório Joia © 2024 | versão beta: 0.1</span>
            </form>
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
                                <label for="paciente">Nome do Paciente</label>
                            </div>

                            <!-- Botão adicionar items no carrinho -->
                            <div class="botaoCarrinho" onclick="addToCart()">
                                <span>adicionar</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg" class="IconHeaderCart" size="20">
                                    <path d="M7.19975 19.2C5.8798 19.2 4.81184 20.28 4.81184 21.6C4.81184 22.92 5.8798 24 7.19975 24C8.51971 24 9.59967 22.92 9.59967 21.6C9.59967 20.28 8.51971 19.2 7.19975 19.2ZM0 0V2.4H2.39992L6.71977 11.508L5.09982 14.448C4.90783 14.784 4.79984 15.18 4.79984 15.6C4.79984 16.92 5.8798 18 7.19975 18H21.5993V15.6H7.70374C7.53574 15.6 7.40375 15.468 7.40375 15.3L7.43974 15.156L8.51971 13.2H17.4594C18.3594 13.2 19.1513 12.708 19.5593 11.964L23.8552 4.176C23.9542 3.99286 24.004 3.78718 23.9997 3.57904C23.9955 3.37089 23.9373 3.16741 23.8309 2.98847C23.7245 2.80952 23.5736 2.66124 23.3927 2.55809C23.2119 2.45495 23.0074 2.40048 22.7992 2.4H5.05183L3.92387 0H0ZM19.1993 19.2C17.8794 19.2 16.8114 20.28 16.8114 21.6C16.8114 22.92 17.8794 24 19.1993 24C20.5193 24 21.5993 22.92 21.5993 21.6C21.5993 20.28 20.5193 19.2 19.1993 19.2Z" fill="white" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #e8e6e3;"></path></g>
                                </svg>
                            </div>
                        </div>

                        <!-- Conteudo do carrinho -->
                        <div id="cartDisplay" class="tabelaGeral tabelaCarrinho">
                            <!-- Cart contents will be displayed here -->
                        </div>
                    </form>
                </div>
            </div>

            <!--  Histórico de Vendas -->
            <div class="vitrine vitrineHistoricoDeVenda desativada">
                <div class="formularios">
                    <p>Histórico de Vendas</p>
                  
                    <form name="gistoricoFinal" class="formularioGeral formularioExtrato" id="extratoForm">
                        <div class="inputMesmaLinha">
                                <!--
                                <label for="myCheckbox">Check this box:</label>
                                <input type="checkbox" id="myCheckbox" name="myCheckbox"> -->
                                <div class="containerInputLabel">
                                <select id="clientDropdownHistory" name="clientDropdownHistory">
                                    <!-- Opções do dropdown podem ser preenchidas dinamicamente a partir do PHP -->
                                </select>
                                <label for="clientDropdownHistory">Cliente</label>
                            </div>

                            <div class="containerInputLabel">
                                <input type="date" id="startDateHistorico" name="startDateHistorico" required>
                                <label for="startDateHistorico">Data de Início</label>
                            </div>

                            <div class="containerInputLabel">
                                <input type="date" id="endDateHistorico" name="endDateHistorico" required>
                                <label for="endDateHistorico">Data de Término</label>
                            </div>
                            
                            <button name="historicoFinal" type="button" onclick="getFilteredHistory()">Buscar</button>
                        </div>
                        <div id="filteredHistorico">
                            <!-- Os dados filtrados serão exibidos aqui -->
                        </div>
                    </form>
                </div>
            </div>

            <!-- Consultar clientes -->
            <div class="vitrine vitrineConultarClientes desativada">
                <div class="formularios">
                    <p>Consultar Clientes</p>
                    <?php
                    include 'dbConnection.php';

                    // Consulta os clientes
                    $sqlclients = "SELECT * FROM clients";
                    $resultClients = $conn->query($sqlclients);

                    if ($resultClients->num_rows > 0) {
                        echo "<table class='tabelaConsultarClientes tabelaGeral'>";
                        echo "<tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>CPF/CNPJ</th>
                                <th>Endereço</th> 
                                <th>Devedor</th>
                                <th>Excluir</th>
                            </tr>";

                        while ($row = $resultClients->fetch_assoc()) {
                            echo "<tr>";
                            echo "<td>" . $row["client_id"] . "</td>";
                            echo "<td>" . $row["client_name"] . "</td>";
                            echo "<td>" . $row["client_email"] . "</td>";
                            echo "<td>" . $row["phone"] . "</td>";
                            echo "<td>" . $row["cpf_cnpj"] . "</td>";
                            echo "<td>" . $row["address"] . ", " 
                                        . $row["number"] . ", " 
                                        . $row["complement"] . ", "
                                        . $row["neighborhood"] . ", " 
                                        . $row["city"] . ", " 
                                        . $row["zipcode"] .
                                "</td>";
                            echo "<td>" . "R$ " . $row["debit_amount"] . "</td>";
                            echo "<td>
                                    <button onclick=\"removeCliente(" . $row["client_id"] . ")\">
                                        <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='ai ai-TrashCan'>
                                            <path d='M4 6h16l-1.58 14.22A2 2 0 0 1 16.432 22H7.568a2 2 0 0 1-1.988-1.78L4 6z'/><path d='M7.345 3.147A2 2 0 0 1 9.154 2h5.692a2 2 0 0 1 1.81 1.147L18 6H6l1.345-2.853z'/><path d='M2 6h20'/><path d='M10 11v5'/><path d='M14 11v5'/>
                                        </svg>
                                    </button>
                                </td>";
                            echo "</tr>";
                        }

                        echo "</table>";
                    } else {
                        echo "Nenhum cliente encontrado.";
                    }

                    $conn->close();
                    ?>
                </div>
            </div>

            <!-- Alterar clientes -->
            <div class="vitrine vitrineAlterarClientes desativada">
                <div class="formularios">
                    <p>Alterar Clientes</p>
                    
                    <form id="clientForm" class="formularioGeral formularioCadastrarClientes">
                        <select id="clientDropdownAtualizar" name="client" onclick="getClients()" onchange="atualizarForm()">
                            <!-- Opções do dropdown devem ser carregadas dinamicamente no lado do servidor -->
                        </select>
                        <label for="clientDropdownAtualizar">Selecione um cliente:</label>

                        <p>Dados do Cliente Selecionado</p>
                        <hr>
                        <input type="text" id="clientName" name="clientName">
                        <label for="clientName">Nome:</label>
                        <input type="text" id="clientEmail" name="clientEmail">
                        <label for="clientEmail">Email:</label>

                        <input type="text" id="clientPhone" name="clientPhone">
                        <label for="clientPhone">Telefone:</label>

                        <input type="text" id="clientCpfCnpj" name="clientCpfCnpj">
                        <label for="clientCpfCnpj">CPF/CNPJ:</label>

                        <input type="text" id="clientAddress" name="clientAddress">
                        <label for="clientAddress">Endereço:</label>

                        <input type="text" id="clientNumber" name="clientNumber">
                        <label for="clientNumber">Número:</label>

                        <input type="text" id="clientComplement" name="clientComplement">
                        <label for="clientComplement">Complemento:</label>

                        <input type="text" id="clientNeighborhood" name="clientNeighborhood">
                        <label for="clientNeighborhood">Bairro:</label>

                        <input type="text" id="clientCity" name="clientCity">
                        <label for="clientCity">Cidade:</label>

                        <input type="text" id="clientZipcode" name="clientZipcode">
                        <label for="clientZipcode">CEP:</label>

                        <input type="hidden" name="clientIdAtt" id="clientIdAtt">
                        <button type="button" onclick="updateClient()">Atualizar Cliente</button>
                    </form>
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
                            <?php
                                include 'dbConnection.php';
                                // Pegando os clientes do banco de dados.
                                $result = $conn->query("SELECT client_id, client_name FROM clients");

                                if ($result->num_rows > 0) {
                                    while ($row = $result->fetch_assoc()) {
                                        echo "<option value='{$row['client_id']}'>{$row['client_name']}</option>";
                                    }
                                } else {
                                    echo "<option value='' disabled>Nenhum cliente encontrado..</option>";
                                }
                                $conn->close();
                            ?>
                        </select>
                        <label for="client_id_payment">Cliente</label>

                        <div class="saldoDevedor">
                            <span class="debito" id="current_debt">N/A</span>
                            <span class="labelDebito">Divida Atual</span>
                        </div>

                        <input type="date" id="payment_date" name="payment_date" required>
                        <label for="payment_date">Data do pagamento</label>

                        <input type="text" id="amount" name="amount" placeholder="R$ 0,00 - Insira valor a ser descontado da divida." required>
                        <label for="amount">Valor Pago</label>

                        <select type="text" id="type_of_payment" name="type_of_payment">
                            <option value="PIX">PIX</option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Cartão de Débito">Cartão de Débito</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </select>
                        <label for="type_of_payment">Método de pagamento</label>

                        <input type="hidden" name="update_payment" value="1">

                        <button type="submit" name="paymentform">Atualizar conta</button>
                    </form>
                </div>
            </div>

            <!-- Histórico de Pagamentos -->
            <div class="vitrine vitrineHistoricoPagamento desativada">
                <div class="formularios">
                    <p>Histórico de Pagamento</p>
                    <form name="historicoPagamentoForm" class="formularioGeral formularioExtrato" id="historicoPagamentoForm">
                        <div class="inputMesmaLinha">
                            <div class="containerInputLabel">
                                <select id="clienteDropdownPagamento" name="clienteDropdownPagamento">
                                    <!-- Opções do dropdown podem ser preenchidas dinamicamente a partir do JavaScript -->
                                </select>
                                <label for="clienteDropdownPagamento">Cliente</label>
                            </div>

                            <div class="containerInputLabel">
                                <input type="date" id="startDatePagamento" name="startDatePagamento" required>
                                <label for="startDatePagamento">Data de Início</label>
                            </div>

                            <div class="containerInputLabel">
                                <input type="date" id="endDatePagamento" name="endDatePagamento" required>
                                <label for="endDatePagamento">Data de Término</label>
                            </div>

                            <button name="historicoPagamento" type="button" onclick="getFilteredPagamento()">Buscar</button>
                        </div>
                    </form>
                    <input type="hidden" name="pagamentoIdHidden" id="pagamentoIdHidden">
                    <div >
                    <table id="filteredPagamentos" class="tabelaGeral tabelaHistoricoPagamento"></table>
                        
                            <!-- Os dados filtrados serão exibidos aqui -->
                        </div>
                </div>
            </div>


            <!-- Consultar produtos -->
            <div class="vitrine vitrineConsultarProdutos desativada">
                <div class="formularios">
                    <p>Consultar produtos</p>
                    <div id="" class="tabelaGeral tabelaConsultarProdutos">
                        <?php
                        include 'dbConnection.php';
                        
                        // Consulta os produtos
                        $sql = "SELECT * FROM products";
                        $resultProducts = $conn->query($sql);

                        if ($resultProducts->num_rows > 0) {
                            echo "<table border='1'>";
                            echo "<tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Preço 1</th>
                                    <th>Preço 2</th>
                                    <th>Preço 3</th>
                                    <th>Preço 4</th>
                                    <th>Preço 5</th>
                                    <th>Preço 6</th>
                                    <th>Excluir</th>
                                </tr>";

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
                                //echo "<td><button onclick=\"removeProduto(" . $row["product_id"] . ")\"><em>X </em>Remover</button></span></td></tr>";
                                echo "<td>
                                    <button onclick=\"removeProduto(" . $row["product_id"] . ")\">
                                        <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='ai ai-TrashCan'>
                                            <path d='M4 6h16l-1.58 14.22A2 2 0 0 1 16.432 22H7.568a2 2 0 0 1-1.988-1.78L4 6z'/><path d='M7.345 3.147A2 2 0 0 1 9.154 2h5.692a2 2 0 0 1 1.81 1.147L18 6H6l1.345-2.853z'/><path d='M2 6h20'/><path d='M10 11v5'/><path d='M14 11v5'/>
                                        </svg></button>
                                    </td>";
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
                    
                    <!-- Formulário para atualizar produtos -->
                    <form id="updateProductForm" name="clientform" class="formularioGeral formularioCadastrarClientes">
                            <!-- Dropdown para selecionar o produto -->
                            <select id="productDropdown" name="product" onclick="getProducts()" onchange="productForm()">
                                <!-- Options serão preenchidas dinamicamente pelo JavaScript -->
                            </select>
                            <label for="productDropdown">Selecione um produto:</label>
                            <p style="margin-bottom: 20px">Produto Selecionado</p>

                            <!-- Campos para exibir e editar dados do produto -->
                            <input type="text" id="productName" name="productName">
                            <label for="productName">Nome do Produto:</label>

                            <textarea id="productDescription" name="productDescription"></textarea>
                            <label for="productDescription">Descrição do Produto:</label>

                            <input type="text" id="priceType1" name="priceType1">
                            <label for="priceType1">Preço Tipo 1:</label>

                            <input type="text" id="priceType2" name="priceType2">
                            <label for="priceType2">Preço Tipo 1:</label>

                            <input type="text" id="priceType3" name="priceType3">
                            <label for="priceType3">Preço Tipo 1:</label>

                            <input type="text" id="priceType4" name="priceType4">
                            <label for="priceType4">Preço Tipo 1:</label>

                            <input type="text" id="priceType5" name="priceType5">
                            <label for="priceType5">Preço Tipo 1:</label>

                            <input type="text" id="priceType6" name="priceType6">
                            <label for="priceType6">Preço Tipo 1:</label>

                            <!-- Repita para outros tipos de preço se necessário -->
                            <input type="hidden" name="productIdAtt" id="productIdAtt">
                            <!-- Botão para enviar dados -->
                            <button type="button" onclick="updateProduct()">Atualizar Produto</button>
                        </form>
                </div>
            </div>

            <!-- Cadastrar produtos -->
            <div class="vitrine vitrineCadastrarProdutos desativada">
                <div class="formularios">
                    <p>Cadastrar produtos</p>
                    <form action="index.php" name="cadastrar_produtos" method="POST" class="formularioGeral formularioCadastrarProduos">
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
                    <p>Extrato</p>
                    <form name="extratoFinal" class="formularioGeral formularioExtrato" id="extratoForm">
                        <div class="inputMesmaLinha">
                            <div class="containerInputLabel">
                                <select id="clientDropdown" name="client">
                                    <!-- Opções do dropdown podem ser preenchidas dinamicamente a partir do PHP -->
                                </select>
                                <label for="client">Cliente</label>
                            </div>

                            <div class="containerInputLabel">
                                <input type="date" id="startDate" name="startDate" required>
                                <label for="startDate">Data de Início</label>
                            </div>

                            <div class="containerInputLabel">
                                <input type="date" id="endDate" name="endDate" required>
                                <label for="endDate">Data de Término</label>
                            </div>
                            
                            
                            <button name="extratoFinal" type="button" onclick="getFilteredData()">Buscar</button>
                        </div>
                        <table id="filteredData" class="tabelaGeral tabelaExtrato">
                            <!-- Os dados filtrados serão exibidos aqui -->
                        </table>
                    </form>
                </div>
            </div>

        </div>
    </main>


</body>
</html>