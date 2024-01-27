let cartItems = [];

function controleCarrinho(){
    getClients();
    getProducts();
}

function getClients() {
    // Make an Ajax request to get client options
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Update the client dropdown with options
            document.getElementById("client").innerHTML = xhr.responseText;
        }
    };
    xhr.open("POST", "treatment.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("get_clients=true");
}
function getProducts() {
    // Make an Ajax request to get product options
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Update the product dropdown with options
            document.getElementById("product").innerHTML = xhr.responseText;

            // After populating the products, get details for the default product (if any)
            getProductDetails();
        }
    };
    xhr.open("POST", "treatment.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("get_products=true");
}

function getProductDetails() {
    let selectedProduct = document.getElementById("product").value;

    // Make an Ajax request to get details for the selected product
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Update the price dropdown with the received prices
            document.getElementById("price").innerHTML = xhr.responseText;
        }
    };
    xhr.open("POST", "treatment.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("treatment=true&product=" + selectedProduct);
}
function addToCart() {
    let selectedClient = document.getElementById("client");
    let selectedProduct = document.getElementById("product");
    let selectedPrice = parseFloat(document.getElementById("price").value);
    let quantity = parseInt(document.getElementById("quantity").value);
    let selectedPaciente = document.getElementById("paciente").value;

    // Ensure you have selected options
    if (selectedClient.value && selectedProduct.value && selectedPrice && selectedPaciente) {
        // Get the names and IDs
        let clientName = selectedClient.options[selectedClient.selectedIndex].text;
        let clientId = selectedClient.value;
        let productName = selectedProduct.options[selectedProduct.selectedIndex].text;
        let productId = selectedProduct.value;

        // Advertise the item to the cart
        let cartItem = {
            client: clientId,
            clientName: clientName,
            product: productId,
            productName: productName,
            price: selectedPrice,
            quantity: quantity,
            paciente: selectedPaciente,
            total: selectedPrice * quantity
        };

        cartItems.push(cartItem);

        // Update the cart display
        updateCartDisplay();
    } else {
        alert("Please select a client, product, and price before adding to cart.");
    }
}
function removeCartItem(index, event) {
    // Remova o item do carrinho com base no índice
    cartItems.splice(index, 1);

    // Atualize a exibição do carrinho
    updateCartDisplay();

    // Acesse os atributos data do elemento pai (<p>) para obter os dados
    let dataClient = event.currentTarget.parentNode.getAttribute('data-client');
    let dataProduct = event.currentTarget.parentNode.getAttribute('data-product');
    let dataQuantity = event.currentTarget.parentNode.getAttribute('data-quantity');
    let dataPaciente = event.currentTarget.parentNode.getAttribute('data-paciente');
    let dataTotal = event.currentTarget.parentNode.getAttribute('data-total');

    // Use os dados conforme necessário (por exemplo, para a lógica de venda)
    console.log("Data Client:", dataClient);
    console.log("Data Product:", dataProduct);
    console.log("Data Quantity:", dataQuantity);
    console.log("Data Paciente:", dataPaciente);
    console.log("Data Total:", dataTotal);
}

function updateCartDisplay() {
    let cartDisplay = document.getElementById("cartDisplay");
    let cartHTML = "<h3>Cart Contents:</h3>";

    if (cartItems.length > 0) {
        for (let i = 0; i < cartItems.length; i++) {
            let item = cartItems[i];
            let total1 = item.total;
            let tott = total1.toFixed(2).replace(/\./g, ','); // Convertendo para string com vírgula

            cartHTML += "<p data-client='" + item.client +
                        "' data-product='" + item.product +
                        "' data-quantity='" + item.quantity +
                        "' data-paciente='" + item.paciente +
                        "' data-total='" + tott + "'>" +
                        "<strong>Client:</strong> " + item.clientName +
                        " | <strong>Product:</strong> " + item.productName +
                        " | <strong>Quantity:</strong> " + item.quantity +
                        " | <strong>Paciente:</strong> " + item.paciente +
                        " | <strong>Total:</strong> R$ " + tott +
                        " | <button onclick=\"removeCartItem(" + i + ")\">Remove</button></p>";
        }

        let totalValue = cartItems.reduce(function (sum, item) {
            return sum + item.total;
        }, 0);

        let totalValueString = totalValue.toFixed(2).replace(/\./g, ','); // Convertendo para string com vírgula
        cartHTML += "<p><strong>Total Cart Value:</strong> R$ " + totalValueString + "</p>";
    } else {
        cartHTML += "<p>Your cart is empty.</p>";
    }

    cartDisplay.innerHTML = cartHTML;
}

function executeSale() {
    let selectedClient = document.getElementById("client").value;
    let selectedProduct = document.getElementById("product").value;
    let quantity = document.getElementById("quantity").value;
    let selectedPaciente = document.getElementById("paciente").value;

    // Calcula o valor total
    let totalValue = cartItems.reduce(function (sum, item) {
        return sum + item.total;
    }, 0);

    let formData = {
        client: selectedClient,
        product: selectedProduct,
        quantity: quantity,
        paciente: selectedPaciente,
        total: totalValue,  // Adicione esta linha
        cart: cartItems
        // Adicione outros dados do formulário conforme necessário
    };

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Trate a resposta, se necessário
            let response = xhr.responseText;
            // Exemplo: Exiba uma mensagem de sucesso
            alert(response);
        }
    };
    xhr.open("POST", "treatment.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("carrinhoValores=" + JSON.stringify(formData));
}
