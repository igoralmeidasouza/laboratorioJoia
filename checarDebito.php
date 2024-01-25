<?php
include 'dbConnection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $client_id = $_POST['client_id'];

    // Fetch client's debt from the database
    $result = $conn->query("SELECT debit_amount FROM clients WHERE client_id = '$client_id'");

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo $row['debit_amount'];
    } else {
        echo "N/A";
    }
}

// Close the database connection
$conn->close();
?>
