<?php
include 'dbConnection.php'; // Conexão com o banco de dados


// Verifique se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {


    /* Cadastrar cliente */
    if (isset($_POST['cadastrar_clientes'])) {
    
        // Colete os dados do formulário
        $client_name = $_POST['client_name'];
        $client_email = $_POST['client_email'];
        $cpf_cnpj = $_POST['cpf_cnpj'];
        $address = $_POST['address'];
        $number = $_POST['number'];
        $neighborhood = $_POST['neighborhood'];
        $city = $_POST['city'];
        $zipcode = $_POST['zipcode'];
        $debit_amount = $_POST['debit_amount'];

        // Execute a consulta ao banco de dados para inserir o novo cliente
        $sql = "INSERT INTO clients (client_name, client_email, cpf_cnpj, address, number, neighborhood, city, zipcode, debit_amount) 
                VALUES ('$client_name', '$client_email', '$cpf_cnpj', '$address', '$number', '$neighborhood', '$city', '$zipcode', '$debit_amount')";

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
}


?>