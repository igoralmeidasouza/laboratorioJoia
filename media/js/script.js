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
        adicionarEventoInputParaFormatarSaldoDevedor('priceType' + i);
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

//adiciona os clientes em um menu dropdown em todos os lugares necessarios do html
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
            document.getElementById("clienteDropdownPagamento").innerHTML = xhr.responseText;

        }
    };
    xhr.open("POST", "treatment.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("get_clients=true");
}
//adiciona os produtos para serem selecionados na aba de vendas
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
//atualiza os preços dos produtos de acordo com o produto selecionado na aba de vendas
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
//adiciona itens no carrinho
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
//remove item do carrinho
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
// atualiza o carrinho
function updateCartDisplay() {
    let cartDisplay = document.getElementById("cartDisplay");
    let cartHTML = "<div class="+'headerTabela'+"><h3>Conteúdo do Carrinho</h3>";
    cartHTML += "<button type="+'button'+" onclick="+'clearCart()'+"><em>X </em>Limpar Carrinho</button></div>";

    if (cartItems.length > 0) {
        cartHTML += "<table class="+'tabelaVenda'+"><tr><th>Cliente</th><th>Produto</th><th>Produto (u)</th><th>Qt.</th><th>Paciente</th><th>Preço Total</th><th>Remover</th></tr>";
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
                        "<td><button onclick=\"removeCartItem(" + i + ")\">"+
                                "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='ai ai-TrashCan'>"+
                                    "<path d='M4 6h16l-1.58 14.22A2 2 0 0 1 16.432 22H7.568a2 2 0 0 1-1.988-1.78L4 6z'/><path d='M7.345 3.147A2 2 0 0 1 9.154 2h5.692a2 2 0 0 1 1.81 1.147L18 6H6l1.345-2.853z'/><path d='M2 6h20'/><path d='M10 11v5'/><path d='M14 11v5'/>"+
                                "</svg>"+
                            "</button>"+
                        "</td></tr>";
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

//função que executa a venda e manda os dados para gerar o extrato de venda na sequencia
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
//função que cria extrato de venda para impressão
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
                        <span class="pacienteContainer">Paciente: ${data.paciente}</span>
                        
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
    </html>`;

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

//função que manda os dados da aba Extrato para serem tratadas no php
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

//esse boss faz o extrato final com pagamentos e vendas por cliente... aqui ja é o tratamento
//ou seja do php para o html atravez do javascript
function updateFilteredData(data) {
    // Converte o objeto data em uma array
    //let dataArray = Object.values(data);
    console.log(data);
    // Inicializa a string HTML da tabela
    let tableHTML =
                    "<tr>"+
                        "<th>ID</th>"+
                        "<th>Data</th>"+
                        "<th>Observação</th>"+
                        "<th>Produtos</th>"+
                        "<th>Preço (U)</th>"+
                        "<th>Total</th>"+
                        "<th>Saldo Anterior</th>"+
                        "<th>Saldo Atual</th>"+
                    "</tr>"

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
            tableHTML += "<td>Pagto.: " + record.type_of_payment + "</td>";
            tableHTML += "<td></td>";  // Coluna 'Produtos' vazia para pagamento
            tableHTML += "<td></td>";  // Coluna 'Preço (U)' vazia para pagamento
            tableHTML += "<td> R$ " + record.amount + "</td>";
            tableHTML += "<td> R$ " + record.saldo_anterior + "</td>";
            tableHTML += "<td> R$ " + record.debito + "</td>";
        } else {
            console.log("loop de venda venda");
            // Se for uma venda
            tableHTML += "<td> Pac.: " + record.observation + "</td>";

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
    //tableHTML += "</tbody></table>";

    // Adiciona a tabela ao elemento desejado no DOM (outputDiv no seu caso)
    document.getElementById("filteredData").innerHTML = tableHTML;

 
}
//manda os dados para consultar historico de venda no php
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
//trata os dados de historico de venda no html pos consulta no php
function updateFilteredHistory(data) {
    // Inicializa a string HTML da tabela
    let tableHTML = "<table class='tabelaGeral'>"+
                        "<tr>"+
                            "<th>ID</th>"+
                            "<th>Data</th>"+
                            "<th>Paciente</th>"+
                            "<th>Produto</th>"+
                            "<th>Preço (U)</th>"+
                            "<th>Qt.</th>"+
                            "<th>Total</th>"+
                            "<th>Saldo Anterior</th>"+
                            "<th>Saldo Atual</th>"+
                        "</tr>";

    // Loop através dos dados
    for (let saleId in data) {
        if (data.hasOwnProperty(saleId)) {
            let saleData = data[saleId];

            // Formata a data para o formato pt-BR
            let formattedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(saleData.sale_date));

            // Adiciona a célula para ID, Data, e Paciente
            tableHTML += "<tr>";
            tableHTML += "<td>" + saleId + "</td>";
            tableHTML += "<td>" + formattedDate + "</td>";
            tableHTML += "<td>" + saleData.observation + "</td>";

            // Concatena os produtos, preços e quantidades
            let productsHTML = "";
            let pricesHTML = "";
            let quantitiesHTML = "";

            for (let i = 0; i < saleData.products.length; i++) {
                productsHTML += saleData.products[i].product_name + "<br>";
                pricesHTML += "R$ " + saleData.products[i].price + "<br>";
                quantitiesHTML += saleData.products[i].quantity + "<br>";
            }

            // Adiciona as células para Produto, Preço (U), Qt., Preço e Total
            tableHTML += "<td>" + productsHTML + "</td>";
            tableHTML += "<td>" + pricesHTML + "</td>";
            tableHTML += "<td>" + quantitiesHTML + "</td>";
            tableHTML += "<td>R$ " + saleData.total_amount + "</td>";
            tableHTML += "<td>R$ " + saleData.saldo_anterior + "</td>";
            tableHTML += "<td>R$ " + saleData.debito + "</td>";
            tableHTML += "</tr>";
        }
    }

    // Fecha a tabela
    tableHTML += "</tbody></table>";

    // Adiciona a tabela ao elemento desejado no DOM (por exemplo, um elemento com o ID "tabela-container")
    document.getElementById("filteredHistorico").innerHTML = tableHTML;
}

//pega os dados do filtro de historico de vendas e manda para serem tratadas no php
function getFilteredPagamento() {
    // Chama a função para obter a lista de clientes

    let selectedClientPagamento = document.getElementById("clienteDropdownPagamento").value;

    let startPagamento = document.getElementById("startDatePagamento").value;
    let endtPagamento = document.getElementById("endDatePagamento").value;

    // Crie um objeto FormData para enviar os dados
    let formData = new FormData();
    formData.append('clienteDropdownPagamento', selectedClientPagamento);
    formData.append('startDatePagamento', startPagamento);
    formData.append('endDatePagamento', endtPagamento);
    console.log(formData);

    // Crie uma instância XMLHttpRequest
    let xhr = new XMLHttpRequest();
    
    // Defina a função de retorno de chamada para processar a resposta
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Trate a resposta, se necessário
                console.log(xhr.responseText);
                let response = JSON.parse(xhr.responseText);
                console.log(response);

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
//recuperação dos dados para colocar na tabela com o historico de vendas
function updateFilteredPagamentos(data) {

    // Convert the object values to an array
    let dataArray = Object.values(data);
    // Get the client_id from the first element in the dataArray
    let clientId = dataArray[0].client_id;

    // Sort the array based on your criteria
    dataArray.sort((a, b) => new Date(a.payment_date) - new Date(b.payment_date));

    // Initialize the HTML string for the table
    let tableHTML = 
                        "<tr>"+
                            "<th>ID</th>"+
                            "<th>Data de Pagamento</th>"+
                            "<th>Pagamento via</th>"+
                            "<th>Total</th>"+
                            "<th>Saldo Anterior</th>"+
                            "<th>Saldo Atual</th>"+
                        "</tr>";

    // Loop through all payments
    for (let i = 0; i < dataArray.length; i++) {
        let pagamento = dataArray[i];
        
        tableHTML += "<tr>";
        tableHTML += "<td>" + pagamento.payment_id + "</td>";

        // Check if the date is valid and finite before formatting
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

    // Close the table
    //tableHTML += "</table>"
    tableHTML += "<tr>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td><button name='gerarExtrato' onclick='gerarExtratoPagamento(" + JSON.stringify(dataArray) + ")'>Gerar Extrato</button></td>"+
                "</tr>";

    // Add the table to the desired element in the DOM (e.g., an element with the ID "tabela-container")
    document.getElementById("filteredPagamentos").innerHTML = tableHTML;
    document.getElementById("pagamentoIdHidden").value = clientId || "";
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
//função que recebe os dados dos clientes e manda para o php para update
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
        if (xhr.readyState == 4 && xhr.status == 200) {
            let resposta = JSON.parse(xhr.responseText);
            // Acesse a variável e atualize a UI conforme necessário
            let mensagemPositiva = resposta.mensagemPositiva;
            // Exemplo: exiba a mensagem em um elemento HTML
            document.getElementById("mensagemPositiva").innerText = mensagemPositiva;
            // Ative a visibilidade da mensagem
            document.getElementById("mensagemPositiva").style.opacity = 1;
            document.getElementById("mensagemPositiva").style.visibility = "visible";
            // Define um temporizador para ocultar a mensagem após 5 segundos
            setTimeout(function () {
                document.getElementById("mensagemPositiva").style.opacity = '0';
                document.getElementById("mensagemPositiva").style.visibility = 'hidden';
            }, 5000); // 5 segundos 
        }
    };
  
      // Abra a conexão e envie a solicitação para o arquivo PHP
      xhr.open('POST', 'treatment.php', true);
      xhr.send(formData);
}

//função feita para coletar o produto e fazer com que a outra função preencha os campos
//auxiliando na atualização dos dados dos produtos
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
//preenche os campos a serem atualizados em produtos
// Função para formatar o valor em BRL
function formatarValorBRL(valor) {
    // Se o valor não for numérico, retorna vazio
    if (isNaN(valor)) return '';
    
    // Formata o valor para BRL
    const formattedValue = parseFloat(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formattedValue;
}

// Função para atualizar os campos de preço
function atualizarCamposDePreco(productData) {
    // Atualiza os campos de preço
    for (let i = 1; i <= 6; i++) {
        const priceType = "priceType" + i;
        const priceValue = "price_type_" + i;
        const formattedPrice = formatarValorBRL(productData[priceValue]);
        document.getElementById(priceType).value = formattedPrice;
    }
}

// Função para atualizar o formulário de produto
function updateProductForm(productData) {
    if (productData && Object.keys(productData).length > 0) {
        // Preencha os campos diretamente
        document.getElementById("productIdAtt").value = productData.product_id;
        document.getElementById("productName").value = productData.product_name;
        document.getElementById("productDescription").value = productData.product_description;
        
        // Atualiza os campos de preço chamando a função atualizarCamposDePreco
        atualizarCamposDePreco(productData);
    } else {
        console.error('Dados do produto inválidos');
    }
}

//recebe os dados dos campos dos produtos e manda para fazer update no php
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
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let resposta = JSON.parse(xhr.responseText);
                    // Acesse a variável e atualize a UI conforme necessário
                    let mensagemPositiva = resposta.mensagemPositiva;
                    // Exemplo: exiba a mensagem em um elemento HTML
                    document.getElementById("mensagemPositiva").innerText = mensagemPositiva;
                    // Ative a visibilidade da mensagem
                    document.getElementById("mensagemPositiva").style.opacity = 1;
                    document.getElementById("mensagemPositiva").style.visibility = "visible";
                    // Define um temporizador para ocultar a mensagem após 5 segundos
                    setTimeout(function () {
                        document.getElementById("mensagemPositiva").style.opacity = '0';
                        document.getElementById("mensagemPositiva").style.visibility = 'hidden';
                    }, 5000); // 5 segundos 
                }
    };

    // Abra a conexão e envie a solicitação para o arquivo PHP
    xhr.open('POST', 'treatment.php', true);
    xhr.send(formData);
}

// Função para pegar os dados da aba 'historico de pagamento'
//os dados serao tratatos no php voltando para o js e depois sendo tratadas pela função chamada na linha 1153
function gerarExtratoPagamento(pagamentoData) {
    // Construa um objeto FormData para enviar os dados
    let formData = new FormData();
    formData.append('pagamentoData', JSON.stringify(pagamentoData)); // Adiciona os dados do pagamento convertidos em JSON

    // Crie uma instância XMLHttpRequest
    let xhr = new XMLHttpRequest();

    // Defina a função de retorno de chamada para processar a resposta
    xhr.onreadystatechange = function () {
        // Verificar se a solicitação foi bem-sucedida
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Trate a resposta, se necessário
                console.log('Resposta da solicitação:', xhr.responseText);
                console.log("------------");
                let response = JSON.parse(xhr.responseText); // Converter a resposta em um objeto JavaScript usando JSON.parse()
                console.log(response);
                if (response.error) {
                    // Trate o erro, se houver
                    console.error('Erro na requisição: ' + response.error);
                } else {
                    // Chame a função openPaymentHistoryTab com os dados recebidos do PHP
                    openPaymentHistoryTab(response);
                }
            } else {
                // Tratar o erro de solicitação
                console.error('Erro na solicitação. Status: ' + xhr.status);
            }
        }
    };

    // Abra a conexão e envie a solicitação para o arquivo PHP
    xhr.open("POST", "treatment.php", true);
    xhr.send(formData);
}


//Gerar o extrato de pagamento na outra aba --------------------
function openPaymentHistoryTab(data) {
    console.log("--");
    console.log(data);
    let resultado1 = typeof data;
    console.log(resultado1);
    let minDate = new Date('9999-12-31'); // Inicialize a menor data com um valor muito alto
    let maxDate = new Date('0000-01-01'); // Inicialize a maior data com um valor muito baixo

    // Verifica se data é um objeto e se possui as propriedades necessárias
    if (typeof data === 'object' && data.clientData && data.paymentDetails) {
        try {
            // Loop através dos detalhes de pagamento para encontrar a menor e a maior data
            data.paymentDetails.forEach(payment => {
                const paymentDate = new Date(payment.payment_date.slice(0, 10)); // Obtém os primeiros 10 caracteres da data

                // Atualiza a menor e a maior data se necessário
                if (paymentDate < minDate) {
                    minDate = paymentDate;
                }
                if (paymentDate > maxDate) {
                    maxDate = paymentDate;
                }
            });

            // Converte as datas para o formato brasileiro (dd/mm/yyyy)
            const minDateBR = minDate.toLocaleDateString('pt-BR');
            const maxDateBR = maxDate.toLocaleDateString('pt-BR');

            console.log("Menor data encontrada:", minDateBR);
            console.log("Maior data encontrada:", maxDateBR);

            // Restante do seu código...
            let clientData = data.clientData;
            let clientId = clientData.client_id;
            let clientName = clientData.client_name;
            let clientDebitAmount = clientData.debit_amount;
            let clientEmail = clientData.client_email;
            let clientPhone = clientData.phone;
            //adicionar outros dados se necessario

            // Cria o HTML para os detalhes do pagamento
            let paymentDetailsHTML = `
                <div class="payment-details">
                    <input type="hidden" name="clientIdHidden" id="clientIdHidden" value="${clientId}">
                    <p>Cliente: ${clientName}</p>
                    <p>E-mail: ${clientEmail}</p>
                    <p>Contato: ${clientPhone}</p>
                    <p>Saldo Devedor Atual: R$ ${clientDebitAmount}</p>
                </div>
            `;

            // Cria o HTML para os itens de pagamento
            let paymentItemsHTML = `
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Observação</th>
                            <th>Total</th>
                            <th>Saldo Anterior</th>
                            <th>Saldo Atual</th>
                        </tr>
                        ${data.paymentDetails.map(payment => `
                            <tr>
                                <td>${payment.payment_id}</td>
                                <td>${new Intl.DateTimeFormat('pt-BR').format(new Date(payment.payment_date))}</td> <!-- Converte para o formato brasileiro -->
                                <td>${payment.type_of_payment || "N/A"}</td>
                                <td>R$ ${payment.amount || "N/A"}</td>
                                <td>R$ ${payment.saldo_anterior || "N/A"}</td>
                                <td>R$ ${payment.saldo_atual || "N/A"}</td>
                            </tr>
                        `).join('')}
            `;

            // Cria o HTML completo para o extrato de pagamento
            let paymentStatementHTML = `
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
                            <div class="impressaoContainer payment-statement-container">
                                <div class="impressaoTabela payment-statement-header">
                                    <h1>Extrato - Histórico de pagamento</h1>
                                    <div class="dataVenda">
                                        <span>${minDateBR} à</span>
                                        <span>${maxDateBR}</span>
                                    </div>
                
                                    <div class="dadosContainer">
                                        <span>Cliente: ${clientName}</span>
                                        <span>E-mail: ${clientEmail}</span>
                                        <span>Contato: ${clientPhone}</span>
                                    </div>
                                    
                                    <table class="tabelaExtrato">
                                        ${paymentItemsHTML}
                                    </table>
                
                                    <div class="saldoClientContainer">
                                        <span>Saldo Devedor Atual: <em>R$ ${clientDebitAmount}</em></span>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </body>
                </html>
            `;

            // Abre uma nova guia com o extrato de pagamento
            let paymentStatementWindow = window.open('', '_blank');

            // Verifica se a guia foi aberta com sucesso
            if (paymentStatementWindow) {
                paymentStatementWindow.document.write(paymentStatementHTML);
                paymentStatementWindow.document.close();
            } else {
                console.error('Falha ao abrir nova guia');
            }
        } catch (error) {
            console.error('Erro ao processar os dados:', error);
        }
    } else {
        console.error('Objeto de dados vazio ou não está no formato esperado.');
    }
}

//remover o cliente da tabela
function removeCliente(clientId) {
    let confirmDelete = window.confirm('Tem certeza de que deseja excluir este cliente?');
    if (confirmDelete) {
        // Make an AJAX request
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "treatment.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let resposta = JSON.parse(xhr.responseText);
                // Acesse a variável e atualize a UI conforme necessário
                let mensagemPositiva = resposta.mensagemPositiva;
                // Exemplo: exiba a mensagem em um elemento HTML
                document.getElementById("mensagemPositiva").innerText = mensagemPositiva;
                // Ative a visibilidade da mensagem
                document.getElementById("mensagemPositiva").style.opacity = 1;
                document.getElementById("mensagemPositiva").style.visibility = "visible";
                // Define um temporizador para ocultar a mensagem após 5 segundos
                setTimeout(function () {
                    document.getElementById("mensagemPositiva").style.opacity = '0';
                    document.getElementById("mensagemPositiva").style.visibility = 'hidden';
                }, 5000); // 5 segundos 
            }
        };
        // Send the client ID to the PHP script
        xhr.send("client_id_delete=" + clientId);
    }
}

//remover o produto da tabela
function removeProduto(productId) {
    //confirma se deseja mesmo exluir o item atravez de popup
    let confirmDelete = window.confirm('Tem certeza de que deseja excluir este produto?');
    if (confirmDelete) {
        // Make an AJAX request
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "treatment.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let resposta = JSON.parse(xhr.responseText);
                // Acesse a variável e atualize a UI conforme necessário
                let mensagemPositiva = resposta.mensagemPositiva;
                // Exemplo: exiba a mensagem em um elemento HTML
                document.getElementById("mensagemPositiva").innerText = mensagemPositiva;
                // Ative a visibilidade da mensagem
                document.getElementById("mensagemPositiva").style.opacity = 1;
                document.getElementById("mensagemPositiva").style.visibility = "visible";
                // Define um temporizador para ocultar a mensagem após 5 segundos
                setTimeout(function () {
                    document.getElementById("mensagemPositiva").style.opacity = '0';
                    document.getElementById("mensagemPositiva").style.visibility = 'hidden';
                }, 5000); // 5 segundos 
            }
        };
        // Send the client ID to the PHP script
        xhr.send("product_id_delete=" + productId);
    }
}

// Botão mostrar senha
function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    var showPasswordBtn = document.getElementById("showPasswordBtn");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        showPasswordBtn.classList.remove("buttonHidden");
        showPasswordBtn.classList.add("buttonVisible");
    } else {
        passwordField.type = "password";
        showPasswordBtn.classList.remove("buttonVisible");
        showPasswordBtn.classList.add("buttonHidden");
    }
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