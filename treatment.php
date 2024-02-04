<?php
include 'dbConnection.php'; // Conexão com o banco de dados



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

        // Execute a consulta ao banco de dados para inserir o novo cliente
        $sql = "INSERT INTO clients (client_name, client_email, phone, cpf_cnpj, address, number, complement, neighborhood, city, zipcode, debit_amount) 
                VALUES ('$client_name', '$client_email', '$telefone', '$cpf_cnpj', '$address', '$number', '$complemento', '$neighborhood', '$city', '$zipcode', '$formattedValue1')";

        if ($conn->query($sql) === TRUE) {
        $resultadoPositivo = "Cliente adicionado com sucesso!";
        } 
        else {
            $resultadoNegativo = "Error: " . $sql . "<br>" . $conn->error;
        }
    // Close the database connection
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
            $resultadoPositivo = "Produto cadastrado com sucesso!";
        } 
        else {
            $resultadoNegativo = "Error: " . $sql . "<br>" . $conn->error;
        }
    // Close the database connection
    $conn->close();

    }

    // Débito pendete
    elseif (isset($_POST['paymentform'])) {
        // Check for the specific action based on the provided key
        if (isset($_POST['update_payment'])) {
            $client_id_payment = $_POST['client_id_payment'];
            $payment_date = $_POST['payment_date'];
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
                            VALUES ('$client_id_payment', '$payment_date', '$formattedValue', '$type_of_payment', '$saldo_anterior', '$saldo_atual')";
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
        $clientQuery = "SELECT client_id, client_name FROM clients";
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
        $productQuery = "SELECT product_id, product_name FROM products";
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
                    echo json_encode(['success' => 'Dados do cliente atualizados com sucesso']);
                } else {
                    // Se houver um erro na atualização, envie uma mensagem de erro
                    echo json_encode(['error' => 'Erro na atualização dos dados do cliente']);
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
        $priceType1 = isset($_POST['priceType1']) ? $_POST['priceType1'] : '';
        $priceType2 = isset($_POST['priceType2']) ? $_POST['priceType2'] : '';
        $priceType3 = isset($_POST['priceType3']) ? $_POST['priceType3'] : '';
        $priceType4 = isset($_POST['priceType4']) ? $_POST['priceType4'] : '';
        $priceType5 = isset($_POST['priceType5']) ? $_POST['priceType5'] : '';
        $priceType6 = isset($_POST['priceType6']) ? $_POST['priceType6'] : '';

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
            echo json_encode(['success' => true, 'message' => 'Produto atualizado com sucesso']);
        } else {
            echo json_encode(['error' => 'Erro na atualização do produto']);
        }
    } else {
        echo json_encode(['error' => 'ID do produto não fornecido']);
    }
}else {
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





// Close the database connection
//$conn->close();

?>