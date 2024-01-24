<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="media/css/estilos.css">
    <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    
    <title>Painel de controle</title>
</head>

<?php
    $resultadoPositivo = "";
    $resultadoNegativo = "";
    include 'cadastrarClientes.php';
?>

<body>

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
                        <li class="subBotao" data-target="vitrineVenda">Realizar Venda</li>
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
                    <form action="">
                        <p>Realizar venda</p>
                    </form>
                </div>
            </div>

            <!--  Histórico de Vendas -->
            <div class="vitrine vitrineHistoricoDeVenda desativada">
                <div class="formularios">
                    <form action="">
                        <p>Histórico de Vendas</p>
                    </form>
                </div>
            </div>

            <!-- Consultar clientes -->
            <div class="vitrine vitrineConultarClientes desativada">
                <div class="formularios">
                    <p>Consultar Clientes</p>
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

                        <input type="phone" id="phone" name="phone" placeholder="Telefone" required>
                        <label for="phone">Telefone</label>

                        <input type="text" id="cpf_cnpj" name="cpf_cnpj" placeholder="CPF/ CNPJ" required>
                        <label for="cpf_cnpj">CPF/ CNPJ</label>

                        <input type="text" id="address" name="address" placeholder="Endereço">
                        <label for="address">Endereço</label>

                        <div class="numeroComplemento">
                            <input type="number" id="number" name="number" placeholder="Número">
                            <label for="number">Nº</label>
                                
                            <input class="complemento" type="text" id="complement" name="complement" placeholder="Complemento">
                            <label for="complement">Complemento</label>
                        </div>

                        <input type="text" id="neighborhood" name="neighborhood" placeholder="Bairro">
                        <label for="neighborhood">Bairro</label>

                        <input type="text" id="city" name="city" placeholder="Cidade">
                        <label for="city">Cidade</label>

                        <input type="text" id="zipcode" name="zipcode" placeholder="CEP">
                        <label for="zipcode">CEP</label>

                        <input type="text" id="debit_amount" name="debit_amount" placeholder="Possui saldo devedor? Se sim, inserir o valor.">
                        <label for="debit_amount">Saldo Devedor</label>

                        <button type="submit" name="cadastrar_clientes">Cadastrar Cliente</button>
                    </form>
                </div>
            </div>

            <!-- Pagamento -->
            <div class="vitrine vitrinePagamento desativada">
                <div class="formularios">
                    <p>Pagamento clientes</p>
                </div>
            </div>

            <!-- Consultar produtos -->
            <div class="vitrine vitrineConsultarProdutos desativada">
                <div class="formularios">
                    <p>Consultar produtos</p>
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

                        <input type="text" id="price_type_1" name="price_type_1" placeholder="Preço tipo - 1" required>
                        <label for="price_type_1">Preço tipo - 1</label>

                        <input type="text" id="price_type_2" name="price_type_2" placeholder="Preço tipo - 2" required>
                        <label for="price_type_2">Preço tipo - 2</label>

                        <input type="text" id="price_type_3" name="price_type_3" placeholder="Preço tipo - 3" required>
                        <label for="price_type_3">Preço tipo - 3</label>

                        <input type="text" id="price_type_4" name="price_type_4" placeholder="Preço tipo - 4" required>
                        <label for="price_type_4">Preço tipo - 4</label>

                        <input type="text" id="price_type_5" name="price_type_5" placeholder="Preço tipo - 5" required>
                        <label for="price_type_5">Preço tipo - 5</label>

                        <input type="text" id="price_type_6" name="price_type_6" placeholder="Preço tipo - 6" required>
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
    <script  src="/laboratorioJoia/media/js/script.js"></script>
</body>
</html>