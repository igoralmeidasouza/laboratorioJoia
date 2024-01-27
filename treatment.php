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
        $price_type_1 = $_POST['price_type_1'];
        $price_type_2 = $_POST['price_type_2'];
        $price_type_3 = $_POST['price_type_3'];
        $price_type_4 = $_POST['price_type_4'];
        $price_type_5 = $_POST['price_type_5'];
        $price_type_6 = $_POST['price_type_6'];
    
        // Perform the database query to insert the new product
        $sql = "INSERT INTO products (product_name, product_description, price_type_1, price_type_2, price_type_3, price_type_4, price_type_5, price_type_6) 
                VALUES ('$product_name', '$product_description', '$price_type_1', '$price_type_2', '$price_type_3', '$price_type_4', '$price_type_5', '$price_type_6')";
    
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
            // Handle payment update logic
            $client_id_payment = $_POST['client_id_payment'];
            $payment_date = $_POST['payment_date'];
            $amount = $_POST['amount'];
            $type_of_payment = $_POST['type_of_payment'];

            // Retira o "R$" e ajusta as pontuações para o banco de dados ficar no formato de number.
            $formattedValue = str_replace (".", "", $amount);
            $formattedValue = str_replace(",", ".", $formattedValue);
            $formattedValue = substr($formattedValue, 4);

            $conn->begin_transaction();
    
            // Step 1: Update clientpayments
            $sql_payment = "INSERT INTO clientpayments (client_id, payment_date, amount, type_of_payment) 
                            VALUES ('$client_id_payment', '$payment_date', '$formattedValue', '$type_of_payment')";
            $conn->query($sql_payment);
    
            // Step 2: Deduct payment amount from client's debit_amount in clients table
            $sql_discount_debit = "UPDATE clients SET debit_amount = debit_amount - '$formattedValue' WHERE client_id = '$client_id_payment'";
            $conn->query($sql_discount_debit);
    
            // Commit the transaction
            $conn->commit();
    
            //echo "Payment updated successfully";
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
            // Handle other cases or show an error
            // echo "Invalid request";
            $resultadoNegativo = "Requisição invalida.";
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

    }elseif (isset($_POST['carrinhoValores'])) {
        // Retrieve data from the POST request
        $data = json_decode($_POST['carrinhoValores'], true);
        
        // Extract variables from the data
        $selectedClient = $data['client'];
        $selectedProduct = $data['product'];
        $quantity = $data['quantity'];
        $selectedPaciente = $data['paciente'];
        $total = $data['total'];
        $cartItems = $data['cart'];

        // Agora você pode usar $selectedClient, $selectedProduct, $quantity,
        // $selectedPaciente, $total e $cartItems em sua lógica
        // ...

        // Exemplo: Adicionar dados à tabela de histórico de vendas (saleshistory)
        $insertHistoryQuery = "INSERT INTO saleshistory (client_id, sale_date, total_amount) VALUES ($selectedClient, NOW(), $total)";
        $conn->query($insertHistoryQuery);
        $saleId = $conn->insert_id;

        // Iterar sobre os itens do carrinho e adicionar à tabela de detalhes de vendas (salesdetails)
        foreach ($cartItems as $cartItem) {
            $productId = $cartItem['product'];
            $itemQuantity = $cartItem['quantity'];
            $itemTotal = $cartItem['total'];

            $insertDetailsQuery = "INSERT INTO salesdetails (sale_id, product_id, quantity, price, observation) VALUES ($saleId, $productId, $itemQuantity, $itemTotal, '$selectedPaciente')";
            $conn->query($insertDetailsQuery);
        }

        // Atualizar o débito do cliente na tabela de clientes (clients)
        $updateClientQuery = "UPDATE clients SET debit_amount = debit_amount + $total WHERE client_id = $selectedClient";
        $conn->query($updateClientQuery);
        /*
        // Adicionar o pagamento do cliente à tabela de pagamentos (clientpayments)
        $insertPaymentQuery = "INSERT INTO clientpayments (client_id, payment_date, amount, type_of_payment) VALUES ($selectedClient, NOW(), $total, 'Sale Payment')";
        $conn->query($insertPaymentQuery);
        */
        // Exemplo: Responder com uma mensagem de sucesso
        echo json_encode(['success' => true]);
        } else {
            // Return an error for unknown request
            echo json_encode(['error' => 'Invalid request']);
        }
    } else {
        // Return an error for unsupported request method
        //echo json_encode(['error' => 'Unsupported request method']); erro trol
    }
    
    // Close the database connection
    $conn->close();

?>