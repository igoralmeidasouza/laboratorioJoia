<?php
include 'dbConnection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $client_id = $_POST['client_id'];

    // Fetch client's debt from the database
    $result = $conn->query("SELECT debit_amount FROM clients WHERE client_id = '$client_id'");

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "R$ ".$row['debit_amount'];
    } else {
        echo "N/A";
    }
}

// Close the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $productId = $_POST['product_id'];

    // Fetch product prices from the database
    $result = $conn->query("SELECT price_type_1, price_type_2, price_type_3, price_type_4, price_type_5, price_type_6 FROM products WHERE product_id = '$productId'");

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Convert the prices to JSON format
        echo json_encode(array_values($row));
    } else {
        echo "[]"; // Return an empty array if no prices are found
    }
}

// Close the database connection
$conn->close();

?>
