<?php
    include 'dbConnection.php'; // Conexão com o banco de dados
    
    // Consulta os produtos
    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);

    // Verifica se a consulta retornou resultados
    if ($result->num_rows > 0) {
        // Exibe os dados em uma tabela
        echo "<table border='1'>";
        echo "<tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Preço 1</th><th>Preço 2</th><th>Preço 3</th><th>Preço 4</th><th>Preço 5</th><th>Preço 6</th></tr>";

        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row["product_id"] . "</td>";
            echo "<td>" . $row["product_name"] . "</td>";
            echo "<td>" . $row["product_description"] . "</td>";
            echo "<td>" . $row["price_type_1"] . "</td>";
            echo "<td>" . $row["price_type_2"] . "</td>";
            echo "<td>" . $row["price_type_3"] . "</td>";
            echo "<td>" . $row["price_type_4"] . "</td>";
            echo "<td>" . $row["price_type_5"] . "</td>";
            echo "<td>" . $row["price_type_6"] . "</td>";
            echo "</tr>";
        }

        echo "</table>";
    } else {
        echo "Nenhum produto encontrado.";
    }
?>