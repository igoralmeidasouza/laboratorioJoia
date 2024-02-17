<?php
include 'dbConnection.php'; // Conexão com o banco de dados

// Inicia a sessão
session_start();

// Verifica se o usuário não está logado e redireciona para a página de login
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header("Location: login.php");
    exit;
}



// Verifique se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {


    /* Cadastrar cliente */
    if (isset($_POST['cadastrar_clientes'])) {
    
        // Colete os dados do formulário
        $client_name = $_POST['client_name'];
        $client_email = $_POST['client_email'];
        $telefone = $_POST['phone'];
        $cpf_cnpj = $_POST['cpf_cnpj'];
        $address = $_POST['address'];
        $number = $_POST['number'];
        $complemento = $_POST['complemento'];
        $neighborhood = $_POST['neighborhood'];
        $city = $_POST['city'];
        $zipcode = $_POST['zipcode'];
        $debit_amount = $_POST['debit_amount'];

        // Retira o "R$" e ajusta as pontuações para o banco de dados ficar no formato de number.
        $formattedValue1 = str_replace (".", "", $debit_amount);
        $formattedValue1 = str_replace(",", ".", $formattedValue1);
        $formattedValue1 = substr($formattedValue1, 4);

        // Verifique se o CPF/CNPJ já existe no banco de dados
        $check_sql = "SELECT * FROM clients WHERE cpf_cnpj = '$cpf_cnpj'";
        $check_result = $conn->query($check_sql);

        if ($check_result->num_rows > 0) {
            // CPF/CNPJ já está em uso, exiba uma mensagem de erro
            $resultadoNegativo = "Já existe um cliente cadastrado com esse CPF/CNPJ.";
        } else {
            // CPF/CNPJ não está em uso, proceda com a inserção do novo cliente
            // Execute a consulta SQL para inserir o novo cliente
            $sql = "INSERT INTO clients (client_name, client_email, phone, cpf_cnpj, address, number, complement, neighborhood, city, zipcode, debit_amount) 
                    VALUES ('$client_name', '$client_email', '$telefone', '$cpf_cnpj', '$address', '$number', '$complemento', '$neighborhood', '$city', '$zipcode', '$formattedValue1')";

            if ($conn->query($sql) === TRUE) {
                //$resultadoPositivo = "Cliente adicionado com sucesso!";
                $_SESSION['positivo'] = "Cliente adicionado com sucesso!";
                header("Location: index.php");
            } else {
                $_SESSION['negativo'] = "Erro ao adicionar cliente: " . $conn->error;
                header("Location: index.php");
                //$resultadoNegativo = "Erro ao adicionar cliente: " . $conn->error;
            }
        }

        // Feche a conexão com o banco de dados
        $conn->close();
}


    /* Cadastrar produto */
    elseif (isset($_POST['cadastrar_produtos'])) {
        // Collect form data

        $product_name = $_POST['product_name'];
        $product_description = $_POST['product_description'];
        //i retrieved the price 1 without using the formatPrice()
        $price_type_1 = formatPrice($_POST['price_type_1']);
        $price_type_2 = formatPrice($_POST['price_type_2']);
        $price_type_3 = formatPrice($_POST['price_type_3']);
        $price_type_4 = formatPrice($_POST['price_type_4']);
        $price_type_5 = formatPrice($_POST['price_type_5']);
        $price_type_6 = formatPrice($_POST['price_type_6']);
        // Perform the database query to insert the new product
        $sql = "INSERT INTO products (product_name, product_description, price_type_1, price_type_2, price_type_3, price_type_4, price_type_5, price_type_6) 
                VALUES ('$product_name', '$product_description', $price_type_1, $price_type_2, $price_type_3, $price_type_4, $price_type_5, $price_type_6)";
    
        if ($conn->query($sql) === TRUE) {
            //$resultadoPositivo = "Produto cadastrado com sucesso!";
            $_SESSION['positivo'] = "Produto cadastrado com sucesso!";
        } 
        else {
            //$resultadoNegativo = "Error: " . $sql . "<br>" . $conn->error;
            $_SESSION['negativo'] = "Error: " . $sql . "<br>" . $conn->error;

        }
    // Close the database connection
    $conn->close();

    }

    // Débito pendete
    elseif (isset($_POST['paymentform'])) {
        // Check for the specific action based on the provided key
        if (isset($_POST['update_payment'])) {
            $client_id_payment = $_POST['client_id_payment'];
            //$payment_date = $_POST['payment_date'];
            $amount = $_POST['amount'];
            $type_of_payment = $_POST['type_of_payment'];
    
            // Retira o "R$" e ajusta as pontuações para o banco de dados ficar no formato de número.
            $formattedValue = str_replace(".", "", $amount);
            $formattedValue = str_replace(",", ".", $formattedValue);
            $formattedValue = substr($formattedValue, 4);
    
            $conn->begin_transaction();
    
            // Consulta para obter o débito atual do cliente antes do pagamento
            $client_debt_result = $conn->query("SELECT debit_amount FROM clients WHERE client_id = '$client_id_payment'");
            $client_debt_row = $client_debt_result->fetch_assoc();
            $saldo_anterior = $client_debt_row['debit_amount'];
    
            // Calcula o novo débito após o pagamento
            $saldo_atual = $saldo_anterior - $formattedValue;
    
            // Insere o novo pagamento com saldos atual e anterior
            $sql_payment = "INSERT INTO clientpayments (client_id, payment_date, amount, type_of_payment, saldo_anterior, saldo_atual) 
                            VALUES ('$client_id_payment', NOW(), '$formattedValue', '$type_of_payment', '$saldo_anterior', '$saldo_atual')";
            $conn->query($sql_payment);
    
            // Atualiza o débito atual do cliente na tabela clients
            $sql_discount_debit = "UPDATE clients SET debit_amount = '$saldo_atual' WHERE client_id = '$client_id_payment'";
            $conn->query($sql_discount_debit);
    
            // Commit the transaction
            $conn->commit();
    
            $resultadoPositivo = "Conta atualizada com sucesso!";
        } elseif (isset($_POST['get_client_debt'])) {
            // Handle the request to get client debt
            $client_id = $_POST['client_id'];
    
            // Fetch client's debt from the database
            $result = $conn->query("SELECT debit_amount FROM clients WHERE client_id = '$client_id'");
    
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                echo $row['debit_amount'];
            } else {
                echo "N/A";
            }
        } else {
            $resultadoNegativo = "Requisição inválida.";
        }
    
        // Close the database connection
        $conn->close();
    }
    
    

    elseif (isset($_POST['get_clients'])) {
        // Query the database to get client options
        $clientQuery = "SELECT client_id, client_name FROM clients WHERE status = 'ativado'";
        $clientResult = $conn->query($clientQuery);

        // Generate HTML for client options
        $clientOptions = "";
        while ($clientRow = $clientResult->fetch_assoc()) {
            $clientId = $clientRow['client_id'];
            $clientName = $clientRow['client_name'];
            $clientOptions .= "<option value='$clientId'>$clientName</option>";
        }

        // Return the HTML with client options to the Ajax request
        echo $clientOptions;
    }
    // Handling POST request for getting details
    elseif (isset($_POST['product'])) {
        // Get the selected product from the Ajax request
        $selectedProduct = $_POST['product'];

        // Query the database to get prices for the selected product
        $query = "SELECT price_type_1, price_type_2, price_type_3, price_type_4, price_type_5, price_type_6 FROM products WHERE product_id = $selectedProduct";

        // Execute the query and fetch prices
        $result = $conn->query($query);

        // Process the result and generate HTML for the prices
        $pricesHTML = "";
        while ($row = $result->fetch_assoc()) {
            foreach ($row as $price) {
                $pricesHTML .= "<option value='" . $price . "'>" . "R$ ". $price . "</option>";
            }
        }

        // Return the HTML with prices to the Ajax request
        echo $pricesHTML;
    } elseif (isset($_POST['get_products'])) {
        // Handling POST request for getting product options
        $productQuery = "SELECT product_id, product_name FROM products WHERE status = 'ativado'";
        $productResult = $conn->query($productQuery);

        // Generate HTML for product options
        $productOptions = "";
        while ($productRow = $productResult->fetch_assoc()) {
            $productId = $productRow['product_id'];
            $productName = $productRow['product_name'];
            $productOptions .= "<option value='$productId'>$productName</option>";
        }

        // Return the HTML with product options to the Ajax request
        echo $productOptions;

    } elseif (isset($_POST['carrinhoValores'])) {
        // Retrieve data from the POST request
        $data = json_decode($_POST['carrinhoValores'], true);
        // Extract variables from the data
        $selectedClient = $data['client'];
        $selectedProduct = $data['product'];
        $quantity = $data['quantity'];
        $selectedPaciente = $data['paciente'];
        $total = $data['total'];
        $cartItems = $data['cart'];
    
        // Fetching the current debit amount before the sale
        $fetchDebitQuery = "SELECT debit_amount FROM clients WHERE client_id = $selectedClient";
        $resultDebit = $conn->query($fetchDebitQuery);
        $debitAmountBeforeSale = $resultDebit->fetch_assoc()['debit_amount'];
    
        // Your existing logic for inserting data into the database
        $insertHistoryQuery = "INSERT INTO saleshistory (client_id, sale_date, total_amount, saldo_anterior, debito) 
                               VALUES ($selectedClient, NOW(), $total, $debitAmountBeforeSale, $debitAmountBeforeSale + $total)";
        $conn->query($insertHistoryQuery);
        $saleId = $conn->insert_id;
    
        // Iterar sobre os itens do carrinho e adicionar à tabela de detalhes de vendas (salesdetails)
        foreach ($cartItems as $cartItem) {
            $productId = $cartItem['product'];
            $itemQuantity = $cartItem['quantity'];
            $itemTotal = $cartItem['total'];
    
            $insertDetailsQuery = "INSERT INTO salesdetails (sale_id, product_id, quantity, price, observation) 
                                   VALUES ($saleId, $productId, $itemQuantity, $itemTotal, '$selectedPaciente')";
            $conn->query($insertDetailsQuery);
        }
    
        // Atualizar o débito do cliente na tabela de clientes (clients)
        $updateClientQuery = "UPDATE clients SET debit_amount = debit_amount + $total WHERE client_id = $selectedClient";
        $conn->query($updateClientQuery);
    
        // Example: Fetch client data from the database
        $fetchClientQuery = "SELECT * FROM clients WHERE client_id = $selectedClient";
        $result = $conn->query($fetchClientQuery);
    
        // Check if the query was successful
        if ($result) {
            $clientData = $result->fetch_assoc(); // Adjust this based on your database structure
            $data['clientData'] = $clientData;
            $data['lastSaleId'] = $saleId;
        } else {
            $data['clientData'] = null;
        }
    
        // Example: Respond with a success message and the modified data
        echo json_encode(['success' => true, 'data' => $data]);

    } elseif (isset($_POST['startDate'])) {
        // Coloque aqui a lógica para processar a consulta do extrato com filtro
        // Certifique-se de validar e sanitizar as entradas do usuário, como as datas
    
        $startDate = $_POST['startDate'] . ' 00:00:00';
        $endDate = $_POST['endDate'] . ' 23:59:59';
    
        // Verifica se o filtro de cliente foi enviado
        if (isset($_POST['client']) && !empty($_POST['client'])) {
            $clientId = $_POST['client'];
            // Prepara a consulta SQL com cláusula WHERE para filtrar por data, cliente e cliente
            $sql = "SELECT 
                saleshistory.*, 
                clients.client_name, 
                clients.debit_amount, 
                salesdetails.quantity, 
                salesdetails.price, 
                salesdetails.observation,
                products.product_name,
                saleshistory.saldo_anterior,
                saleshistory.debito
            FROM saleshistory
            LEFT JOIN clients ON saleshistory.client_id = clients.client_id
            LEFT JOIN salesdetails ON saleshistory.sale_id = salesdetails.sale_id
            LEFT JOIN products ON salesdetails.product_id = products.product_id
            WHERE saleshistory.sale_date BETWEEN '$startDate' AND '$endDate' AND saleshistory.client_id = $clientId";
            
            // Consulta para obter os pagamentos
            $paymentsQuery = "SELECT 
                clientpayments.payment_id,
                clientpayments.payment_date,
                clientpayments.amount,
                clientpayments.type_of_payment AS observation,
                clientpayments.saldo_anterior,
                clientpayments.saldo_atual
            FROM clientpayments
            WHERE clientpayments.payment_date BETWEEN '$startDate' AND '$endDate' AND clientpayments.client_id = $clientId";
            
        } else {
            // Caso não tenha filtro de cliente, consulta apenas por data
            $sql = "SELECT saleshistory.*, clients.client_name, clients.debit_amount, 
                    salesdetails.quantity, salesdetails.price, salesdetails.observation,
                    products.product_name
                    FROM saleshistory
                    LEFT JOIN clients ON saleshistory.client_id = clients.client_id
                    LEFT JOIN salesdetails ON saleshistory.sale_id = salesdetails.sale_id
                    LEFT JOIN products ON salesdetails.product_id = products.product_id
                    WHERE saleshistory.sale_date BETWEEN '$startDate' AND '$endDate'";
        }
    
        // Adiciona a cláusula ORDER BY para ordenar por data descendente
        $sql .= " ORDER BY saleshistory.sale_date DESC";
        $paymentsQuery .= " ORDER BY clientpayments.payment_date ASC";
    
        // Executa a consulta
        $paymentsResult = $conn->query($paymentsQuery);
        $result = $conn->query($sql);
        $filteredData = [];
    
        if ($paymentsResult) {
            // Inicializa um array para armazenar os dados dos pagamentos
            $paymentsData = [];
    
            // Processa os resultados dos pagamentos
            while ($paymentRow = $paymentsResult->fetch_assoc()) {
                $paymentsData[] = [
                    'payment_id' => $paymentRow['payment_id'],
                    'payment_date' => $paymentRow['payment_date'],
                    'amount' => $paymentRow['amount'],
                    'type_of_payment' => $paymentRow['observation'],
                    'saldo_anterior' => $paymentRow['saldo_anterior'],
                    'debito' => $paymentRow['saldo_atual'],
                    // Adicione outros campos conforme necessário
                ];
            }
    
            // Libera os resultados da consulta de pagamentos
            $paymentsResult->free();
    
            // Adiciona os dados dos pagamentos ao array final


            $filteredData['payments'] = $paymentsData;
        }
    
        if ($result) {
            // Processa os resultados
            while ($row = $result->fetch_assoc()) {
                $filteredData[] = $row;
            }
            
            // Libera os resultados
            $result->free();
    
            // Retorna os resultados em formato JSON
            echo json_encode($filteredData);
        } else {
            // Retorna um erro em formato JSON
            echo json_encode(['error' => 'Erro na consulta']);
        }
    }elseif (isset($_POST['startDateHistorico'])) {
        // Coloque aqui a lógica para processar a consulta do extrato com filtro
        // Certifique-se de validar e sanitizar as entradas do usuário, como as datas
        $startDateHistorico = $_POST['startDateHistorico'] . ' 00:00:00';
        $endDateHistorico = $_POST['endDateHistorico'] . ' 23:59:59';
    
        // Verifica se o filtro de cliente foi enviado
        $clientId = isset($_POST['clientDropdownHistory']) ? intval($_POST['clientDropdownHistory']) : null;
    
        // Prepara a consulta SQL com cláusula WHERE para filtrar por data e, opcionalmente, por cliente
        $sql = "SELECT 
                saleshistory.*, 
                clients.client_name, 
                clients.debit_amount, 
                salesdetails.quantity, 
                salesdetails.price, 
                salesdetails.observation,
                products.product_name,
                saleshistory.saldo_anterior,
                saleshistory.debito
            FROM saleshistory
            LEFT JOIN clients ON saleshistory.client_id = clients.client_id
            LEFT JOIN salesdetails ON saleshistory.sale_id = salesdetails.sale_id
            LEFT JOIN products ON salesdetails.product_id = products.product_id
            WHERE saleshistory.sale_date BETWEEN '$startDateHistorico' AND '$endDateHistorico'";
    
        // Adiciona a condição do cliente, se fornecido
        if (!is_null($clientId)) {
            $sql .= " AND saleshistory.client_id = $clientId";
        }
    
        // Adiciona a cláusula ORDER BY para ordenar por data descendente
        $sql .= " ORDER BY saleshistory.sale_date DESC";
    
        // Executa a consulta
        $result = $conn->query($sql);
        $filteredData = [];
    
        if ($result) {
            // Processa os resultados
            while ($row = $result->fetch_assoc()) {
                $saleId = $row['sale_id'];
    
                // Cria um array para representar a venda, se ainda não existir
                if (!isset($filteredData[$saleId])) {
                    $filteredData[$saleId] = [
                        'sale_id' => $saleId,
                        'sale_date' => $row['sale_date'],
                        'observation' => $row['observation'],
                        'saldo_anterior' => $row['saldo_anterior'],
                        'debito' => $row['debito'],
                        'total_amount' => $row['total_amount'],
                        'debit_amount' => $row['debit_amount'],
                        'client_name' => $row['client_name'],
                        'products' => [],  // Array para armazenar produtos associados à venda
                    ];
                }
    
                // Adiciona informações do produto ao array de produtos
                $filteredData[$saleId]['products'][] = [
                    'product_name' => $row['product_name'],
                    'quantity' => $row['quantity'],
                    'price' => $row['price'],
                ];
                            // Adiciona o client_id à venda, se ainda não estiver definido
                if (!isset($filteredData[$saleId]['client_id'])) {
                    $filteredData[$saleId]['client_id'] = $row['client_id'];
            }
            }

            // Libera os resultados
            $result->free();
    
            // Retorna os resultados em formato JSON
            echo json_encode($filteredData);  // Converte array associativo para array numerado
        } else {
            // Retorna um erro em formato JSON
            echo json_encode(['error' => 'Erro na consulta']);
        }
    }elseif (isset($_POST['action']) && $_POST['action'] === 'atualizarClientes') {
        if (isset($_POST['clientId'])) {
            $clientId = $_POST['clientId'];
    
            // Consulte os dados do cliente com base no ID
            $sql = "SELECT * FROM clients WHERE client_id = $clientId";
            $result = $conn->query($sql);
    
            if ($result) {
                // Verifique se foram encontrados resultados
                if ($result->num_rows > 0) {
                    // Obtenha os dados do primeiro cliente encontrado
                    $clientData = $result->fetch_assoc();
    
                    // Envie os dados do cliente de volta como JSON
                    echo json_encode($clientData);
                } else {
                    // Se nenhum cliente for encontrado, retorne um erro
                    echo json_encode(['error' => 'Cliente não encontrado']);
                }
            } else {
                // Se houver um erro na consulta, retorne um erro
                echo json_encode(['error' => 'Erro na consulta']);
            }
        } else {
            // Se o ID do cliente não for fornecido, retorne um erro
            echo json_encode(['error' => 'ID do cliente não fornecido']);
        }
    }elseif (isset($_POST['clientEmail'])) {
        if (isset($_POST['clientId'])) {
            $clientId = $_POST['clientId'];
    
            // Verifique se os outros dados necessários foram fornecidos
            if (isset($_POST['clientName'], $_POST['clientEmail'], $_POST['phone'], $_POST['cpfCnpj'], $_POST['address'], $_POST['number'], $_POST['complement'], $_POST['neighborhood'], $_POST['city'], $_POST['zipcode'])) {
                
                // Obtenha os dados do POST
                $clientName = $_POST['clientName'];
                $clientEmail = $_POST['clientEmail'];
                $phone = $_POST['phone'];
                $cpfCnpj = $_POST['cpfCnpj'];
                $address = $_POST['address'];
                $number = $_POST['number'];
                $complement = $_POST['complement'];
                $neighborhood = $_POST['neighborhood'];
                $city = $_POST['city'];
                $zipcode = $_POST['zipcode'];
    
                // Atualize os dados do cliente no banco de dados
                $sql = "UPDATE clients SET 
                            client_name = '$clientName',
                            client_email = '$clientEmail',
                            phone = '$phone',
                            cpf_cnpj = '$cpfCnpj',
                            address = '$address',
                            number = '$number',
                            complement = '$complement',
                            neighborhood = '$neighborhood',
                            city = '$city',
                            zipcode = '$zipcode'
                        WHERE client_id = $clientId";
    
                if ($conn->query($sql) === TRUE) {
                    // Se a atualização for bem-sucedida, envie uma mensagem de sucesso
                    //echo json_encode(['success' => 'Dados do cliente atualizados com sucesso']);
                    $resultadoPositivo = "Dados do cliente atualizados com sucesso";
                    echo json_encode(array("mensagemPositiva" => $resultadoPositivo));
                    //header("Location: index.php");
                } else {
                    // Se houver um erro na atualização, envie uma mensagem de erro
                    //echo json_encode(['error' => 'Erro na atualização dos dados do cliente']);
                    $resultadoPositivo = "Erro na atualização dos dados do cliente";
                    echo json_encode(array("mensagemPositiva" => $resultadoPositivo));
                    //header("Location: index.php");
                }
            } else {
                // Se algum dos dados necessários não foi fornecido, envie uma mensagem de erro
                echo json_encode(['error' => 'Dados do cliente incompletos']);
            }
        } else {
            // Se o ID do cliente não foi fornecido, envie uma mensagem de erro
            echo json_encode(['error' => 'ID do cliente não fornecido']);
        }

    }elseif(isset($_POST['action']) && $_POST['action'] === 'atualizarProdutos') {
        if (isset($_POST['ProductId'])) {
            $productId = $_POST['ProductId'];
    
            // Consulte os dados do produto com base no ID
            $sql = "SELECT * FROM products WHERE product_id = $productId";
            $result = $conn->query($sql);
    
            if ($result) {
                // Verifique se foram encontrados resultados
                if ($result->num_rows > 0) {
                    // Obtenha os dados do primeiro produto encontrado
                    $productData = $result->fetch_assoc();
    
                    // Envie os dados do produto de volta como JSON
                    echo json_encode($productData);
                } else {
                    // Se nenhum produto for encontrado, retorne um erro
                    echo json_encode(['error' => 'Produto não encontrado']);
                }
            } else {
                // Se houver um erro na consulta, retorne um erro
                echo json_encode(['error' => 'Erro na consulta']);
            }
        } else {
            // Se o ID do produto não for fornecido, retorne um erro
            echo json_encode(['error' => 'ID do produto não fornecido']);
        }
    } elseif(isset($_POST['productDescription'])){
        if (isset($_POST['productId'])) {
                    // Obtém o ID do produto
        $productId = $_POST['productId'];

        // Obtém os outros dados do produto
        $productName = isset($_POST['productName']) ? $_POST['productName'] : '';
        $productDescription = isset($_POST['productDescription']) ? $_POST['productDescription'] : '';
        $priceType1 = formatPrice(isset($_POST['priceType1']) ? $_POST['priceType1'] : '');
        $priceType2 = formatPrice(isset($_POST['priceType2']) ? $_POST['priceType2'] : '');
        $priceType3 = formatPrice(isset($_POST['priceType3']) ? $_POST['priceType3'] : '');
        $priceType4 = formatPrice(isset($_POST['priceType4']) ? $_POST['priceType4'] : '');
        $priceType5 = formatPrice(isset($_POST['priceType5']) ? $_POST['priceType5'] : '');
        $priceType6 = formatPrice(isset($_POST['priceType6']) ? $_POST['priceType6'] : '');

        // Agora você pode usar essas variáveis para construir e executar sua consulta SQL de atualização
        // Certifique-se de validar e sanitizar os dados recebidos antes de usar em uma consulta SQL

        // Exemplo de consulta SQL de atualização
        $sql = "UPDATE products SET 
            product_name = '$productName', 
            product_description = '$productDescription', 
            price_type_1 = '$priceType1',
            price_type_2 = '$priceType2',
            price_type_3 = '$priceType3',
            price_type_4 = '$priceType4',
            price_type_5 = '$priceType5',
            price_type_6 = '$priceType6'
            WHERE product_id = $productId";

        // Execute a consulta SQL

        $result = $conn->query($sql);

        // Verifique se a consulta foi bem-sucedida
        if ($result) {
            $resultadoPositivo = "Produto atualizado com sucesso!";
            echo json_encode(array("mensagemPositiva" => $resultadoPositivo));
        } else {
            $resultadoPositivo = "Erro ao atualizar produto!";
            echo json_encode(array("mensagemPositiva" => $resultadoPositivo));
        }
    } else {
        echo json_encode(['error' => 'ID do produto não fornecido']);
    }
}elseif (isset($_POST['startDatePagamento'])) {
    // Coloque aqui a lógica para processar a consulta do histórico de pagamentos com filtro
    // Certifique-se de validar e sanitizar as entradas do usuário, como as datas
    $startDateHistorico = $_POST['startDatePagamento'] . ' 00:00:00';
    $endDateHistorico = $_POST['endDatePagamento'] . ' 23:59:59';

    // Verifica se o filtro de cliente foi enviado
    $clientId = isset($_POST['clienteDropdownPagamento']) ? intval($_POST['clienteDropdownPagamento']) : null;

    // Prepara a consulta SQL com cláusula WHERE para filtrar por data e, opcionalmente, por cliente
    $sql = "SELECT 
            clientpayments.*, 
            clients.client_name, 
            clients.debit_amount
        FROM clientpayments
        LEFT JOIN clients ON clientpayments.client_id = clients.client_id
        WHERE clientpayments.payment_date BETWEEN '$startDateHistorico' AND '$endDateHistorico'";

    // Adiciona a condição do cliente, se fornecido
    if (!is_null($clientId)) {
        $sql .= " AND clientpayments.client_id = $clientId";
    }

    // Adiciona a cláusula ORDER BY para ordenar por data descendente
    $sql .= " ORDER BY clientpayments.payment_date DESC";

    // Executa a consulta
    $result = $conn->query($sql);
    $filteredData = [];

    if ($result) {
        // Processa os resultados
        while ($row = $result->fetch_assoc()) {
            $paymentId = $row['payment_id'];

            // Cria um array para representar o pagamento
            $filteredData[$paymentId] = [
                'payment_id' => $paymentId,
                'payment_date' => $row['payment_date'],
                'type_of_payment' => $row['type_of_payment'],
                'amount' => $row['amount'],
                'saldo_anterior' => $row['saldo_anterior'],
                'saldo_atual' => $row['saldo_atual'],
                'client_name' => $row['client_name'],
                'client_id' => $clientId,
            ];
        }

        // Libera os resultados
        $result->free();

        // Retorna os resultados em formato JSON
        echo json_encode($filteredData);  // Converte array associativo para array numerado
    } else {
        // Retorna um erro em formato JSON
        echo json_encode(['error' => 'Erro na consulta']);
    }
} elseif(isset($_POST['pagamentoData'])) {
    // Decodifica os dados JSON em um array associativo
    $pagamentoData = json_decode($_POST['pagamentoData'], true);

    // Verifica se o array de pagamentoData é um array e se possui elementos
    if (is_array($pagamentoData) && count($pagamentoData) > 0) {
        // Obtém o client_id do primeiro objeto de pagamento
        $clientId = intval($pagamentoData[0]['client_id']);

        // Consulta os dados do cliente com base no ID
        $sqlCliente = "SELECT * FROM clients WHERE client_id = $clientId"; // Corrige o nome da tabela
        $resultCliente = $conn->query($sqlCliente);

        if ($resultCliente) {
            // Verifica se foi encontrado um cliente com o ID fornecido
            if ($rowCliente = $resultCliente->fetch_assoc()) {
                // Combina os dados do cliente e os detalhes do pagamento em um único array
                $result = array('clientData' => $rowCliente, 'paymentDetails' => $pagamentoData);

                // Retorna os dados combinados em formato JSON
                echo json_encode($result);
            } else {
                // Se nenhum cliente for encontrado, retorna um erro em JSON
                echo json_encode(['error' => 'Cliente não encontrado']);
            }
        } else {
            // Se houver um erro na consulta do cliente, retorna um erro em JSON
            echo json_encode(['error' => 'Erro na consulta do cliente: ' . $conn->error]);
        }
    } else {
        // Se não houver dados de pagamento válidos, retorna um erro em JSON
        echo json_encode(['error' => 'Dados de pagamento inválidos']);
    }
} elseif(isset($_POST['vendasData'])) {
    // Decodifica os dados JSON em um array associativo
    $vendasData = json_decode($_POST['vendasData'], true);

    // Verifica se o array de vendasData é um array e se possui elementos
    if (is_array($vendasData) && count($vendasData) > 0) {
        // Obtém o client_id do primeiro objeto de venda
        $clientId = intval($vendasData[key($vendasData)]['client_id']);

        // Consulta os dados do cliente com base no ID
        $sqlCliente = "SELECT * FROM clients WHERE client_id = $clientId"; // Corrige o nome da tabela
        $resultCliente = $conn->query($sqlCliente);

        if ($resultCliente) {
            // Verifica se foi encontrado um cliente com o ID fornecido
            if ($rowCliente = $resultCliente->fetch_assoc()) {
                // Combina os dados do cliente e os detalhes do venda em um único array
                $result = array('clientData' => $rowCliente, 'paymentDetails' => $vendasData);

                // Retorna os dados combinados em formato JSON
                echo json_encode($result);
            } else {
                // Se nenhum cliente for encontrado, retorna um erro em JSON
                echo json_encode(['error' => 'Cliente não encontrado']);
            }
        } else {
            // Se houver um erro na consulta do cliente, retorna um erro em JSON
            echo json_encode(['error' => 'Erro na consulta do cliente: ' . $conn->error]);
        }
    } else {
        // Se não houver dados de venda válidos, retorna um erro em JSON
        echo json_encode(['error' => 'Dados de vendas inválidos']);
    }
}elseif(isset($_POST['extratoFinalData'])) {
    // Decodifica os dados JSON em um array associativo
    $extratoFinalData = json_decode($_POST['extratoFinalData'], true);

    // Verifica se o array de extratoFinalData é um array e se possui elementos
    if (is_array($extratoFinalData) && count($extratoFinalData) > 0) {
        // Obtém o client_id do primeiro objeto de venda
        $clientId = intval($extratoFinalData[0]['client_id']);

        // Consulta os dados do cliente com base no ID
        $sqlCliente = "SELECT * FROM clients WHERE client_id = $clientId"; // Corrige o nome da tabela
        $resultCliente = $conn->query($sqlCliente);

        if ($resultCliente) {
            // Verifica se foi encontrado um cliente com o ID fornecido
            if ($rowCliente = $resultCliente->fetch_assoc()) {
                // Combina os dados do cliente e os detalhes do venda em um único array
                $result = array('clientData' => $rowCliente, 'extratoData' => $extratoFinalData);

                // Retorna os dados combinados em formato JSON
                echo json_encode($result);
            } else {
                // Se nenhum cliente for encontrado, retorna um erro em JSON
                echo json_encode(['error' => 'Cliente não encontrado']);
            }
        } else {
            // Se houver um erro na consulta do cliente, retorna um erro em JSON
            echo json_encode(['error' => 'Erro na consulta do cliente: ' . $conn->error]);
        }
    } else {
        // Se não houver dados de venda válidos, retorna um erro em JSON
        echo json_encode(['error' => 'Dados de extrato final inválidos']);
    }
}

elseif(isset($_POST['logout'])) {
        // Remove todas as variáveis de sessão
        session_unset();

        // Destrói a sessão
        session_destroy();
    
        // Redireciona para a página de login (ou qualquer outra página que desejar)
        header("Location: login.php");
        exit; // Certifique-se de sair após o redirecionamento
} elseif (isset($_POST['client_id_delete'])) {// Check if the client ID is set in the request
    // Get the client ID from the request
    $clientId = $_POST['client_id_delete'];
    $delQuery = "UPDATE clients SET `status` = 'desativado' WHERE client_id = $clientId";
    // Perform the deletion in the database
    //$resultCliente = $conn->query($delQuery);
    if($conn->query($delQuery)){
        // Echo a success message
        $resultadoPositivo = "Cliente deletado com sucesso!";
        echo json_encode(array("mensagemPositiva" => $resultadoPositivo));
    }
    else{
        $mensagemPositiva = "Falha ao deletar cliente.";
        echo json_encode(array("mensagemPositiva" => $resultadoPositivo));
    }
} elseif (isset($_POST['product_id_delete'])) {// Check if the client ID is set in the request
    // Get the client ID from the request
    $productId = $_POST['product_id_delete'];
    $delQuery = "UPDATE products SET `status` = 'desativado' WHERE product_id = $productId;";
    // Perform the deletion in the database
    //$resultCliente = $conn->query($delQuery);
    if($conn->query($delQuery)){
        // Echo a success message
        $resultadoPositivo = "Produto deletado com sucesso!";
        echo json_encode(array("mensagemPositiva" => $resultadoPositivo));
    }
    else{
        $mensagemPositiva = "Falha ao deletar Produto.";
        echo json_encode(array("mensagemPositiva" => $resultadoPositivo));
    }
} else {
    // Return an error for unsupported request method
    //echo json_encode(['error' => 'Unsupported request method']); erro trol
    }
}

function formatPrice($price) {
    // Remove non-numeric characters and convert to float
    $cleanedPrice = preg_replace("/[^0-9,]/", "", $price); // Remove anything that is not a digit or comma
    $floatPrice = floatval(str_replace(',', '.', $cleanedPrice)); // Convert to float, replace comma with dot
    return $floatPrice;
}

?>