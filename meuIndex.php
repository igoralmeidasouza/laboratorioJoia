<!DOCTYPE html>
<html lang="en"style="background-color:grey!important">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="script.js"></script>
    <title>Carrinho</title>
</head>

<body>
    <!-- Your HTML form -->
<li onclick="controleCarrinho()">butao</li>
<form id="salesForm">
    <!-- Client Dropdown -->
    <label for="client">Select Client:</label>
    <select id="client" name="client">
        <!-- Clients will be displayed here -->
    </select>
    <!-- Product Dropdown -->
    <label for="product">Select Product:</label>
    <select id="product" name="product" onchange="getProductDetails()">
        <!-- Populate this dynamically with product options -->
    </select>
    
    <!-- Price Dropdown -->
    <label for="price">Select Price:</label>
    <select id="price" name="price" >
        <!-- Prices will be displayed here onchange="updatePriceDisplay()"-->
    </select>
    
    <!-- Quantity Input -->
    <label for="quantity">Quantity:</label>
    <input type="number" id="quantity" name="quantity" value="1" min="1">
    
    <!-- Paciente (Patient) Input -->
    <label for="paciente">Paciente:</label>
    <input type="text" id="paciente" name="paciente">


    <!-- Add to Cart Button -->
    <button type="button" onclick="addToCart()">Add to Cart</button>

    <!-- Display Area for Cart Contents -->
    <div id="cartDisplay">
        <!-- Cart contents will be displayed here -->
    </div>
    
    <!-- Botão para executar a venda -->
    <button type="button" onclick="executeSale()">Execute Sale</button>
</form>

</body>
</html>




