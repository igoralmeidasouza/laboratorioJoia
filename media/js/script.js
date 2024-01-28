let cartItems = [];

/* menu lateral - vinculação dos botões para abrir as pagians (divs) */
document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-item');
    const vitrineDivs = document.querySelectorAll('.bemVindo > .vitrine');
    const subBotoes = document.querySelectorAll('.subBotao');

    menuItems.forEach((item, index) => {
        item.addEventListener('click', function (event) {
            if (event.target.closest('.subBotao')) {
                return; // Ignorar cliques nos subBotoes
            }

            // Remover a classe 'ativa' de todas as li
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('ativa');
            });

            // Remover a classe 'ativa' de todas as divs
            vitrineDivs.forEach(div => {
                div.classList.remove('ativa');
                div.classList.add('desativada');
            });

            // Adicionar a classe 'ativa' à li clicada
            this.classList.add('ativa');

            // Encontrar a div correspondente pelo data-target
            const targetDivClass = this.dataset.target;
            const targetDiv = document.querySelector(`.${targetDivClass}`);

            // Adicionar a classe 'ativa' à div correspondente
            if (targetDiv) {
                targetDiv.classList.add('ativa');
                targetDiv.classList.remove('desativada');
            }
        });
    });

    // Adicionar evento para tratar os subBotoes
    subBotoes.forEach(subBotao => {
        subBotao.addEventListener('click', function (event) {
            event.stopPropagation(); // Impedir que o clique propague para a li acima

            const targetDivClass = this.dataset.target;
            const targetDiv = document.querySelector(`.${targetDivClass}`);

            // Remover a classe 'ativa' de todas as divs
            vitrineDivs.forEach(div => {
                div.classList.remove('ativa');
                div.classList.add('desativada');
            });

            // Adicionar a classe 'ativa' à div correspondente aos subBotoes
            if (targetDiv) {
                targetDiv.classList.add('ativa');
                targetDiv.classList.remove('desativada');
            }
        });
    });
});



/* formatação de cpf/cnpj - telefone - saldo devedor */
document.addEventListener("DOMContentLoaded", function() {
    // Função para formatar CPF/CNPJ
    function formatarCpfCnpj(input) {
        const value = input.value.replace(/\D/g, '');

        if (value.length <= 11) {
            input.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else {
            input.value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
    }

    // Função para formatar número de telefone
    function formatarNumeroTelefone(input) {
        const value = input.value.replace(/\D/g, '');
    
        if (value.length === 11) {
            input.value = value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
        } else if (value.length === 10) {
            input.value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
    }

    // Função para formatar CEP
    function formatarCEP(input) {
        const value = input.value.replace(/\D/g, '');

        input.value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    // Função para formatar saldo devedor
    function formatarSaldoDevedor(input) {
        const value = input.value.replace(/\D/g, '');
        
        // Formatação com separador de milhar e duas casas decimais
        const formattedValue = parseFloat(value / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    input.value = formattedValue; 
    }

    // Adiciona eventos aos campos
    document.getElementById('cpf_cnpj').addEventListener('input', function() {
        formatarCpfCnpj(this);
    });

    document.getElementById('phone').addEventListener('input', function() {
        formatarNumeroTelefone(this);
    });

    document.getElementById('zipcode').addEventListener('input', function() {
        formatarCEP(this);
    });

    document.getElementById('debit_amount').addEventListener('input', function() {
        formatarSaldoDevedor(this);
    });

    document.getElementById('amount').addEventListener('input', function() {
        formatarSaldoDevedor(this);
    });

    function adicionarEventoInputParaFormatarSaldoDevedor(id) {
        document.getElementById(id).addEventListener('input', function() {
            formatarSaldoDevedor(this);
        });
    }
    for (let i = 1; i <= 6; i++) {
        adicionarEventoInputParaFormatarSaldoDevedor('price_type_' + i);
    }
});


/* janela de notificação do php  */
document.addEventListener('DOMContentLoaded', function () {
    var mensagemPositivaDiv = document.getElementById('mensagemPositiva');
    var mensagemNegativaDiv = document.getElementById('mensagemNegativa');

    if (mensagemPositivaDiv.innerHTML !== '') {
        mensagemPositivaDiv.style.opacity = '1';
        mensagemPositivaDiv.style.visibility = 'visible';

        setTimeout(function () {
            mensagemPositivaDiv.style.opacity = '0';
            mensagemPositivaDiv.style.visibility = 'hidden';
        }, 5000); // 5 segundos 
    }

    if (mensagemNegativaDiv.innerHTML !== '') {
        mensagemNegativaDiv.style.opacity = '1';
        mensagemNegativaDiv.style.visibility = 'visible';

        setTimeout(function () {
            mensagemNegativaDiv.style.opacity = '0';
            mensagemNegativaDiv.style.visibility = 'hidden';
        }, 5000); // 5 segundos 
    }
/*
    if (mensagemNegativaDiv.innerHTML !== '' || mensagemPositivaDiv.innerHTML !== ''){
        setTimeout(function() {
            window.location.href = "index.php";
        }, 6000); 
    } */
});

// Pegar o valor no BANCO DE DADOS.
$(document).ready(function() {
    // Function to update displayed debt based on selected client
    function updateDebt() {
        var clientId = $("#client_id_payment").val();

        // Check if a client is selected
        if (clientId !== "") {
            // Fetch client's debt using AJAX
            $.ajax({
                url: "checarDebito.php",
                type: "POST",
                data: { client_id: clientId },
                success: function(response) {
                    $("#current_debt").text(response);
                }
            });
        } else {
            // If no client is selected, display "N/A"
            $("#current_debt").text("N/A");
        }
    }

    // Bind the updateDebt function to the change event of the client dropdown
    $("#client_id_payment").change(function() {
        updateDebt();
    });

    // Initialize debt display on page load
    updateDebt();
});

//Codigo auxiliar para atualizar os preços na aba de vendas
// Function to update price dropdown based on selected product
function updatePriceDropdown() {
    var productId = $("#product_id").val();

    // Check if a product is selected
    if (productId !== "") {
        // Fetch product prices using AJAX
        $.ajax({
            url: "checarPrecosProdutos.php",
            type: "POST",
            data: { product_id: selectedProductId }, // Use the correct variable holding the selected product ID
            success: function(response) {
                // Parse the JSON response
                console.log('Response:', response);
                var prices = JSON.parse(response);

                // Clear previous options
                $("#price_type").empty();

                // Populate price dropdown with new options
                for (var i = 0; i < prices.length; i++) {
                    $("#price_type").append('<option value="' + prices[i] + '">' + prices[i] + '</option>');
                }
            }
        });
    } else {
        // If no product is selected, clear the price dropdown
        $("#price_type").empty();
    }
}

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
            document.getElementById("clientDropdown").innerHTML = xhr.responseText;
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
    let cartHTML = "<div class="+'headerTabela'+"><h3>Conteudo do carrinho</h3>";
    cartHTML += "<button type="+'button'+" onclick="+'clearCart()'+"><em>X </em>Limpar Carrinho</button></div>";

    if (cartItems.length > 0) {
        cartHTML += "<table><tr><th>Cliente</th><th>Produto</th><th>Produto (u)</th><th>Qt.</th><th>Paciente</th><th>Preço Total</th><th></th></tr>";
        for (let i = 0; i < cartItems.length; i++) {
            let item = cartItems[i];
            let total1 = item.total;
            let tott = total1.toFixed(2).replace(/\./g, ','); // Convertendo para string com vírgula
                
            cartHTML += "<span data-client='" + item.client +
                        "' data-product='" + item.product +
                        "' data-quantity='" + item.quantity +
                        "' data-paciente='" + item.paciente +
                        "' data-total='" + tott + "'>" +
                        "<tr><td>" + item.clientName + "</td>" +
                        "<td>" + item.productName + "</td>" +
                        "<td> R$ " + item.price + "</td>" +
                        "<td>" + item.quantity + "</td>" +
                        "<td>" + item.paciente + "</td>" +
                        "<td> R$ " + tott + "</td>" + 
                        "<td><button onclick=\"removeCartItem(" + i + ")\"><em>X </em>Remover</button></span></td></tr>";
        }
        cartHTML += "</table>";

        let totalValue = cartItems.reduce(function (sum, item) {
            return sum + item.total;
        }, 0);

        let totalValueString = totalValue.toFixed(2).replace(/\./g, ','); // Convertendo para string com vírgula
        cartHTML += "<span class="+'valorTotal'+"><em>Total da compra:</em> R$ " + totalValueString + "</span>";
    } else {
        cartHTML += "<span>Your cart is empty.</span>";
    }
    cartHTML += "<button class="+'botaoVendas'+" type="+'button'+" onclick="+'executeSale()'+">Finalizar Pedido</button>";
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
        total: totalValue,
        cart: cartItems
        // Adicione outros dados do formulário conforme necessário
    };
    console.log(formData);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    console.log(xhr.responseText);
                    let response = JSON.parse(xhr.responseText);

                    if (response.success) {
                        // Chamar a função para abrir uma nova guia com o extrato
                        openInvoiceTab(response.data);
                    } else {
                        alert("Erro ao processar a venda: " + response.error);
                    }
                } catch (error) {
                    console.error('Erro ao fazer parse da resposta JSON', error);
                }
            } else {
                alert("Erro na solicitação. Status: " + xhr.status);
            }
        }
    };

    xhr.open("POST", "treatment.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("carrinhoValores=" + JSON.stringify(formData));
}

function openInvoiceTab(data) {
    console.log(data);
    // Cria um objeto Date para obter a data atual
    let dataAtual = new Date();

    // Formata a data no formato desejado
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dataFormatada = dataAtual.toLocaleDateString('pt-BR', options);
    // Construir o HTML com os dados do extrato
    let nomeCliente = data.cart[0].clientName; 
    //let nomePaciente = item.paciente;
    let totalValue = data.total;
    let totalValueString = totalValue.toFixed(2).replace(/\./g, ','); // Convertendo para string com vírgula
    let itemsHTML = "<tr><th>Produto</th><th>Produto (u)</th><th>Qt.</th><th>Preço Total</th><th></th></tr>";
    itemsHTML += data.cart.map(item => `
            <tr>
                <td> ${item.productName}</td>
                <td R$ >${item.price}</td>
                <td>${item.quantity}</td>
                <td> R$ ${item.total.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
        <!--<hr>-->
    `).join('');

    let invoiceHTML = `
            <html>
            <head>
                <title>Extrato de Compra</title>
                <link rel="stylesheet" href="media/css/estilos.css">
            </head>
            <body>
            <header>
                <div class="logoMarca">
                    <figure>
                        <img src="media/img/denteJoia.png" alt="">
                    </figure>
                    <div class="logoTipo">
                        <h1>L.J. - Laboratório de <em>Prótese Dentária Joia</em></h1>
                        <address>
                            <p>RUA VICENTE PEREIRA DE ASSUNÇÃO, 134 | CEP - 04658000 - VL CONTÂNCIA</p>
                            <p>CONTATO: (11) 99836-17314 (11) 94945-2727</p>
                        </address>
                    </div>
                </div>
            </header>
                <main>
                    <div class="impressaoContainer">
                        <div class="impressaoTabela">
                            <p>Resumo do Pedido:</p>
                            <div class="">
                                <span>Cliente: ${nomeCliente}</span>
                                <span>Paciênte: ${data.paciente}</span>
                            </div>
                            <table>
                                ${itemsHTML}
                            </table>
                            <span>Total do pedido: R$ ${totalValueString}</span>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    `;

    // Abrir uma nova guia com o extrato
    let invoiceWindow = window.open('', '_blank');

    // Verificar se a janela foi aberta com sucesso
    if (invoiceWindow) {
        invoiceWindow.document.write(invoiceHTML);
        invoiceWindow.document.close();
        clearCart()
        /*
        // Fechar a janela após algum tempo (por exemplo, 5 segundos)
        setTimeout(function () {
            invoiceWindow.close();
        }, 5000);  // 5000 milissegundos = 5 segundos
        */
    } else {
        // Lidar com o caso em que a janela não foi aberta
        console.error('Falha ao Abrir Nova Janela, verificar se operação foi feita na aba de historico');
    }
}

function clearCart() {
    // Limpa o array de itens do carrinho
    cartItems = [];

    // Atualiza a exibição do carrinho
    updateCartDisplay();
}
function getFilteredData() {
    // Chama a função para obter a lista de clientes
    
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let selectedClient = document.getElementById("clientDropdown").value;

    // Crie um objeto FormData para enviar os dados
    let formData = new FormData();
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('client', selectedClient);

    // Crie uma instância XMLHttpRequest
    let xhr = new XMLHttpRequest();

    // Defina a função de retorno de chamada para processar a resposta
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Trate a resposta, se necessário
                let response = JSON.parse(xhr.responseText);

                if (response.error) {
                    // Trate o erro, se houver
                    console.error('Erro na consulta: ' + response.error);
                } else {
                    // Exiba os dados filtrados (você pode ter uma função separada para isso)
                    displayFilteredData(response);
                }
            } else {
                // Trate o erro de solicitação
                console.error('Erro na solicitação. Status: ' + xhr.status);
            }
        }
    };

    // Abra a conexão e envie a solicitação para o arquivo PHP
    xhr.open("POST", "treatment.php", true);
    xhr.send(formData);
}

function updateFilteredData(data) {
    // Ajuste esta função para atualizar a sua página com os resultados
    let outputDiv = document.getElementById("filteredData");
    outputDiv.innerHTML = "<h3>Resultados da Consulta</h3>";

    if (data && data.length > 0) {
        // Exemplo: Exibindo os resultados em uma tabela
        let tableHTML = "<table><thead><tr><th>ID</th><th>Data</th><th>Total</th></tr></thead><tbody>";

        data.forEach(function(row) {
            tableHTML += "<tr><td>" + row.sale_id + "</td><td>" + row.sale_date + "</td><td>" + row.total_amount + "</td></tr>";
        });

        tableHTML += "</tbody></table>";
        outputDiv.innerHTML += tableHTML;
    } else {
        outputDiv.innerHTML += "<p>Nenhum resultado encontrado.</p>";
    }
}

function displayFilteredData(data) {
    // Implement your logic to display the data in the HTML
    // For example, you can update the content of a div with the id "filteredData"
    document.getElementById("filteredData").innerHTML = JSON.stringify(data);
}

function displayCowsay() {
    let cowsayResponse = `
_________________
< e o emprego la? >
-----------------
\\   ^__^
 \\  (oo)\\_______
    (__)\\       )\\/\\
        ||----w |
        ||     ||
    `;

    // Print Cowsay response to console
    console.log(cowsayResponse);
}

// Call the function to display Cowsay response in console
displayCowsay();