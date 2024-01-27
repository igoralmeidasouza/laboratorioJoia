<?php
// Include your database connection logic here
include 'dbConnection.php';
//esse if $_server pode ignorar
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handling POST request for getting client options
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



