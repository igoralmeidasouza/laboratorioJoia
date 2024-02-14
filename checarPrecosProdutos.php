<?php
include 'dbConnection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if 'product_id' is set in the POST data
    $product_id = isset($_POST['product_id']) ? $_POST['product_id'] : null;

    if ($product_id !== null) {
        // Fetch product prices from the database based on the correct columns
        $result = $conn->query("SELECT price_type_1, price_type_2, price_type_3, price_type_4, price_type_5, price_type_6 FROM products WHERE product_id = '$product_id' AND status = 'ativado'");
        echo "TRUE1";
        if ($result !== false) {
            $row = $result->fetch_assoc();

            // Convert the prices to JSON format
            $jsonResponse = json_encode(array_values($row));

            // Set the correct Content-Type header
            header('Content-Type: application/json');

            // Output the JSON response
            echo $jsonResponse;
        } else {
            // Handle the database query error
            echo json_encode([]);
        }
    } else {
        // Handle the case where 'product_id' is not set
        echo json_encode([]);
    }
}

// Close the database connection
$conn->close();
?>
