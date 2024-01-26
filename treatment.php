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
        $formattedValue1 = substr($debit_amount, 3);
        $debit_amount = str_replace(",", ".", $formattedValue1);

        // Execute a consulta ao banco de dados para inserir o novo cliente
        $sql = "INSERT INTO clients (client_name, client_email, phone, cpf_cnpj, address, number, complement, neighborhood, city, zipcode, debit_amount) 
                VALUES ('$client_name', '$client_email', '$telefone', '$cpf_cnpj', '$address', '$number', '$complemento', '$neighborhood', '$city', '$zipcode', '$debit_amount')";

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

            $formattedValue = substr($amount, 4);
            $formattedValue = str_replace(",", ".", $formattedValue);

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
    
}
?>




