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
            document.getElementById("clientDropdownHistory").innerHTML = xhr.responseText;
            document.getElementById("clientDropdownAtualizar").innerHTML = xhr.responseText;

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
            document.getElementById("productDropdown").innerHTML = xhr.responseText;

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
    let cartHTML = "<div class="+'headerTabela'+"><h3>Conteúdo do Carrinho</h3>";
    cartHTML += "<button type="+'button'+" onclick="+'clearCart()'+"><em>X </em>Limpar Carrinho</button></div>";

    if (cartItems.length > 0) {
        cartHTML += "<table class="+'tabelaVenda'+"><tr><th>Cliente</th><th>Produto</th><th>Produto (u)</th><th>Qt.</th><th>Paciente</th><th>Preço Total</th><th></th></tr>";
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
        cartHTML += "<span>Seu carrinho está vazio.</span>";
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
    let options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
    let dataFormatada = dataAtual.toLocaleDateString('pt-BR', options);
    // Construir o HTML com os dados do extrato
    let nomeCliente = data.cart[0].clientName; 
    let saldoDevedorClient =  data.clientData.debit_amount;
    let emailClient = data.clientData.client_email;
    let contatoClient = data.clientData.phone;

    //let nomePaciente = item.paciente;
    let totalValue = data.total;
    let saldoAnterior = saldoDevedorClient - totalValue;
    let totalValueString = totalValue.toFixed(2).replace(/\./g, ','); // Convertendo para string com vírgula
    let itemsHTML = "<tr><th>Produto</th><th>Produto (u)</th><th>Qt.</th><th>Preço Total</th></tr>";
    itemsHTML += data.cart.map(item => `
            <tr>
                <td> ${item.productName}</td>
                <td> R$ ${item.price}</td>
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
                        <div class="dadosVenda">
                            <p>Resumo do Pedido: #${data.lastSaleId}</p>
                            <p>Data: ${dataFormatada}</p>
                        </div>

                        <div class="dadosContainer">
                            <span>Cliente: ${nomeCliente}</span>
                            <span>E-mail: ${emailClient}</span>
                            <span>Contato: ${contatoClient}</span>
                        </div>
                        <span class="pacienteContainer">Paciênte: ${data.paciente}</span>
                        
                        <table class="tabelaExtrato">
                            ${itemsHTML}
                        </table>

                        <div class="saldoClientContainer">
                            <span>Total do Pedido: <em>R$ ${totalValueString}</em></span>
                            <span> Saldo Devedor Anterior: <em>R$ ${saldoAnterior.toFixed(2)}</em></span>
                            <span> Saldo Devedor Atual: <em>R$ ${saldoDevedorClient}</em></span>
                        </div>
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
    //let validadorFormulario = "1";


    // Crie um objeto FormData para enviar os dados
    let formData = new FormData();
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('client', selectedClient);
    //formData.append('formType', validadorFormulario);
    //formData.append();

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
                    //displayFilteredData(response); esse está sem utilização no momento
                    updateFilteredData(response);
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
    // Converte o objeto data em uma array
    //let dataArray = Object.values(data);
    console.log(data);
    // Inicializa a string HTML da tabela
    let tableHTML = "<table><thead><tr><th>ID</th><th>Data</th><th>Observação</th><th>Produtos</th><th>Preço (U)</th><th>Total</th><th>Saldo Anterior</th><th>Saldo Atual</th></tr></thead><tbody>";

    // Cria um objeto para rastrear pedidos agrupados por sale_id
    let groupedOrders = {};

    // Loop através dos dados e agrupa os pedidos pelo sale_id
    for (let key in data) {
        if (data.hasOwnProperty(key) && typeof data[key] === 'object' && data[key].length === undefined) {
            const saleId = data[key].sale_id;

            // Se o sale_id já existir no objeto, adiciona o produto ao array existente
            if (groupedOrders.hasOwnProperty(saleId)) {
                groupedOrders[saleId].products.push({
                    product_name: data[key].product_name,
                    price: data[key].price,
                    quantity: data[key].quantity,
                });
            } else {
                // Se o sale_id não existir, cria uma nova entrada no objeto
                groupedOrders[saleId] = {
                    sale_id: data[key].sale_id,
                    sale_date: data[key].sale_date,
                    observation: data[key].observation,
                    products: [{
                        product_name: data[key].product_name,
                        price: data[key].price,
                        quantity: data[key].quantity,
                    }],
                    total_amount: data[key].total_amount,
                    saldo_anterior: data[key].saldo_anterior,
                    debito: data[key].debito,
                };
            }
        }
    }


    // Mescla os arrays de pagamentos e vendas
    let allRecords = [...data.payments, ...Object.values(groupedOrders)];

    // Ordena todos os registros (pedidos e pagamentos) por data em ordem decrescente
    allRecords.sort((a, b) => new Date(a.sale_date || a.payment_date) - new Date(b.sale_date || b.payment_date));

    // Loop através dos registros e adiciona as linhas à tabela
    for (let i = 0; i < allRecords.length; i++) {
        console.log("entra no for loop");
        let record = allRecords[i];

        // Formata a data do registro de acordo com o formato local 'pt-BR'
        let formattedRecordDate = new Date(record.sale_date || record.payment_date).toLocaleDateString('pt-BR');

        // Adiciona uma nova linha à tabela
        tableHTML += "<tr>";
        tableHTML += "<td>" + (record.sale_id || record.payment_id) + "</td>";
        tableHTML += "<td>" + formattedRecordDate + "</td>";

        if (record.payment_id !== undefined) {
            // Se for um pagamento
            console.log("indefinido, loop de pagamento pagamento");
            tableHTML += "<td>Pagamento via: " + record.type_of_payment + "</td>";
            tableHTML += "<td></td>";  // Coluna 'Produtos' vazia para pagamento
            tableHTML += "<td></td>";  // Coluna 'Preço (U)' vazia para pagamento
            tableHTML += "<td> R$ " + record.amount + "</td>";
            tableHTML += "<td> R$ " + record.saldo_anterior + "</td>";
            tableHTML += "<td> R$ " + record.debito + "</td>";
        } else {
            console.log("loop de venda venda");
            // Se for uma venda
            tableHTML += "<td>" + record.observation + "</td>";

            // Adiciona os produtos à célula "Produtos"
            tableHTML += "<td>";
            for (let j = 0; j < record.products.length; j++) {
                tableHTML += record.products[j].product_name + "<br>";
            }
            tableHTML += "</td>";

            // Adiciona o preço e a quantidade na célula "Preço (U)"
            tableHTML += "<td>";
            for (let j = 0; j < record.products.length; j++) {
                tableHTML += "R$ " + record.products[j].price + " x " + record.products[j].quantity + "<br>";
            }
            tableHTML += "</td>";

            tableHTML += "<td>R$ " + record.total_amount + "</td>";
            tableHTML += "<td>R$ " + record.saldo_anterior + "</td>";
            tableHTML += "<td>R$ " + record.debito + "</td>";
        }

        tableHTML += "</tr>";
    }

    // Fecha a tabela
    tableHTML += "</tbody></table>";

    // Adiciona a tabela ao elemento desejado no DOM (outputDiv no seu caso)
    document.getElementById("filteredData").innerHTML = tableHTML;

 
}

function getFilteredHistory() {
    // Chama a função para obter a lista de clientes

    let selectedClientHistory = document.getElementById("clientDropdownHistory").value;
    //let validadorFormulario = "2";
    let startHistorico = document.getElementById("startDateHistorico").value;
    let endtHistorico = document.getElementById("endDateHistorico").value;

    // Crie um objeto FormData para enviar os dados
    let formData = new FormData();
    formData.append('clientDropdownHistory', selectedClientHistory);
    //formData.append('formType', validadorFormulario);
    formData.append('startDateHistorico', startHistorico);
    formData.append('endDateHistorico', endtHistorico);
    console.log(formData);
    //formData.append();

    // Crie uma instância XMLHttpRequest
    let xhr = new XMLHttpRequest();
    
    // Defina a função de retorno de chamada para processar a resposta
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Trate a resposta, se necessário
                console.log(xhr.responseText);
                let response = JSON.parse(xhr.responseText);
                

                if (response.error) {
                    // Trate o erro, se houver
                    console.error('Erro na consulta: ' + response.error);
                } else {
                    // Exiba os dados filtrados (você pode ter uma função separada para isso)
                    //displayFilteredData(response); esse está sem utilização no momento
                    updateFilteredHistory(response);
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

function updateFilteredHistory(data) {
    // Supondo que você já tenha a variável $filteredData com os dados do PHP
    let $filteredData = data;
    // Inicializa a string HTML da tabela
    let tableHTML = "<table><thead><tr><th>ID</th><th>Data</th><th>Paciente</th><th>Produto</th><th>Preço (U)</th><th>Qt.</th><th>Preço</th><th>Total</th><th>Saldo Anterior</th><th>Saldo Atual</th></tr></thead><tbody>";

    // Loop através dos IDs de vendas
    for (let saleId in $filteredData) {
        if ($filteredData.hasOwnProperty(saleId)) {
            let saleData = $filteredData[saleId];

            // Verifica se é um objeto válido (ignora o array de pagamentos)
            if (typeof saleData === 'object' && saleData.products && saleData.products.length > 0) {
                // Loop através dos produtos
                for (let i = 0; i < saleData.products.length; i++) {
                    let product = saleData.products[i];
                    // Formata a data para o formato pt-BR
                    let formattedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(saleData.sale_date));

                    // Adiciona a célula para a Data
            

                    // Adiciona uma nova linha à tabela apenas na primeira iteração
                    if (i === 0) {
                        tableHTML += "<tr>";
                        tableHTML += "<td>" + saleData.sale_id + "</td>";
                        tableHTML += "<td>" + formattedDate + "</td>";
                        tableHTML += "<td>" + saleData.observation + "</td>";
                    } else {
                        // Adiciona células vazias para ID, Data e Observação nas iterações subsequentes
                        tableHTML += "<tr><td></td><td></td><td></td>";
                    }

                    // Adiciona as células para Produto, Preço (U), Qt., Preço e Total
                    tableHTML += "<td>" + product.product_name + "</td>";
                    tableHTML += "<td> R$ " + (parseFloat(product.price) / parseFloat(product.quantity)).toFixed(2) + "</td>";
                    tableHTML += "<td>" + product.quantity + "</td>";
                    tableHTML += "<td> R$ " + parseFloat(product.price).toFixed(2) + "</td>";

                    // Adiciona o Total e Saldo A anterior e Saldo Atual apenas na primeira iteração
                    if (i === 0) {
                        tableHTML += "<td> R$ " + parseFloat(saleData.total_amount).toFixed(2) + "</td>";
                        tableHTML += "<td>" + saleData.saldo_anterior + "</td>";
                        tableHTML += "<td>" + saleData.debito + "</td>";
                    }

                    tableHTML += "</tr>";
                }
            }
        }
    }

    // Fecha a tabela
    tableHTML += "</tbody></table>";

    // Adiciona a tabela ao elemento desejado no DOM (por exemplo, um elemento com o ID "tabela-container")
    document.getElementById("filteredHistorico").innerHTML = tableHTML;
}

function getFilteredPagamento() {
    // Chama a função para obter a lista de clientes

    let selectedClientPagamento = document.getElementById("clientDropdownPagamento").value;
    //let validadorFormulario = "2";
    let startPagamento = document.getElementById("startDatePagamento").value;
    let endtPagamento = document.getElementById("endDatePagamento").value;

    // Crie um objeto FormData para enviar os dados
    let formData = new FormData();
    formData.append('clientDropdownPagamento', selectedClientPagamento);
    //formData.append('formType', validadorFormulario);
    formData.append('startDatePagamento', startPagamento);
    formData.append('endDatePagamento', endtPagamento);
    console.log(formData);
    //formData.append();

    // Crie uma instância XMLHttpRequest
    let xhr = new XMLHttpRequest();
    
    // Defina a função de retorno de chamada para processar a resposta
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Trate a resposta, se necessário
                console.log(xhr.responseText);
                let response = JSON.parse(xhr.responseText);
                

                if (response.error) {
                    // Trate o erro, se houver
                    console.error('Erro na consulta: ' + response.error);
                } else {
                    // Exiba os dados filtrados (você pode ter uma função separada para isso)
                    //displayFilteredData(response); esse está sem utilização no momento
                    updateFilteredPagamentos(response);
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

function updateFilteredPagamentos(data) {
    // Inicializa a string HTML da tabela
    let tableHTML = "<table><thead><tr><th>ID</th><th>Data</th><th>Observação</th><th>Total</th><th>Saldo Anterior</th><th>Saldo Atual</th></tr></thead><tbody>";

    // Ordena os pagamentos por data em ordem crescente
    data.sort((a, b) => new Date(a.payment_date) - new Date(b.payment_date));

    // Loop através de todos os pagamentos
    for (let i = 0; i < data.length; i++) {
        let pagamento = data[i];

        tableHTML += "<tr>";
        tableHTML += "<td>" + pagamento.payment_id + "</td>";

        // Verifica se a data é válida e finita antes de formatar
        if (pagamento.payment_date && isFinite(new Date(pagamento.payment_date))) {
            tableHTML += "<td>" + new Intl.DateTimeFormat('pt-BR').format(new Date(pagamento.payment_date)) + "</td>";
        } else {
            tableHTML += "<td>Data Inválida</td>";
        }

        tableHTML += "<td>" + (pagamento.type_of_payment || "N/A") + "</td>";
        tableHTML += "<td> R$ " + (pagamento.amount || "N/A") + "</td>";
        tableHTML += "<td> R$ " + (pagamento.saldo_anterior || "N/A") + "</td>";
        tableHTML += "<td> R$ " + (pagamento.saldo_atual || "N/A") + "</td>";
        tableHTML += "</tr>";
    }

    // Fecha a tabela
    tableHTML += "</tbody></table>";

    // Adiciona a tabela ao elemento desejado no DOM (por exemplo, um elemento com o ID "tabela-container")
    document.getElementById("filteredPagamentos").innerHTML = tableHTML;
}

// Função para carregar os dados do cliente selecionado e preencher os campos do formulário
function atualizarForm() {
    // Obtém o ID do cliente selecionado no dropdown
    let selectedClientId = document.getElementById("clientDropdownAtualizar").value;

    // Se o cliente selecionado for válido, carregue os dados e atualize o formulário
    if (selectedClientId) {
        // Crie uma instância XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Defina a função de retorno de chamada para processar a resposta
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // Trate a resposta, se necessário
                    let response = JSON.parse(xhr.responseText);
                    console.log(response);
                    if (response.error) {
                        // Trate o erro, se houver
                        console.error('Erro na consulta: ' + response.error);
                    } else {
                        // Preencha os campos do formulário com os dados do cliente
                        updateClientForm(response);
                    }
                } else {
                    // Trate o erro de solicitação
                    console.error('Erro na solicitação. Status: ' + xhr.status);
                }
            }
        };

        // Abra a conexão e envie a solicitação para o arquivo PHP
        xhr.open("POST", "treatment.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        // Envie o ID do cliente e o token como parte do corpo da solicitação
        xhr.send("clientId=" + selectedClientId + "&action=atualizarClientes");
    }
}

// Função para atualizar os campos do formulário com os dados do cliente
function updateClientForm(clientData) {
    // Preencha os campos do formulário com os dados do cliente
    //document.getElementById("clientDropdown").value = clientData.client_name;
    document.getElementById("clientIdAtt").value = clientData.client_id;
    document.getElementById("clientName").value = clientData.client_name;
    document.getElementById("clientEmail").value = clientData.client_email;
    document.getElementById("clientPhone").value = clientData.phone;
    document.getElementById("clientCpfCnpj").value = clientData.cpf_cnpj;
    document.getElementById("clientAddress").value = clientData.address;
    document.getElementById("clientNumber").value = clientData.number;
    document.getElementById("clientComplement").value = clientData.complement;
    document.getElementById("clientNeighborhood").value = clientData.neighborhood;
    document.getElementById("clientCity").value = clientData.city;
    document.getElementById("clientZipcode").value = clientData.zipcode;
    // Continue para os outros campos conforme necessário
}

function updateClient(){
      // Obtenha os dados do formulário ou de onde quer que estejam armazenados
      let clientId = document.getElementById('clientIdAtt').value;
      let clientName = document.getElementById('clientName').value;
      let clientEmail = document.getElementById('clientEmail').value;
      let phone = document.getElementById('clientPhone').value;
      let cpfCnpj = document.getElementById('clientCpfCnpj').value;
      let address = document.getElementById('clientAddress').value;
      let number = document.getElementById('clientNumber').value;
      let complement = document.getElementById('clientComplement').value;
      let neighborhood = document.getElementById('clientNeighborhood').value;
      let city = document.getElementById('clientCity').value;
      let zipcode = document.getElementById('clientZipcode').value;
      
      // Crie um objeto FormData para enviar os dados
      let formData = new FormData();
      formData.append('clientId', clientId);
      formData.append('clientName', clientName);
      formData.append('clientEmail', clientEmail);
      formData.append('phone', phone);
      formData.append('cpfCnpj', cpfCnpj);
      formData.append('address', address);
      formData.append('number', number);
      formData.append('complement', complement);
      formData.append('neighborhood', neighborhood);
      formData.append('city', city);
      formData.append('zipcode', zipcode);
      console.log(formData)
      // Crie uma instância XMLHttpRequest
      let xhr = new XMLHttpRequest();
  
      // Defina a função de retorno de chamada para processar a resposta
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                  // Trate a resposta, se necessário
                  let response = JSON.parse(xhr.responseText);
  
                  if (response.success) {
                      // Atualização bem-sucedida, faça algo, se necessário
                      console.log('Dados do cliente atualizados com sucesso');
                  } else {
                      // Trate o erro, se houver
                      console.error('Erro na atualização dos dados do cliente: ' + response.error);
                  }
              } else {
                  // Trate o erro de solicitação
                  console.error('Erro na solicitação. Status: ' + xhr.status);
              }
          }
      };
  
      // Abra a conexão e envie a solicitação para o arquivo PHP
      xhr.open('POST', 'treatment.php', true);
      xhr.send(formData);
}
function productForm(){
        // Obtém o ID do produto selecionado no dropdown
        let selectedProductId = document.getElementById("productDropdown").value;

        // Se o cliente selecionado for válido, carregue os dados e atualize o formulário
        if (selectedProductId) {
            // Crie uma instância XMLHttpRequest
            let xhr = new XMLHttpRequest();
    
            // Defina a função de retorno de chamada para processar a resposta
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        // Trate a resposta, se necessário
                        let response = JSON.parse(xhr.responseText);
                        console.log(response);
                        if (response.error) {
                            // Trate o erro, se houver
                            console.error('Erro na consulta: ' + response.error);
                        } else {
                            // Preencha os campos do formulário com os dados do cliente
                            updateProductForm(response);
                        }
                    } else {
                        // Trate o erro de solicitação
                        console.error('Erro na solicitação. Status: ' + xhr.status);
                    }
                }
            };
    
            // Abra a conexão e envie a solicitação para o arquivo PHP
            xhr.open("POST", "treatment.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
            // Envie o ID do cliente e o token como parte do corpo da solicitação
            xhr.send("ProductId=" + selectedProductId + "&action=atualizarProdutos");
        }
}

function updateProductForm(productData){
    if (productData && Object.keys(productData).length > 0) {
        // Preencha os campos diretamente
        document.getElementById("productIdAtt").value = productData.product_id;
        document.getElementById("productName").value = productData.product_name;
        document.getElementById("productDescription").value = productData.product_description;
        document.getElementById("priceType1").value = productData.price_type_1;
        document.getElementById("priceType2").value = productData.price_type_2;
        document.getElementById("priceType3").value = productData.price_type_3;
        document.getElementById("priceType4").value = productData.price_type_4;
        document.getElementById("priceType5").value = productData.price_type_5;
        document.getElementById("priceType6").value = productData.price_type_6;
    } else {
        console.error('Dados do produto inválidos');
    }

}

function updateProduct() {
    // Obtenha os dados do formulário ou de onde quer que estejam armazenados
    let productId = document.getElementById('productIdAtt').value;
    let productName = document.getElementById('productName').value;
    let productDescription = document.getElementById('productDescription').value;
    let priceType1 = document.getElementById('priceType1').value;
    let priceType2 = document.getElementById('priceType2').value;
    let priceType3 = document.getElementById('priceType3').value;
    let priceType4 = document.getElementById('priceType4').value;
    let priceType5 = document.getElementById('priceType5').value;
    let priceType6 = document.getElementById('priceType6').value;

    // Crie um objeto FormData para enviar os dados
    let formData = new FormData();
    formData.append('productId', productId);
    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('priceType1', priceType1);
    formData.append('priceType2', priceType2);
    formData.append('priceType3', priceType3);
    formData.append('priceType4', priceType4);
    formData.append('priceType5', priceType5);
    formData.append('priceType6', priceType6);

    console.log(formData);

    // Crie uma instância XMLHttpRequest
    let xhr = new XMLHttpRequest();

    // Defina a função de retorno de chamada para processar a resposta
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Trate a resposta, se necessário
                let response = JSON.parse(xhr.responseText);

                if (response.success) {
                    // Atualização bem-sucedida, faça algo, se necessário
                    console.log('Dados do produto atualizados com sucesso');
                } else {
                    // Trate o erro, se houver
                    console.error('Erro na atualização dos dados do produto: ' + response.error);
                }
            } else {
                // Trate o erro de solicitação
                console.error('Erro na solicitação. Status: ' + xhr.status);
            }
        }
    };

    // Abra a conexão e envie a solicitação para o arquivo PHP
    xhr.open('POST', 'treatment.php', true);
    xhr.send(formData);
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