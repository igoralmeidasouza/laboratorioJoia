let cartItems = [];

/* menu lateral - vinculação dos botões para abrir as pagians (divs) */
document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-item');
    const vitrineDivs = document.querySelectorAll('.bemVindo > .vitrine');
    const subBotoes = document.querySelectorAll('.subBotao');

    subBotoes.forEach(subBotao => {
        subBotao.addEventListener('click', function (event) {
            // Remover a classe 'subBotaoAtivo' de todos os subBotões
            subBotoes.forEach(botao => {
                botao.classList.remove('subBotaoAtivo');
            });

            // Adicionar a classe 'subBotaoAtivo' ao subBotão clicado
            this.classList.add('subBotaoAtivo');
        });
    });

    menuItems.forEach((item, index) => {
        item.addEventListener('click', function (event) {
            if (event.target.closest('.subBotao')) {
                // Remover a classe 'subBotaoAtivo' de todos os subBotões ao clicar em um subBotão
                subBotoes.forEach(botao => {
                    botao.classList.remove('subBotaoAtivo');
                });
                return; // Ignorar cliques nos subBotoes
            }

            const isActive = this.classList.contains('ativa');

            // Remover a classe 'ativa' de todas as li
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('ativa');
                menuItem.classList.add('desativada');
            });

            // Remover a classe 'ativa' de todas as divs
            vitrineDivs.forEach(div => {
                div.classList.remove('ativa');
                div.classList.add('desativada');
            });

            if (!isActive) {
                // Adicionar a classe 'ativa' à li clicada
                this.classList.add('ativa');
                this.classList.remove('desativada');

                // Encontrar a div correspondente pelo data-target
                const subMenu = this.querySelector('.subMenu');
                if (subMenu) {
                    const targetDivClass = subMenu.querySelector('.subBotao.subBotaoAtivo').dataset.target;
                    const targetDiv = document.querySelector(`.${targetDivClass}`);

                    // Adicionar a classe 'ativa' à div correspondente
                    if (targetDiv) {
                        targetDiv.classList.add('ativa');
                        targetDiv.classList.remove('desativada');
                    }
                }
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
    document.getElementById('clientCpfCnpj').addEventListener('input', function() {
        formatarCpfCnpj(this);
    });
    document.getElementById('clientPhone').addEventListener('input', function() {
        formatarNumeroTelefone(this);
    });
    document.getElementById('clientZipcode').addEventListener('input', function() {
        formatarCEP(this);
    });
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
            //mensagemPositivaDiv.innerHTML = '';
            //window.location.href = "index.php"
        }, 5000); // 5 segundos
    }

    if (mensagemNegativaDiv.innerHTML !== '') {
        mensagemNegativaDiv.style.opacity = '1';
        mensagemNegativaDiv.style.visibility = 'visible';

        setTimeout(function () {
            mensagemNegativaDiv.style.opacity = '0';
            mensagemNegativaDiv.style.visibility = 'hidden';
            //mensagemNegativaDiv.innerHTML = '';
            //window.location.href = "index.php"
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
    let cor = document.getElementById("cor").value;
    let denteNumeros = [];

    //capturar numero dos dentes ativos
    document.querySelectorAll('path.ativo').forEach(function(activePath) {
        let dente = activePath.getAttribute('class');
        
        let match = dente.match(/dente_(\d+)/)
        if(dente){
            denteNumeros.push(match[1]);
        }
    });
    let denteNumero = denteNumeros.join(', ');
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
            cor: cor,
            denteNumero: denteNumero,
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

}
// atualiza o carrinho
function updateCartDisplay() {
    let cartDisplay = document.getElementById("cartDisplay");
    let cartHTML = "<div class="+'headerTabela'+"><h3>Conteúdo do Carrinho</h3>";
    cartHTML += "<button type="+'button'+" onclick="+'clearCart()'+"><em>X </em>Limpar Carrinho</button></div>";

    if (cartItems.length > 0) {
        cartHTML += "<table id='existe' class="+'tabelaVenda'+"><tr><th>Cliente</th><th>Produto</th><th>Produto (u)</th><th>Qt.</th><th>Cor</th><th>Dente</th><th>Paciente</th><th>Preço Total</th><th>Remover</th></tr>";
        for (let i = 0; i < cartItems.length; i++) {
            let item = cartItems[i];
            let total1 = item.total;
            let tott = total1.toFixed(2).replace(/\./g, ','); // Convertendo para string com vírgula
            let totalAjustado = total1.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); //ajusta o valor para ser BRL
                
            cartHTML += "<span data-client='" + item.client +
                        "' data-product='" + item.product +
                        "' data-quantity='" + item.quantity +
                        "' data-paciente='" + item.paciente +
                        "' data-cor='" + item.cor +
                        "' data-dentes='" + item.denteNumero +
                        "' data-total='" + tott + "'>" +
                        "<tr><td>" + item.clientName + "</td>" +
                        "<td>" + item.productName + "</td>" +
                        "<td>" + item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>" +
                        "<td>" + item.quantity + "</td>" +
                        "<td>" + item.cor + "</td>" +
                        "<td>" + item.denteNumero + "</td>" +
                        "<td>" + item.paciente + "</td>" +
                        "<td>" + totalAjustado + "</td>" + 
                        "<td><button class='geradorDeExtrato' onclick=\"removeCartItem(" + i + ")\">"+
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

        let totalValueString = totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // Convertendo para BRL
        cartHTML += "<span class="+'valorTotal'+"><em>Total da compra:</em>" + totalValueString + "</span>";
    } else {
        cartHTML += "<span>Seu carrinho está vazio.</span>";
    }
    cartHTML += "<button id='botaovendas' class="+'botaoVendas'+" type="+'button'+" onclick="+'executeSale()'+">Finalizar Pedido</button>";
    cartDisplay.innerHTML = cartHTML;
    document.getElementById("quantity").value = 1; //atualiza a quantidade de produtos para 1 quando tiver alteração no carrinho
    atualizaInput() //verifico se tem o id chave e decido se mantenho ou não o dropdown habilitado
    
}

//função que executa a venda e manda os dados para gerar o extrato de venda na sequencia
function executeSale() {

    let confirmSale = window.confirm('Confirmar Pedido?');
    if (confirmSale) {
        let selectedClient = document.getElementById("client").value;
        let selectedProduct = document.getElementById("product").value;
        let quantity = document.getElementById("quantity").value;
        let selectedPaciente = document.getElementById("paciente").value;
        //let cor = document.getElementById("cor").value;

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

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    try {
                        let response = JSON.parse(xhr.responseText);

                        if (response.success) {
                            // Chamar a função para abrir uma nova guia com o extrato
                            openInvoiceTab(response.data);
                        } else {
                            alert("Erro ao processar o pedido: Carrinho vazio!" ); //+ response.error <- caso queira ver o erro precisamente
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
}
//função que cria extrato de venda para impressão
function openInvoiceTab(data) {
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

    let dentesArray = [];

    //let nomePaciente = item.paciente;
    let totalValue = data.total;
    let saldoAnterior = saldoDevedorClient - totalValue;

    //formatar valor de salto anterior
    saldoDevedorClient = parseFloat(saldoDevedorClient).toFixed(2);
    let saldoDevedorClientFormatted = parseFloat(saldoDevedorClient).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    let totalValueString = totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let itemsHTML = "<tr><th>Produto</th><th>Produto (u)</th><th>Qt.</th><th>Cor</th><th>Dente</th><th>Preço Total</th></tr>";
    itemsHTML += data.cart.map(item => {
        // split para converter a string de dentes em array
        let dentes = item.denteNumero.split(', ');
        dentesArray = dentesArray.concat(dentes); //concatena
        return `
            <tr>
                <td> ${item.productName}</td>
                <td> ${item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>${item.quantity}</td>
                <td>${item.cor}</td>
                <td>${item.denteNumero}</td>
                <td> ${item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
        <!--<hr>-->`;
    }).join('');
    

    // splitar string de dentes para virar lista e ser usada nos svgs
    let dentesSvg = Array.from(new Set(dentesArray));
    // Converter de volta para uma string com 'dente_' na frente de cada número
    let dentesString = dentesSvg.map(dente => `dente${dente}`).join(' ');

    console.log('dentes que serao ativos no svg: ', dentesSvg);
    console.log('Dentes String:', dentesString); // Exibe a string final no console
    let invoiceHTML = `
    <html>
        <head>
            <title>Extrato de Compra</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Readex+Pro:wght@160..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="media/css/estilos.css?teste">
            <link rel="icon" href="media/img/icones/toothIcone.png">
        </head>
        <body>
            <header class="extrato">
                <div class="logoMarca">
                    <figure>
                        <img src="media/img/denteJoia.png" alt="">
                    </figure>
                    <div class="logoTipo">
                        <h1>L.J. - Laboratório de <em>Prótese Dentária Joia</em></h1>
                        <address>
                            <p>RUA VICENTE PEREIRA DE ASSUNÇÃO, 134 | CEP - 04658000 - VL CONTÂNCIA</p>
                            <p>CONTATO: (11) 98361-7314 (11) 94945-2727</p>
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
 
                        <div class="box">
                            <ul><li>18</li><li>17</li><li>16</li><li>15</li><li>14</li><li>13</li><li>12</li><li>11</li><li>21</li><li>22</li><li>23</li><li>24</li><li>25</li><li>26</li><li>27</li><li>28</li></ul>
                            <svg id="dentes" class="${dentesString}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 617.94 158.35">
                                <g class="dente_48">
                                    <path d="M48.88 101.93c.82 3.29.65 6.73.43 10.11-.35 5.46-.8 10.91-1.34 16.36-.22 2.13-.49 4.37-1.78 6.08-1.28 1.7-3.95 2.56-5.61 1.22l-.03-.02c-1.58-2.78-5.11-4.28-8.21-3.49-1.12.28-2.17.83-3.29 1.12-3.16.82-6.45-.47-9.71-.6-2.99-.12-5.94.74-8.71 1.85-1.23.49-2.53 1.05-3.84.81-2.3-.42-3.41-3-4.14-5.22-.9-2.74-1.81-5.51-2.07-8.38-.45-4.96 1.04-9.89 2.65-14.6 1.18-3.44 2.91-7.31 6.42-8.26 3.67-1 7.46 1.76 11.23 1.26 1.24-.16 2.41-.68 3.58-1.16 6.45-2.66 13.85-4.36 20.32-1.77 1.01.41 2 .93 2.72 1.74.72.83 1.11 1.89 1.38 2.95Z"/>
                                    <path d="M40.58 135.7c1.66 1.34 4.33.48 5.61-1.22 1.29-1.71 1.56-3.95 1.78-6.08.54-5.45.99-10.9 1.34-16.36.22-3.38.39-6.82-.43-10.11-.27-1.06-.66-2.12-1.38-2.95-.72-.81-1.71-1.33-2.72-1.74-6.47-2.59-13.87-.89-20.32 1.77-1.17.48-2.34 1-3.58 1.16-3.77.5-7.56-2.26-11.23-1.26-3.51.95-5.24 4.82-6.42 8.26-1.61 4.71-3.1 9.64-2.65 14.6.26 2.87 1.17 5.64 2.07 8.38.73 2.22 1.84 4.8 4.14 5.22 1.31.24 2.61-.32 3.84-.81 2.77-1.11 5.72-1.97 8.71-1.85 3.26.13 6.55 1.42 9.71.6 1.12-.29 2.17-.84 3.29-1.12 3.1-.79 6.63.71 8.21 3.49"/>
                                </g>
                                <g class="dente_47">
                                    <path d="M92.5 109.91c.19 3.5.05 7.81-.02 10.97-.04 1.8-.17 3.74-.65 5.48s-1.86 2.78-3.56 3.37c-2.54.87-5.23-.78-7.91-.82-1.99-.03-3.89 1.03-5.88 1.04-5.74.04-8.58-3.01-14.01-2.02-2.28.41-5.11.61-6.4-1.31-.58-.86-.67-1.95-.73-2.98-.25-4.81-.8-9.81-.1-14.57.41-2.77 1.79-5.43 3.31-7.79s4.67-4.91 7.48-4.77c3.06.15 5.86 2.78 8.9 3.14 4.55.55 7.57-3.37 11.94-2 2.23.71 5.5 2.91 6.32 5.1s1.18 4.82 1.31 7.16Z"/>
                                    <path d="M60.47 127.93c-2.28.41-5.11.61-6.4-1.31-.58-.86-.67-1.95-.73-2.98-.25-4.81-.8-9.81-.1-14.57.41-2.77 1.79-5.43 3.31-7.79s4.67-4.91 7.48-4.77c3.06.15 5.86 2.78 8.9 3.14 4.55.55 7.57-3.37 11.94-2 2.23.71 5.5 2.91 6.32 5.1s1.18 4.82 1.31 7.16c.19 3.5.05 7.81-.02 10.97-.04 1.8-.17 3.74-.65 5.48s-1.86 2.78-3.56 3.37c-2.54.87-5.23-.78-7.91-.82-1.99-.03-3.89 1.03-5.88 1.04-5.74.04-8.58-3.01-14.01-2.02Z"/>
                                </g>
                                <g class="dente_46">
                                    <path d="M141.06 110.49c.42 4.19.29 8.28-.19 12.45-.12 1.05.29 4.35-.18 5.29-.92 1.89-3 3.14-5.1 3.06-2.14-.08-4.03-1.39-6.13-1.82-3.87-.79-7.73 1.49-11.69 1.47-5.48-.58-8.97.02-13.26-.43-.83-.09-1.67-.24-2.36-.69-.6-.38-1.06-.96-1.45-1.55-1.49-2.29-2.38-4.01-2.93-6.68-.89-4.33-1.35-9.71-1.47-14.12-.05-1.96.03-3.99.89-5.75 1.09-2.21 3.32-3.7 5.68-4.43 2.36-.72 4.86-.78 7.33-.78 1.66 0 2.75 1.6 4.34 2.05 1.26.35 4.33.32 5.62.51 2.53.38 5.64-2.34 8.19-2.56 3.86-.33 7.36 1.44 9.74 4.5 2.39 3.06 2.58 5.62 2.97 9.48Z"/>
                                    <path d="M117.77 130.94c-5.48-.58-8.97.02-13.26-.43-.83-.09-1.67-.24-2.36-.69-.6-.38-1.06-.96-1.45-1.55-1.49-2.29-2.38-4.01-2.93-6.68-.89-4.33-1.35-9.71-1.47-14.12-.05-1.96.03-3.99.89-5.75 1.09-2.21 3.32-3.7 5.68-4.43 2.36-.72 4.86-.78 7.33-.78 1.66 0 2.75 1.6 4.34 2.05 1.26.35 4.33.32 5.62.51 2.53.38 5.64-2.34 8.19-2.56 3.86-.33 7.36 1.44 9.74 4.5 2.39 3.06 2.58 5.62 2.97 9.48.42 4.19.29 8.28-.19 12.45-.12 1.05.29 4.35-.18 5.29-.92 1.89-3 3.14-5.1 3.06-2.14-.08-4.03-1.39-6.13-1.82-3.87-.79-7.73 1.49-11.69 1.47Z"/>
                                </g>
                                <g class="dente_45">
                                    <path d="M178.09 118.66c.1 3.76-.42 7.67-1.4 11.29-.48 1.76-1.19 3.45-1.96 5.09-.53 1.16-1.12 2.32-2.01 3.23-.93.95-2.13 1.58-3.31 2.19-1.54.79-3.1 1.59-4.78 2.01s-3.49.65-5.05-.12c-5.31-1.56-9.18-6.18-11.71-11.11-2.22-4.32-3.66-9.07-3.92-13.92-.22-4.23 1.07-8.15 3.69-11.47 1.22-1.55 2.61-3.33 3.9-4.42 1.34-1.14 3.01-1.86 4.63-2.57 4.14-1.79 9.08-2.32 13.08-.24 3.39 1.77 6.44 4.88 7.62 8.52 1.17 3.63 1.12 7.71 1.22 11.52Z"/>
                                    <path d="M159.58 142.35c-5.31-1.56-9.18-6.18-11.71-11.11-2.22-4.32-3.66-9.07-3.92-13.92-.22-4.23 1.07-8.15 3.69-11.47 1.22-1.55 2.61-3.33 3.9-4.42 1.34-1.14 3.01-1.86 4.63-2.57 4.14-1.79 9.08-2.32 13.08-.24 3.39 1.77 6.44 4.88 7.62 8.52 1.17 3.63 1.12 7.71 1.22 11.52.1 3.76-.42 7.67-1.4 11.29-.48 1.76-1.19 3.45-1.96 5.09-.53 1.16-1.12 2.32-2.01 3.23-.93.95-2.13 1.58-3.31 2.19-1.54.79-3.1 1.59-4.78 2.01s-3.49.65-5.05-.12Z"/>
                                </g>
                                <g class="dente_44">
                                    <path d="M213.38 108.69c.3 2.3.33 5.16.08 7.48-.39 3.63-1.49 6.82-2.1 10.42-.74 4.38-1.93 9.14-5.5 11.78-2.61 1.93-5.45 3.02-8.47 3.02-4.59-.64-8.09-4.61-10.31-8.41-2.23-3.8-3.38-8.11-4.48-12.38-1.12-4.3-2.11-8.12-.83-12.37.54-1.79 1.56-3.33 2.84-4.71 1.12-1.21 2.86-2.4 4.26-3.29 2.61-1.66 4.86-4.42 7.93-4.83 3.77-.51 7.78 1.28 10.75 3.66 2.96 2.37 5.34 5.86 5.83 9.63Z"/>
                                    <path d="M197.39 141.39c-4.59-.64-8.09-4.61-10.31-8.41-2.23-3.8-3.38-8.11-4.48-12.38-1.12-4.3-2.11-8.12-.83-12.37.54-1.79 1.56-3.33 2.84-4.71 1.12-1.21 2.86-2.4 4.26-3.29 2.61-1.66 4.86-4.42 7.93-4.83 3.77-.51 7.78 1.28 10.75 3.66 2.96 2.37 5.34 5.86 5.83 9.63.3 2.3.33 5.16.08 7.48-.39 3.63-1.49 6.82-2.1 10.42-.74 4.38-1.93 9.14-5.5 11.78-2.61 1.93-5.45 3.02-8.47 3.02Z"/>
                                </g>
                                <g class="dente_43">
                                    <path d="M246.8 122.16c.1 12.44-.39 23.35-7.97 30.27-2.99 3.07-8.32 3.31-11.82.84-1.23-.88-2.22-2.07-3.05-3.33-3.81-5.76-4.66-12.92-5.39-19.79-.27-2.51-.53-5.03-.79-7.54-.36-3.5-.72-7.04-.15-10.51.29-1.83.84-3.61 1.44-5.37 1.4-4.09 3.2-8.21 6.39-11.12s8.11-4.31 11.95-2.34c2.12 1.08 3.68 3.04 4.72 5.18 1.03 2.14 2.18 4.17 2.73 6.48.54 2.24.88 4.15 1.42 6.39.59 2.43.5 8.33.52 10.84Z"/><path d="M238.83 152.43c-2.99 3.07-8.32 3.31-11.82.84-1.23-.88-2.22-2.07-3.05-3.33-3.81-5.76-4.66-12.92-5.39-19.79-.27-2.51-.53-5.03-.79-7.54-.36-3.5-.72-7.04-.15-10.51.29-1.83.84-3.61 1.44-5.37 1.4-4.09 3.2-8.21 6.39-11.12s8.11-4.31 11.95-2.34c2.12 1.08 3.68 3.04 4.72 5.18 1.03 2.14 2.18 4.17 2.73 6.48.54 2.24.88 4.15 1.42 6.39.59 2.43.5 8.33.52 10.84.1 12.44-.39 23.35-7.97 30.27Z"/>
                                </g>
                                <g class="dente_42">
                                    <path d="M278.16 97.91c.38 2.26.14 5.68-.07 8.32-1.09 13.36 1.03 27.42-3.58 38.21-2.28 5.31-4.93 11.99-10.18 13.38-3.1.2-5.34-2.84-6.88-5.55-1.89-3.33-2.69-6.78-3.36-10.55-.73-4.15-1.89-8.33-2.32-12.52-.33-3.16-.44-6.31-1.02-9.43-.71-3.74-.84-7.56-.84-11.36 0-2.78-.72-6.22.96-8.43 2.42-3.2 7.79-3.36 11.8-3.36 3.33 0 6.93-.65 10.26-.52 1.81.08 4.92.03 5.23 1.81Z"/>
                                    <path d="M264.33 157.82c-3.1.2-5.34-2.84-6.88-5.55-1.89-3.33-2.69-6.78-3.36-10.55-.73-4.15-1.89-8.33-2.32-12.52-.33-3.16-.44-6.31-1.02-9.43-.71-3.74-.84-7.56-.84-11.36 0-2.78-.72-6.22.96-8.43 2.42-3.2 7.79-3.36 11.8-3.36 3.33 0 6.93-.65 10.26-.52 1.81.08 4.92.03 5.23 1.81.38 2.26.14 5.68-.07 8.32-1.09 13.36 1.03 27.42-3.58 38.21-2.28 5.31-4.93 11.99-10.18 13.38Z"/>
                                </g>
                                <g class="dente_41">
                                    <path d="M306.74 110.62c.32 14.58.06 24.13-7.89 36.59-.76 1.19-1.65 2.72-2.79 3.55-2.32.75-4.92-.38-6.57-2.17-1.66-1.79-2.57-4.13-3.44-6.4-.75-1.96-1.5-3.92-2.25-5.87-1.03-2.67-1.15-5-1.51-7.83-.62-4.82-.17-10.07-.61-14.92-.2-2.21-.39-5.05-.3-7.27.09-2.05.06-3.92.71-5.87.45-1.34.82-2.63 1.94-3.49 1.29-.98 3.49-.57 5.12-.53 4.67.14 9.04-.14 13.72-.01.8.02 1.96.21 2.58.74.45.39.71 1.24.88 1.82.57 1.83.37 9.74.41 11.66Z"/>
                                    <path d="M296.06 150.76c1.14-.83 2.03-2.36 2.79-3.55 7.95-12.46 8.21-22.01 7.89-36.59-.04-1.92.16-9.83-.41-11.66-.17-.58-.43-1.43-.88-1.82-.62-.53-1.78-.72-2.58-.74-4.68-.13-9.05.15-13.72.01-1.63-.04-3.83-.45-5.12.53-1.12.86-1.49 2.15-1.94 3.49-.65 1.95-.62 3.82-.71 5.87-.09 2.22.1 5.06.3 7.27.44 4.85 0 10.1.61 14.92.36 2.83.48 5.16 1.51 7.83.75 1.95 1.5 3.91 2.25 5.87.87 2.27 1.78 4.61 3.44 6.4 1.65 1.79 4.25 2.92 6.57 2.17Z"/>
                                </g>
                                <g class="dente_31">
                                    <path d="M336.35 98.81c1.31 3.56.86 7.63.76 11.42-.13 4.91-.15 5.59-.11 8.71.04 3.73-.39 8.03-1.1 11.68-.87 4.48-1.78 8.44-3.1 12.32-.97 2.86-2.67 5.53-5.23 7.12-2.63.86-5.77-.8-7.66-2.82-1.89-2.01-3.15-4.39-4.2-6.94-3.1-7.49-4.52-28.78-3.94-34.84.08-.81-.06-6.77 1.48-9.06.3-.43 6.45-.28 6.97-.31 5.61-.36 8.65-.17 13.3.71.41.08.82.21 1.17.45.54.37 1.43.95 1.66 1.56Z"/>
                                    <path d="M327.57 150.06c-2.63.86-5.77-.8-7.66-2.82-1.89-2.01-3.15-4.39-4.2-6.94-3.1-7.49-4.52-28.78-3.94-34.84.08-.81-.06-6.77 1.48-9.06.3-.43 6.45-.28 6.97-.31 5.61-.36 8.65-.17 13.3.71.41.08.82.21 1.17.45.54.37 1.43.95 1.66 1.56 1.31 3.56.86 7.63.76 11.42-.13 4.91-.15 5.59-.11 8.71.04 3.73-.39 8.03-1.1 11.68-.87 4.48-1.78 8.44-3.1 12.32-.97 2.86-2.67 5.53-5.23 7.12Z"/>
                                </g>
                                <g class="dente_32">
                                    <path d="M368.79 104.92c.23 2.16-.13 10.58-.51 12.71-1.75 9.69-1.81 13.42-3.86 22.93-.78 3.6-.99 7.36-2.59 10.67-1.59 3.32-3.4 5.64-6.95 6.61-3.81-.46-6.65-4.37-8.67-7.63-2.01-3.27-2.92-5.72-3.68-9.48-.91-4.59-2.06-9.39-2.15-14.07-.09-4.06-.73-7.69-.37-11.74.45-5.09-.38-10.77.07-15.87.06-.6.58-1.16 1.29-2.19.76-1.11 7.63-.74 8.97-.66 5.28.32 7.9.73 13.1 1.69.94.17 2.31 1.17 3.16 1.61 1.93 1 1.97 3.26 2.19 5.42Z"/>
                                    <path d="M354.88 157.84c-3.81-.46-6.65-4.37-8.67-7.63-2.01-3.27-2.92-5.72-3.68-9.48-.91-4.59-2.06-9.39-2.15-14.07-.09-4.06-.73-7.69-.37-11.74.45-5.09-.38-10.77.07-15.87.06-.6.58-1.16 1.29-2.19.76-1.11 7.63-.74 8.97-.66 5.28.32 7.9.73 13.1 1.69.94.17 2.31 1.17 3.16 1.61 1.93 1 1.97 3.26 2.19 5.42.23 2.16-.13 10.58-.51 12.71-1.75 9.69-1.81 13.42-3.86 22.93-.78 3.6-.99 7.36-2.59 10.67-1.59 3.32-3.4 5.64-6.95 6.61Z"/>
                                </g>
                                <g class="dente_33">
                                    <path d="M399.12 102.97c3.68 11.38 1.39 23.57-.96 35.29-.62 3.1-1.76 6.39-2.84 9.36-1.17 3.19-3.65 6.07-6.96 6.88-2.61.64-4.75-.03-7.17-1.21-2.06-1-5.22-4.28-6.07-6.84-3.67-11.16-4.12-22.47-3.22-34.19.25-3.29 1.09-6.81 2.32-9.87s4.02-7.33 6.84-9.04c5.04-2.18 10.4.26 13.94 4.46 1.33 1.58 3.49 3.2 4.12 5.16Z"/>
                                    <path d="M381.06 93.35c5.04-2.18 10.4.26 13.94 4.46 1.33 1.58 3.49 3.2 4.12 5.16 3.68 11.38 1.39 23.57-.96 35.29-.62 3.1-1.76 6.39-2.84 9.36-1.17 3.19-3.65 6.07-6.96 6.88-2.61.64-4.75-.03-7.17-1.21-2.06-1-5.22-4.28-6.07-6.84-3.67-11.16-4.12-22.47-3.22-34.19.25-3.29 1.09-6.81 2.32-9.87s4.02-7.33 6.84-9.04Z"/>
                                </g>
                                <g class="dente_34">
                                    <path d="M436.61 111.2c.05 2.32.1 6.08-.65 8.32-1.28 3.87-2.59 6.86-3.88 10.73-1.12 3.4-3.17 6.26-5.79 8.69-2.63 2.44-6.07 3.03-9.86 1.87-8.27-6.45-9.02-11.67-10.6-22.32-.34-2.32-.68-10.93-.19-13.22.92-4.33 4.55-6.76 8.71-8.26 5.4-1.95 9.65-1.83 14.39 1.42 4.74 3.24 7.75 7.03 7.87 12.77Z"/>
                                    <path d="M416.43 140.81c-8.27-6.45-9.02-11.67-10.6-22.32-.34-2.32-.68-10.93-.19-13.22.92-4.33 4.55-6.76 8.71-8.26 5.4-1.95 9.65-1.83 14.39 1.42 4.74 3.24 7.75 7.03 7.87 12.77.05 2.32.1 6.08-.65 8.32-1.28 3.87-2.59 6.86-3.88 10.73-1.12 3.4-3.17 6.26-5.79 8.69-2.63 2.44-6.07 3.03-9.86 1.87Z"/>
                                </g>
                                <g class="dente_35">
                                    <path d="M473.83 111.4c.62 1.88 1.59 4.87 1.32 6.83-.36 2.61-2.2 7.31-2.85 9.27-1.44 4.31-2.26 5.64-5.05 9.33-2.73 3.63-7.03 6.11-12.14 5.28-3.07-.56-6.31-1.49-8.82-4.46-2.02-2.38-3.55-5.12-4.65-10.25-.79-3.71-.69-8.57-1.1-12.33-.46-4.31.3-5.91 1.75-10 1.44-4.09 7.48-7.57 11.8-7.93 5.16-.44 7.94.84 12.07 4.32 3.88 3.27 6.06 4.97 7.67 9.94Z"/>
                                    <path d="M455.11 142.11c-3.07-.56-6.31-1.49-8.82-4.46-2.02-2.38-3.55-5.12-4.65-10.25-.79-3.71-.69-8.57-1.1-12.33-.46-4.31.3-5.91 1.75-10 1.44-4.09 7.48-7.57 11.8-7.93 5.16-.44 7.94.84 12.07 4.32 3.88 3.27 6.06 4.97 7.67 9.94.62 1.88 1.59 4.87 1.32 6.83-.36 2.61-2.2 7.31-2.85 9.27-1.44 4.31-2.26 5.64-5.05 9.33-2.73 3.63-7.03 6.11-12.14 5.28Z"/>
                                </g>
                                <g class="dente_36">
                                    <path d="M521 101.46c.52 4.62 1.26 9.05.83 13.68-.42 4.63-.91 10.22-3.93 13.75-.43.51-2.58 1.84-3.23 1.99-.59.13-1.79-.98-2.38-1.11-4.15-.93-7.04 1.61-11.29 1.63-3.65.01-8.52-1.55-12.61-2.58-.94 1.39-2.04 2.77-3.59 3.41-1.54.64-4.35.53-5.09-.96-.26-.52-1.16-3.95-1.23-4.52-.87-6.97-1.29-9.24-1.55-16.26-.07-2.04 1.19-5.16 1.87-7.09 1.44-4.1 5.93-6.65 10.26-6.35 3.05.22 7.42 1.16 10.39 1.89 5.86 1.46 6.18-1.35 12.19-1.89.67-.06 6.16 1.04 6.77 1.31 1.31.58 2.42 1.69 2.59 3.1Z"/>
                                    <path d="M488.39 128.82c-.94 1.39-2.04 2.77-3.59 3.41-1.54.64-4.35.53-5.09-.96-.26-.52-1.16-3.95-1.23-4.52-.87-6.97-1.29-9.24-1.55-16.26-.07-2.04 1.19-5.16 1.87-7.09 1.44-4.1 5.93-6.65 10.26-6.35 3.05.22 7.42 1.16 10.39 1.89 5.86 1.46 6.18-1.35 12.19-1.89.67-.06 6.16 1.04 6.77 1.31 1.31.58 2.42 1.69 2.59 3.1.52 4.62 1.26 9.05.83 13.68-.42 4.63-.91 10.22-3.93 13.75-.43.51-2.58 1.84-3.23 1.99-.59.13-1.79-.98-2.38-1.11-4.15-.93-7.04 1.61-11.29 1.63-3.65.01-8.52-1.55-12.61-2.58Z"/>
                                </g>
                                <g class="dente_37">
                                    <path d="M562.28 102.62c2.92 7.01 2.31 18.06 1.93 25.64-1.68 2.49-6.77-1.49-10.64-.86-3.88.62-7.39 2.42-11.29 2-1.73-.19-4.7-1.64-6.42-1.4-1.77.24-3.52 1.23-5.25.78-2.04-.53-4.28-1.4-4.33-3.51-.06-2.12-.53-6.08-.52-8.2.02-3.13.06-6.47 0-9.61-.13-6.6 6.65-12.52 13.94-9.94 3.13 1.11 4.62 1.92 7.93 1.62 1.7-.16 6.11-2.99 7.81-2.78 3.21.4 5.59 3.27 6.84 6.26Z"/>
                                    <path d="M564.21 128.26c-1.68 2.49-6.77-1.49-10.64-.86-3.88.62-7.39 2.42-11.29 2-1.73-.19-4.7-1.64-6.42-1.4-1.77.24-3.52 1.23-5.25.78-2.04-.53-4.28-1.4-4.33-3.51-.06-2.12-.53-6.08-.52-8.2.02-3.13.06-6.47 0-9.61-.13-6.6 6.65-12.52 13.94-9.94 3.13 1.11 4.62 1.92 7.93 1.62 1.7-.16 6.11-2.99 7.81-2.78 3.21.4 5.59 3.27 6.84 6.26 2.92 7.01 2.31 18.06 1.93 25.64Z"/>
                                </g>
                                <g class="dente_38">
                                    <path d="M613.12 105.52c3.23 8.52 3.78 11.36 3.59 19.26-.09 3.42-.02 8.18-2.94 9.97-1.91 1.17-4 .71-6.22-.48-1.98-1.06-3.9-1.85-6.13-1.98-2.59 1.93-6.95 2.75-10.1 2.07s-4.57-3.8-7.55-2.58c-1.29.53-3.6 2.46-4.86 3.05-1.27.59-2.88 1.72-4.04.95-.56-.36-2.27-2.29-2.65-2.84-4.29-6.26-3.16-11.2-3.81-18.77-.28-3.38.15-8.46 1.68-11.48 1.74-3.44 2.55-6.07 6.27-7.07 2.31-.61 7.92 1.04 11.35 2.81 3.63 1.87 7.28 4.5 11.1 3.04 2.32-.89 3.31-2.34 5.09-3.17 1.77-.83 4.31-.46 5.72.9.48.47 3.27 5.7 3.5 6.32Z"/>
                                    <path d="M601.42 132.29c-2.59 1.93-6.95 2.75-10.1 2.07s-4.57-3.8-7.55-2.58c-1.29.53-3.6 2.46-4.86 3.05-1.27.59-2.88 1.72-4.04.95-.56-.36-2.27-2.29-2.65-2.84-4.29-6.26-3.16-11.2-3.81-18.77-.28-3.38.15-8.46 1.68-11.48 1.74-3.44 2.55-6.07 6.27-7.07 2.31-.61 7.92 1.04 11.35 2.81 3.63 1.87 7.28 4.5 11.1 3.04 2.32-.89 3.31-2.34 5.09-3.17 1.77-.83 4.31-.46 5.72.9.48.47 3.27 5.7 3.5 6.32 3.23 8.52 3.78 11.36 3.59 19.26-.09 3.42-.02 8.18-2.94 9.97-1.91 1.17-4 .71-6.22-.48-1.98-1.06-3.9-1.85-6.13-1.98Z"/>
                                </g>  
                                <g class="dente_18">
                                    <path d="M36.64 34.23c1.52 2.12 1.08 4.99.85 7.59-.4 4.58.06 9.24-.7 13.78-.3 1.83-.81 3.67-1.84 5.22-1.98 3-5.79 4.58-9.36 4.19-1.67-.19-3.3-.76-4.98-.7-1.22.05-2.45.43-3.66.21-1.28-.23-2.35-1.11-3.38-1.91-.62-.47-1.27-.94-2.03-1.09-1.09-.21-2.2.26-3.31.28-1.31.03-2.57-.59-3.57-1.45-.99-.86-1.76-1.94-2.52-3.02-.13-.18.04-.75.19-.91.61-1.61.56-3.37.53-5.09-.06-4.88.22-9.77.84-14.61.15-1.14.36-2.37 1.2-3.14.92-.85 2.35-.89 3.54-.52 1.2.38 2.2 1.19 3.37 1.64 3.42 1.31 7.42.89 11.17 1.1 3.79.2 7.38-1.8 11.12-2.5.43-.08.87-.15 1.3-.04.52.14.93.53 1.24.97Z"/>
                                    <path d="M2.33 56.42c.61-1.61.56-3.37.53-5.09-.06-4.88.22-9.77.84-14.61.15-1.14.36-2.37 1.2-3.14.92-.85 2.35-.89 3.54-.52 1.2.38 2.2 1.19 3.37 1.64 3.42 1.31 7.42.89 11.17 1.1 3.79.2 7.38-1.8 11.12-2.5.43-.08.87-.15 1.3-.04.52.14.93.53 1.24.97 1.52 2.12 1.08 4.99.85 7.59-.4 4.58.06 9.24-.7 13.78-.3 1.83-.81 3.67-1.84 5.22-1.98 3-5.79 4.58-9.36 4.19-1.67-.19-3.3-.76-4.98-.7-1.22.05-2.45.43-3.66.21-1.28-.23-2.35-1.11-3.38-1.91-.62-.47-1.27-.94-2.03-1.09-1.09-.21-2.2.26-3.31.28-1.31.03-2.57-.59-3.57-1.45-.99-.86-1.76-1.94-2.52-3.02-.13-.18.04-.75.19-.91Z"/>
                                </g>
                                <g class="dente_17">
                                    <path d="M80.59 37.17c.13 1.74.06 3.49-.03 5.24-.22 4.19.5 9.46-1.31 13.24-1.8 3.79-4.84 6.46-9.03 6.65-3.44.15-8.19-1.6-11.61-1.23-2.41.27-4.75 1.07-7.01 1.94-2.27.87-5.07 1.19-6.93-.37-3.66-3.39-5.37-8.62-5.08-13.6.08-1.37-.28-2.56-.03-3.91.37-2.04.53-4.63.88-6.67.3-1.8-.02-3.14 1.07-5.62.62-1.41 1.86-2.59 3.24-3.27.93-.46 2.02-.38 3.06-.39 5.68-.04 11.08-2.89 16.75-2.8 2.68.04 6.97.75 9.53 1.53 2.27.7 2.97 1.53 4.5 3.35 1.36 1.62 1.85 3.8 2 5.91Z"/>
                                    <path d="M44.67 62.64c-3.66-3.39-5.37-8.62-5.08-13.6.08-1.37-.28-2.56-.03-3.91.37-2.04.53-4.63.88-6.67.3-1.8-.02-3.14 1.07-5.62.62-1.41 1.86-2.59 3.24-3.27.93-.46 2.02-.38 3.06-.39 5.68-.04 11.08-2.89 16.75-2.8 2.68.04 6.97.75 9.53 1.53 2.27.7 2.97 1.53 4.5 3.35 1.36 1.62 1.85 3.8 2 5.91.13 1.74.06 3.49-.03 5.24-.22 4.19.5 9.46-1.31 13.24-1.8 3.79-4.84 6.46-9.03 6.65-3.44.15-8.19-1.6-11.61-1.23-2.41.27-4.75 1.07-7.01 1.94-2.27.87-5.07 1.19-6.93-.37Z"/>
                                </g>
                                <g class="dente_16">
                                    <path d="M126.22 36.66c.47 2.96.4 5.99.3 8.99-.09 2.44-.2 4.89-.47 7.33-.3 2.78-.88 5.68-2.72 7.79-2.04 2.32-5.51 3.26-8.43 2.27-1.17-.4-2.25-1.07-3.46-1.24-3.28-.48-6.56 2.71-9.65 1.49-1.03-.4-1.9-1.27-3-1.34-1.22-.08-2.38.86-3.57.59-1.24-.28-1.86-1.71-2.97-2.33a2.57 2.57 0 0 0-2.52.03c-.82.48-1.56 1.46-2.47 1.19-.26-.08-.46-.28-.69-.43-2.59-1.74-3.73-9.4-3.25-15.96-.28-4.07.98-8.44 2.17-12.5.44-1.49 1.19-2.96 2.41-3.93 1.69-1.35 4.09-1.31 6.22-.91 2.12.41 4.24 1.11 6.39.87 2.95-.33 5.73-2.42 8.62-1.75 2.32.53 4.26 2.79 6.6 2.37 1.96-.36 3.57-2.55 5.47-1.95.64.2 1.13.7 1.56 1.21 1.93 2.31 2.98 5.24 3.46 8.21Z"/>
                                    <path d="M83.32 45.04c-.28-4.07.98-8.44 2.17-12.5.44-1.49 1.19-2.96 2.41-3.93 1.69-1.35 4.09-1.31 6.22-.91 2.12.41 4.24 1.11 6.39.87 2.95-.33 5.73-2.42 8.62-1.75 2.32.53 4.26 2.79 6.6 2.37 1.96-.36 3.57-2.55 5.47-1.95.64.2 1.13.7 1.56 1.21 1.93 2.31 2.98 5.24 3.46 8.21.47 2.96.4 5.99.3 8.99-.09 2.44-.2 4.89-.47 7.33-.3 2.78-.88 5.68-2.72 7.79-2.04 2.32-5.51 3.26-8.43 2.27-1.17-.4-2.25-1.07-3.46-1.24-3.28-.48-6.56 2.71-9.65 1.49-1.03-.4-1.9-1.27-3-1.34-1.22-.08-2.38.86-3.57.59-1.24-.28-1.86-1.71-2.97-2.33a2.57 2.57 0 0 0-2.52.03c-.82.48-1.56 1.46-2.47 1.19-.26-.08-.46-.28-.69-.43-2.59-1.74-3.73-9.4-3.25-15.96Z"/>
                                </g>
                                <g class="dente_15">
                                    <path d="M159.49 33.11c1.28 6.93 1.6 14.39-1.5 20.71-.94 1.93-2.18 3.7-3.5 5.39-2.19 2.82-5.01 5.67-8.57 5.8-1.73.07-3.41-.53-5.04-1.12-4.83-3.42-8.91-7.95-9.22-17.39-.15-4.62.22-9.24 1.07-13.79.58-3.09 1.25-6.2 2.5-9.08 1.25-2.89 3.14-5.58 5.75-7.33 1.57-1.07 3.54-1.78 5.38-1.29 1.05.27 1.97.92 2.81 1.62 1.27 1.05 2.4 2.25 3.53 3.45 1.72 1.83 3.44 3.7 4.61 5.92 1.17 2.2 1.74 4.66 2.18 7.11Z"/>
                                    <path d="M140.88 63.89c-4.83-3.42-8.91-7.95-9.22-17.39-.15-4.62.22-9.24 1.07-13.79.58-3.09 1.25-6.2 2.5-9.08 1.25-2.89 3.14-5.58 5.75-7.33 1.57-1.07 3.54-1.78 5.38-1.29 1.05.27 1.97.92 2.81 1.62 1.27 1.05 2.4 2.25 3.53 3.45 1.72 1.83 3.44 3.7 4.61 5.92 1.17 2.2 1.74 4.66 2.18 7.11 1.28 6.93 1.6 14.39-1.5 20.71-.94 1.93-2.18 3.7-3.5 5.39-2.19 2.82-5.01 5.67-8.57 5.8-1.73.07-3.41-.53-5.04-1.12Z"/>
                                </g>
                                <g class="dente_14">
                                    <path d="M196.48 34.71c.4 5.21.12 10.98-1.85 15.52-2.2 5.03-5.88 9.07-9.27 12.68-.84.89-2.86 1.62-4.09 1.76-1.03.12-1.69-.28-2.61-.88-2.91-1.89-5.3-4.49-7.65-7.05-1.87-2.04-3.75-4.09-5.42-6.3-1.02-1.37-1.98-2.81-2.49-4.44-.56-1.78-.56-3.69-.46-5.56.19-3.76.93-7.48 2.1-11.07 1.13-3.45 3.29-6.69 6.6-8.99 1.23-.85 2.54-1.59 3.89-2.24 1.19-.57 2.44-1.1 3.75-1.19 1.78-.13 3.51.54 5.16 1.21 2.85 1.16 5.8 2.45 7.73 4.85.97 1.2 1.63 2.63 2.23 4.06 1.03 2.47 2.18 4.98 2.38 7.64Z"/>
                                    <path d="M181.27 64.67c-1.03.12-1.69-.28-2.61-.88-2.91-1.89-5.3-4.49-7.65-7.05-1.87-2.04-3.75-4.09-5.42-6.3-1.02-1.37-1.98-2.81-2.49-4.44-.56-1.78-.56-3.69-.46-5.56.19-3.76.93-7.48 2.1-11.07 1.13-3.45 3.29-6.69 6.6-8.99 1.23-.85 2.54-1.59 3.89-2.24 1.19-.57 2.44-1.1 3.75-1.19 1.78-.13 3.51.54 5.16 1.21 2.85 1.16 5.8 2.45 7.73 4.85.97 1.2 1.63 2.63 2.23 4.06 1.03 2.47 2.18 4.98 2.38 7.64.4 5.21.12 10.98-1.85 15.52-2.2 5.03-5.88 9.07-9.27 12.68-.84.89-2.86 1.62-4.09 1.76Z"/>
                                </g>
                                <g class="dente_13">
                                    <path d="M231.06 24.05c2.35 11.45 1.65 22.99-3.75 33.29-1.39 2.65-3.08 5.12-5.73 6.52-4.72 0-9.3-3.75-13.04-6.83-1.78-1.47-3.92-2.59-5.18-4.54-.67-1.05-1.1-2.24-1.53-3.41-1.06-2.97-1.47-5.94-1.59-9.1-.14-3.64-.28-8.72.64-13.03.7-3.26 1.68-6.31 3.17-9.29 1.48-2.99 3.87-5.12 6.45-6.78 1.8-1.16 3.77-2.01 5.92-2.06 1.56-.03 3.15.13 4.62.66 2.78 1 4.74 3.41 6.32 5.9 1.49 2.34 3 5.3 3.7 8.67Z"/>
                                    <path d="M221.58 63.86c2.65-1.4 4.34-3.87 5.73-6.52 5.4-10.3 6.1-21.84 3.75-33.29-.7-3.37-2.21-6.33-3.7-8.67-1.58-2.49-3.54-4.9-6.32-5.9-1.47-.53-3.06-.69-4.62-.66-2.15.05-4.12.9-5.92 2.06-2.58 1.66-4.97 3.79-6.45 6.78-1.49 2.98-2.47 6.03-3.17 9.29-.92 4.31-.78 9.39-.64 13.03.12 3.16.53 6.13 1.59 9.1.43 1.17.86 2.36 1.53 3.41 1.26 1.95 3.4 3.07 5.18 4.54 3.74 3.08 8.32 6.83 13.04 6.83Z"/>
                                </g>
                                <g class="dente_12">
                                    <path d="M267.28 48.39c.07 4.23-.29 9.29-3.39 9.64-3.23.2-6.47.33-9.71.41-3.26.07-6.58.07-9.68-.91-3.62-1.14-7.22-2.15-8.61-5.68-.77-1.94-.8-5.55-.79-7.74.03-8.57.45-8.83 1.02-18.05.15-2.29.64-11.36 1.13-13.8.78-3.86 1.74-3.44 5.43-6.04 1.33-.94 2.28-2.33 3.63-3.22s3-1.46 4.6-1.17c1.2.22 3.16.31 4.14 1.05 6.46 4.92 9.35 13.3 11.01 21.25 1.66 7.94 1.08 16.14 1.22 24.26Z"/>
                                    <path d="M263.89 58.03c3.1-.35 3.46-5.41 3.39-9.64-.14-8.12.44-16.32-1.22-24.26-1.66-7.95-4.55-16.33-11.01-21.25-.98-.74-2.94-.83-4.14-1.05-1.6-.29-3.25.28-4.6 1.17s-2.3 2.28-3.63 3.22c-3.69 2.6-4.65 2.18-5.43 6.04-.49 2.44-.98 11.51-1.13 13.8-.57 9.22-.99 9.48-1.02 18.05-.01 2.19.02 5.8.79 7.74 1.39 3.53 4.99 4.54 8.61 5.68 3.1.98 6.42.98 9.68.91 3.24-.08 6.48-.21 9.71-.41Z"/>
                                </g>
                                <g class="dente_11">
                                    <path d="M307.38 28.19c1.03 10.24.92 20.88.69 28.49-.02.77-.27 1.55-.68 2.2-1.07 1.65-3.08 2.87-4.96 2.92-10.23.25-18.24-1-26.63.01-1.1.13-2.24.11-3.27-.28-1.03-.4-2.64-1.79-2.55-3.07-.2-2.83.1-4.15.01-6.83-.18-5.22-.04-10.54.23-16.16.26-5.64-.12-12.22 1.69-16.91 1.95-5.05 4.4-9.44 8.81-12.59.86-.62 1.78-1.16 2.79-1.49 1.67-.54 3.48-.46 5.24-.3 1.48.14 2.97.38 4.32 1.01 1.6.74 2.77 1.87 4.44 3.84 2.93 3.47 5.22 6.86 7.17 11.15 1.41 3.09 2.41 5.14 2.7 8.01Z"/>
                                    <path d="M269.98 58.46c-.2-2.83.1-4.15.01-6.83-.18-5.22-.04-10.54.23-16.16.26-5.64-.12-12.22 1.69-16.91 1.95-5.05 4.4-9.44 8.81-12.59.86-.62 1.78-1.16 2.79-1.49 1.67-.54 3.48-.46 5.24-.3 1.48.14 2.97.38 4.32 1.01 1.6.74 2.77 1.87 4.44 3.84 2.93 3.47 5.22 6.86 7.17 11.15 1.41 3.09 2.41 5.14 2.7 8.01 1.03 10.24.92 20.88.69 28.49-.02.77-.27 1.55-.68 2.2-1.07 1.65-3.08 2.87-4.96 2.92-10.23.25-18.24-1-26.63.01-1.1.13-2.24.11-3.27-.28-1.03-.4-2.64-1.79-2.55-3.07Z"/>
                                </g>
                                <g class="dente_21">
                                    <path d="M349.53 49.09c.01 4.52.76 8.06-1.1 10.13-.48.53-1.29 1.38-1.85 1.83-.77.61-1.84.64-2.83.63-9.3-.01-18.6-.03-27.9-.05-1.88-.29-3.28-1.1-3.98-2.53s-.76-3.08-.8-4.68c-.29-10.81-.49-21.84 2.61-32.2 1.34-4.45 3.32-8.79 6.53-12.15 3.2-3.35 6.82-5.53 12.29-5.8 1.48-.08 3.71.48 5.13 1.05 1.46.58 2.41 1.05 3.73 1.91 1.45.95 2.5 2.41 3.36 3.92 3.12 5.53 3.98 12.06 4.02 18.42.03 6.35.77 13.17.79 19.52Z"/>
                                    <path d="M315.85 61.63c-1.88-.29-3.28-1.1-3.98-2.53s-.76-3.08-.8-4.68c-.29-10.81-.49-21.84 2.61-32.2 1.34-4.45 3.32-8.79 6.53-12.15 3.2-3.35 6.82-5.53 12.29-5.8 1.48-.08 3.71.48 5.13 1.05 1.46.58 2.41 1.05 3.73 1.91 1.45.95 2.5 2.41 3.36 3.92 3.12 5.53 3.98 12.06 4.02 18.42.03 6.35.77 13.17.79 19.52.01 4.52.76 8.06-1.1 10.13-.48.53-1.29 1.38-1.85 1.83-.77.61-1.84.64-2.83.63-9.3-.01-18.6-.03-27.9-.05Z"/>
                                </g>
                                <g class="dente_22">
                                    <path d="M383.69 35.5c.3 5.21.59 10.46-.13 15.62-.12.9-.28 1.8-.72 2.59-.73 1.32-2.15 2.13-3.58 2.61-2.58.87-5.35.91-8.06.86-4.99-.1-11.53.63-16.48.01-1.09-.57-1.77-1.71-2.07-2.9-.31-1.19-.28-2.43-.26-3.65.09-8.65-.68-17.37.61-25.92 1.3-8.55 4.99-17.54 12.14-22.42 1.49-1.01 3.17-1.86 4.97-1.8 1.82.05 3.9 1.46 5.16 2.77 1.27 1.31 2.21 2.48 3.1 4.07.76 1.36 1.5 2.5 2.13 3.93 1.98 4.51 2.21 10.08 2.6 14.99.25 3.08.42 6.16.59 9.24Z"/>
                                    <path d="M354.72 57.19c-1.09-.57-1.77-1.71-2.07-2.9-.31-1.19-.28-2.43-.26-3.65.09-8.65-.68-17.37.61-25.92 1.3-8.55 4.99-17.54 12.14-22.42 1.49-1.01 3.17-1.86 4.97-1.8 1.82.05 3.9 1.46 5.16 2.77 1.27 1.31 2.21 2.48 3.1 4.07.76 1.36 1.5 2.5 2.13 3.93 1.98 4.51 2.21 10.08 2.6 14.99.25 3.08.42 6.16.59 9.24.3 5.21.59 10.46-.13 15.62-.12.9-.28 1.8-.72 2.59-.73 1.32-2.15 2.13-3.58 2.61-2.58.87-5.35.91-8.06.86-4.99-.1-11.53.63-16.48.01Z"/>
                                </g>
                                <g class="dente_23">
                                    <path d="M417.68 25.92c1.09 4.64 2.07 9.35 1.96 14.11s-.84 9.27-4.37 12.47c-3.31 2.99-6.75 5.43-10.39 8.45-1.31 1.33-3.89 2.48-5.74 2.19-2.56-.39-4.14-1.48-5.62-3.61-1.45-2.09-2.81-4.4-3.54-6.89-3.29-11.37-3.72-24.2.19-34.59.9-2.4 1.48-3.53 3.42-5.49 2.57-2.58 7.74-4.99 12.12-3.48 4.37 1.51 7.78 5.18 9.68 9.4 1.06 2.38 1.7 4.91 2.29 7.44Z"/>
                                    <path d="M404.88 60.95c3.64-3.02 7.08-5.46 10.39-8.45 3.53-3.2 4.26-7.71 4.37-12.47s-.87-9.47-1.96-14.11c-.59-2.53-1.23-5.06-2.29-7.44-1.9-4.22-5.31-7.89-9.68-9.4-4.38-1.51-9.55.9-12.12 3.48-1.94 1.96-2.52 3.09-3.42 5.49-3.91 10.39-3.48 23.22-.19 34.59.73 2.49 2.09 4.8 3.54 6.89 1.48 2.13 3.06 3.22 5.62 3.61 1.85.29 4.43-.86 5.74-2.19Z"/>
                                </g>
                                <g class="dente_24">
                                    <path d="M456.33 36.7c.38 3.13.73 6.37-.24 9.37-.51 1.55-1.34 2.97-2.3 4.29-1.77 2.43-3.95 4.54-6.12 6.63-1.65 1.59-3.3 3.19-4.95 4.78-.6.58-1.23 1.18-1.99 1.53-1.49.68-3.29.3-4.7-.53-1.41-.84-2.53-2.09-3.67-3.26-2.12-2.16-4.19-4.15-5.73-6.75-1.4-2.36-3.26-5.55-3.22-8.57-.4-4.22-.48-8.48-.24-12.71.11-2.04.31-4.12 1.2-5.95 1.45-3 4.1-5.34 6.97-7.03 1.51-.9 2.85-1.6 4.58-1.94 1.33-.26 4.4-.09 5.74.1 3.98.58 6.84 2.34 9.56 5.3 3.58 3.9 4.46 9.49 5.11 14.74Z"/>
                                    <path d="M423.41 44.19c-.4-4.22-.48-8.48-.24-12.71.11-2.04.31-4.12 1.2-5.95 1.45-3 4.1-5.34 6.97-7.03 1.51-.9 2.85-1.6 4.58-1.94 1.33-.26 4.4-.09 5.74.1 3.98.58 6.84 2.34 9.56 5.3 3.58 3.9 4.46 9.49 5.11 14.74.38 3.13.73 6.37-.24 9.37-.51 1.55-1.34 2.97-2.3 4.29-1.77 2.43-3.95 4.54-6.12 6.63-1.65 1.59-3.3 3.19-4.95 4.78-.6.58-1.23 1.18-1.99 1.53-1.49.68-3.29.3-4.7-.53-1.41-.84-2.53-2.09-3.67-3.26-2.12-2.16-4.19-4.15-5.73-6.75-1.4-2.36-3.26-5.55-3.22-8.57Z"/>
                                </g>
                                <g class="dente_25">
                                    <path d="M486.54 31.06c1.17 6.28 1.76 12.76.68 19.06-.24 1.43-.58 2.86-1.22 4.16-.55 1.11-1.31 2.09-2.11 3.03-2.02 2.37-4.43 4.51-7.36 5.57-2.93 1.05-6.82.78-9.22-1.19-4.05-3.8-6.81-8.93-7.76-14.4-.39-2.27-.48-4.6-.45-6.91.07-4.63.62-9.3 2.18-13.66 1.55-4.36 4.18-8.41 7.87-11.2.57-.44 1.18-.84 1.86-1.08.55-.19 1.13-.26 1.7-.27 3.98-.12 7.67 2.43 9.9 5.72 2.22 3.3 3.21 7.26 3.93 11.17Z"/>
                                    <path d="M467.31 61.69c-4.05-3.8-6.81-8.93-7.76-14.4-.39-2.27-.48-4.6-.45-6.91.07-4.63.62-9.3 2.18-13.66 1.55-4.36 4.18-8.41 7.87-11.2.57-.44 1.18-.84 1.86-1.08.55-.19 1.13-.26 1.7-.27 3.98-.12 7.67 2.43 9.9 5.72 2.22 3.3 3.21 7.26 3.93 11.17 1.17 6.28 1.76 12.76.68 19.06-.24 1.43-.58 2.86-1.22 4.16-.55 1.11-1.31 2.09-2.11 3.03-2.02 2.37-4.43 4.51-7.36 5.57-2.93 1.05-6.82.78-9.22-1.19Z"/>
                                </g>
                                <g class="dente_26">
                                    <path d="m499.69 61.56-.03.14c-2.66-.19-4.91-2.21-6.06-4.61s-1.37-5.13-1.41-7.79c-.05-3.67.2-7.34.49-11 .22-2.82.46-5.66 1.22-8.39.45-1.6 1.23-3.31 2.78-3.9 1.2-.45 2.53-.1 3.75.25 2.26.64 4.6 1.31 6.91.92 2.16-.36 4.09-1.6 6.24-2.02 1.85-.36 3.76-.09 5.56.45 1.46.43 2.95 1.04 4.45.78.81-.14 1.55-.53 2.35-.71 1.89-.43 3.91.35 5.34 1.66 1.43 1.3 2.35 3.08 3.06 4.88.79 2.04 1.36 4.16 1.68 6.33.48 3.17.42 6.41.17 9.61-.27 3.3-.76 6.65-2.2 9.63-.59 1.21-1.52 2.47-2.87 2.59-1.5.13-2.79-1.25-4.3-1.28-2-.04-3.51 2.25-5.51 2.1-1.22-.09-2.15-1.07-3.2-1.69-2.74-1.65-6.26-.86-9.27.23-2.96 1.07-6.06 2.41-9.15 1.82Z"/>
                                    <path d="M499.66 61.7c-2.66-.19-4.91-2.21-6.06-4.61s-1.37-5.13-1.41-7.79c-.05-3.67.2-7.34.49-11 .22-2.82.46-5.66 1.22-8.39.45-1.6 1.23-3.31 2.78-3.9 1.2-.45 2.53-.1 3.75.25 2.26.64 4.6 1.31 6.91.92 2.16-.36 4.09-1.6 6.24-2.02 1.85-.36 3.76-.09 5.56.45 1.46.43 2.95 1.04 4.45.78.81-.14 1.55-.53 2.35-.71 1.89-.43 3.91.35 5.34 1.66 1.43 1.3 2.35 3.08 3.06 4.88.79 2.04 1.36 4.16 1.68 6.33.48 3.17.42 6.41.17 9.61-.27 3.3-.76 6.65-2.2 9.63-.59 1.21-1.52 2.47-2.87 2.59-1.5.13-2.79-1.25-4.3-1.28-2-.04-3.51 2.25-5.51 2.1-1.22-.09-2.15-1.07-3.2-1.69-2.74-1.65-6.26-.86-9.27.23-2.96 1.07-6.06 2.41-9.15 1.82-.04 0-.09-.01-.13-.02"/>
                                </g>
                                <g class="dente_27">
                                    <path d="M578.81 32.2c2.28 5.68 1.71 12.08.78 18.14-.53 3.43-1.24 7.04-3.55 9.64-.53.59-1.15 1.13-1.88 1.43-.76.31-1.6.36-2.42.4-2.62.12-5.38.23-7.73-.93-1.14-.55-2.21-1.4-3.47-1.43-.74-.02-1.45.25-2.13.52-1.5.59-3 1.17-4.5 1.76-3.48.38-7.67-1.19-10.59-3.11-.97-.64-1.9-1.37-2.58-2.31-.86-1.21-1.26-2.69-1.49-4.16-.33-2.06-.37-4.15-.41-6.24-.07-3.3-.14-6.61-.17-9.91-.02-1.66-.03-3.36.58-4.91.8-2.06 2.63-3.6 4.66-4.48 2.03-.89 4.26-1.19 6.46-1.38 3-.25 6.08-.29 8.95.6 1.24.39 2.42.94 3.67 1.27 3.11.84 6.4.29 9.62.4.95.04 1.93.14 2.8.53 1.68.76 2.71 2.46 3.4 4.17Z"/>
                                    <path d="M553.91 61.73c1.5-.59 3-1.17 4.5-1.76.68-.27 1.39-.54 2.13-.52 1.26.03 2.33.88 3.47 1.43 2.35 1.16 5.11 1.05 7.73.93.82-.04 1.66-.09 2.42-.4.73-.3 1.35-.84 1.88-1.43 2.31-2.6 3.02-6.21 3.55-9.64.93-6.06 1.5-12.46-.78-18.14-.69-1.71-1.72-3.41-3.4-4.17-.87-.39-1.85-.49-2.8-.53-3.22-.11-6.51.44-9.62-.4-1.25-.33-2.43-.88-3.67-1.27-2.87-.89-5.95-.85-8.95-.6-2.2.19-4.43.49-6.46 1.38-2.03.88-3.86 2.42-4.66 4.48-.61 1.55-.6 3.25-.58 4.91.03 3.3.1 6.61.17 9.91.04 2.09.08 4.18.41 6.24.23 1.47.63 2.95 1.49 4.16.68.94 1.61 1.67 2.58 2.31 2.92 1.92 7.11 3.49 10.59 3.11Z"/>
                                </g>
                                <g class="dente_28">
                                    <path d="M617.41 42.83c.15 3.8-.39 7.59-.93 11.36-.14.98-.28 1.98-.74 2.85-.55 1.05-1.51 1.82-2.51 2.45-.83.53-1.72.97-2.68 1.18-2.98.65-4.82-.72-7.79-.04-2.86.65-3.57 1.63-6.81 2.45-1.66.42-3.34 1.1-5.86.19-1.64-.87-3.85-1.74-5.53-3.41a8.33 8.33 0 0 1-2.09-3.46c-.41-1.38-.46-2.85-.5-4.29-.17-5.61-.34-11.24.17-16.83.14-1.47.57-3.25 1.99-3.67 1.15-.34 2.3.43 3.37.98 2.24 1.14 4.84 1.38 7.35 1.17 2.5-.21 7.84-.02 10.29-.55 3.18-.69 3.51-2.03 6.74-2.37.47-.05.97-.09 1.4.1.46.2.77.62 1.04 1.04 2.07 3.19 2.95 7.04 3.09 10.85Z"/>
                                    <path d="M590.09 63.27c-1.64-.87-3.85-1.74-5.53-3.41a8.33 8.33 0 0 1-2.09-3.46c-.41-1.38-.46-2.85-.5-4.29-.17-5.61-.34-11.24.17-16.83.14-1.47.57-3.25 1.99-3.67 1.15-.34 2.3.43 3.37.98 2.24 1.14 4.84 1.38 7.35 1.17 2.5-.21 7.84-.02 10.29-.55 3.18-.69 3.51-2.03 6.74-2.37.47-.05.97-.09 1.4.1.46.2.77.62 1.04 1.04 2.07 3.19 2.95 7.04 3.09 10.85.15 3.8-.39 7.59-.93 11.36-.14.98-.28 1.98-.74 2.85-.55 1.05-1.51 1.82-2.51 2.45-.83.53-1.72.97-2.68 1.18-2.98.65-4.82-.72-7.79-.04-2.86.65-3.57 1.63-6.81 2.45-1.66.42-3.34 1.1-5.86.19Z"/>
                                </g>
                            </svg>
                            <ul><li>48</li><li>47</li><li>46</li><li>45</li><li>44</li><li>43</li><li>42</li><li>41</li><li>31</li><li>32</li><li>33</li><li>34</li><li>35</li><li>36</li><li>37</li><li>38</li></ul>
                        </div>

                        <div class="saldoClientContainer">
                            <span>Total do Pedido: <em>${totalValueString}</em></span>
                            <span> Saldo Devedor Anterior: <em>${saldoAnterior.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</em></span>
                            <span> Saldo Devedor Atual: <em>${saldoDevedorClientFormatted}</em></span>
                        </div>
                    </div>
                </div>
            </main>
        </body>
        <script>
        // Add a delay of 2 seconds (2000 milliseconds)
        setTimeout(function() {
            window.print();
        }, 1000);
        </script>
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
        let record = allRecords[i];

        // Formata a data do registro de acordo com o formato local 'pt-BR'
        let formattedRecordDate = new Date(record.sale_date || record.payment_date).toLocaleDateString('pt-BR');

        // Adiciona uma nova linha à tabela
        tableHTML += "<tr>";
        tableHTML += "<td>" + (record.sale_id || record.payment_id) + "</td>";
        tableHTML += "<td>" + formattedRecordDate + "</td>";

        if (record.payment_id !== undefined) {
            // Se for um pagamento
            tableHTML += "<td>Pagamento: <em style='display: block'>" + record.type_of_payment + "</em></td>";
            tableHTML += "<td></td>";  // Coluna 'Produtos' vazia para pagamento
            tableHTML += "<td></td>";  // Coluna 'Preço (U)' vazia para pagamento
            tableHTML += "<td>" + parseFloat(record.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
            tableHTML += "<td>" + parseFloat(record.saldo_anterior).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
            tableHTML += "<td>" + parseFloat(record.debito).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
        } else {
            // Se for uma venda
            tableHTML += "<td> Paciente: <em style='display: block'>" + record.observation + "</em></td>";

            // Adiciona os produtos à célula "Produtos"
            tableHTML += "<td>";
            for (let j = 0; j < record.products.length; j++) {
                tableHTML += record.products[j].product_name + "<br>";
            }
            tableHTML += "</td>";

            // Adiciona o preço e a quantidade na célula "Preço (U)"
            tableHTML += "<td>";
            for (let j = 0; j < record.products.length; j++) {
                tableHTML += "" + (record.products[j].price / record.products[j].quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + " x " + record.products[j].quantity + "<br>";
            }
            tableHTML += "</td>";

            tableHTML += "<td>" + parseFloat(record.total_amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
            tableHTML += "<td>" + parseFloat(record.saldo_anterior).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
            tableHTML += "<td>" + parseFloat(record.debito).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
        }

        tableHTML += "</tr>";
    }
    tableHTML += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><button class='geradorDeExtrato' onclick='gerarExtratoFinal("+JSON.stringify(data)+")'>Gerar Extrato</button></td></tr></tbody></table>";

    // Fecha a tabela
    //tableHTML += "</tbody></table>";

    // Adiciona a tabela ao elemento desejado no DOM (outputDiv no seu caso)
    document.getElementById("filteredData").innerHTML = tableHTML;

 
}
//manda os dados para consultar historico de venda no php
function getFilteredHistory() {
    // Chama a função para obter a lista de clientes
    let selectedClientHistory = document.getElementById("clientDropdownHistory").value;
    let startHistorico = document.getElementById("startDateHistorico").value;
    let endtHistorico = document.getElementById("endDateHistorico").value;

    // Crie um objeto FormData para enviar os dados
    let formData = new FormData();
    formData.append('clientDropdownHistory', selectedClientHistory);
    formData.append('startDateHistorico', startHistorico);
    formData.append('endDateHistorico', endtHistorico);

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
                pricesHTML += "" + (saleData.products[i].price / saleData.products[i].quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "<br>";
                quantitiesHTML += saleData.products[i].quantity + "<br>";
            }

            // Adiciona as células para Produto, Preço (U), Qt., Preço e Total
            tableHTML += "<td>" + productsHTML + "</td>";
            tableHTML += "<td>" + pricesHTML + "</td>";
            tableHTML += "<td>" + quantitiesHTML + "</td>";
            tableHTML += "<td>" + parseFloat(saleData.total_amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
            tableHTML += "<td>" + parseFloat(saleData.saldo_anterior).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
            tableHTML += "<td>" + parseFloat(saleData.debito).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
            tableHTML += "</tr>";
        }
    }

    // Fecha a tabela
    tableHTML += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><button class='geradorDeExtrato' onclick='gerarExtratoVendas("+JSON.stringify(data)+")'>Gerar Extrato</button></td></tr></tbody></table>";

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
        tableHTML += "<td>" + (parseFloat(pagamento.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || "N/A") + "</td>";
        tableHTML += "<td>" + (parseFloat(pagamento.saldo_anterior).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || "N/A") + "</td>";
        tableHTML += "<td>" + (parseFloat(pagamento.saldo_atual).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || "N/A") + "</td>";
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
                    "<td><button class='geradorDeExtrato' name='gerarExtrato' onclick='gerarExtratoPagamento(" + JSON.stringify(dataArray) + ")'>Gerar Extrato</button></td>"+
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
                window.location.href = "index.php"
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
                        window.location.href = "index.php"
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
                let response = JSON.parse(xhr.responseText); // Converter a resposta em um objeto JavaScript usando JSON.parse()
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
    //let resultado1 = typeof data;
    // Verifica se data é um objeto e se possui as propriedades necessárias
    if (typeof data === 'object' && data.clientData && data.paymentDetails) {
        try {
            let minDate = new Date('9999-12-31'); // Inicialize a menor data com um valor muito alto
            let maxDate = new Date('0000-01-01'); // Inicialize a maior data com um valor muito baixo
            
            // Converte os detalhes de venda em uma matriz e, em seguida, itera sobre ela
            Object.values(data.paymentDetails).forEach(payment => {
                const paymentDate = new Date(payment.payment_date);
    
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
                            <th>Saldo Devedor</th>
                        </tr>
                        ${data.paymentDetails.map(payment => `
                            <tr>
                                <td>${payment.payment_id}</td>
                                <td>${new Intl.DateTimeFormat('pt-BR').format(new Date(payment.payment_date))}</td> <!-- Converte para o formato brasileiro -->
                                <td>${payment.type_of_payment || "N/A"}</td>
                                <td>${parseFloat(payment.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || "N/A"}</td>
                                <td>${parseFloat(payment.saldo_anterior).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || "N/A"}</td>
                                <td>${parseFloat(payment.saldo_atual).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || "N/A"}</td>
                            </tr>
                        `).join('')}
            `;

            // Cria o HTML completo para o extrato de pagamento
            let paymentStatementHTML = `
                <html>
                    <head>
                        <title>Extrato de Compra</title>
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Readex+Pro:wght@160..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
                        <link rel="stylesheet" href="media/css/estilos.css">
                        <link rel="icon" href="media/img/icones/toothIcone.png">
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
                                        <span>Saldo Devedor Atual: <em>R$ ${parseFloat(clientDebitAmount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</em></span>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </body>
                    <script>
                    // Add a delay of 2 seconds (2000 milliseconds)
                    setTimeout(function() {
                        window.print();
                    }, 1000);
                    </script>
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

                // Remove o item excluído da lista na UI
                const linhaDoProduto = document.getElementById('cliente' + clientId).closest('tr');
                linhaDoProduto.style.display = 'none';

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
    // Confirma se deseja mesmo excluir o item através de popup
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
  
          // Remove o item excluído da lista na UI
          const linhaDoProduto = document.getElementById('produto' + productId).closest('tr');
          linhaDoProduto.style.display = 'none';
  
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
    let passwordField = document.getElementById("password");
    let showPasswordBtn = document.getElementById("showPasswordBtn");

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
//---------------------------------------------------------------------------------------------------------------------

function gerarExtratoVendas(dados) {
    // Cria um novo objeto FormData
    let formData = new FormData();
    
    // Adiciona os dados de vendas ao FormData
    formData.append('vendasData', JSON.stringify(dados));
    
    // Cria um novo objeto XMLHttpRequest
    let xhr = new XMLHttpRequest();
    
    // Configura a solicitação
    xhr.open('POST', 'treatment.php', true);
    
    // Define a função de retorno de chamada (callback) para quando a solicitação for concluída
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Requisição bem-sucedida, você pode processar a resposta do PHP aqui
            let respostaJSON = JSON.parse(xhr.responseText);
            // Chama a função openPaymentSalesTab com os dados retornados
            openPaymentSalesTab(respostaJSON);
        } else {
            // Ocorreu um erro na requisição
            console.error('Erro na requisição. Status:', xhr.status);
        }
    };
    
    // Define a função de retorno de chamada para tratamento de erros na requisição
    xhr.onerror = function() {
        console.error('Erro na requisição.');
    };
    
    // Envia a solicitação com o FormData
    xhr.send(formData);
}

function openPaymentSalesTab(data) {
    // Verifica se data é um objeto e se possui as propriedades necessárias
    if (typeof data === 'object' && data.clientData && data.paymentDetails) {
        try {
            let minDate = new Date('9999-12-31'); // Inicialize a menor data com um valor muito alto
            let maxDate = new Date('0000-01-01'); // Inicialize a maior data com um valor muito baixo

            // Loop através dos detalhes de venda para encontrar a menor e a maior data
            Object.values(data.paymentDetails).forEach(sale => {
                const saleDate = new Date(sale.sale_date);

                // Atualiza a menor e a maior data se necessário
                if (saleDate < minDate) {
                    minDate = saleDate;
                }
                if (saleDate > maxDate) {
                    maxDate = saleDate;
                }
            });

            // Converte as datas para o formato brasileiro (dd/mm/yyyy)
            const minDateBR = minDate.toLocaleDateString('pt-BR');
            const maxDateBR = maxDate.toLocaleDateString('pt-BR');

            // Restante do seu código...
            let clientData = data.clientData;
            let clientName = clientData.client_name;
            let clientDebitAmount = clientData.debit_amount;
            let clientEmail = clientData.client_email;
            let clientPhone = clientData.phone;
            //adicionar outros dados se necessario


            // Cria o HTML para os itens de venda
            let saleItemsHTML = `
                <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Paciente</th>
                    <th>Produto</th>
                    <th>Preço (U)</th>
                    <th>Qt.</th>
                    <th>Total</th>
                    <th>Saldo Anterior</th>
                    <th>Saldo Atual</th>
                </tr>
                ${Object.values(data.paymentDetails).map(sale => `
                    <tr>
                        <td>${sale.sale_id}</td>
                        <td>${new Intl.DateTimeFormat('pt-BR').format(new Date(sale.sale_date))}</td>
                        <td>${sale.client_name}</td>
                        <td>${sale.products.map(product => product.product_name).join('<br>')}</td>
                        <td>${sale.products.map(product => 'R$ ' + (product.price / product.quantity).toFixed(2)).join('<br>')}</td>
                        <td>${sale.products.map(product => product.quantity).join('<br>')}</td>
                        <td>${parseFloat(sale.total_amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || "N/A"}</td>
                        <td>${parseFloat(sale.saldo_anterior).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || "N/A"}</td>
                        <td>${parseFloat(sale.debito).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || "N/A"}</td> <!-- Corrigido para exibir debito -->
                    </tr>
                `).join('')}
            `;


            // Cria o HTML completo para o extrato de vendas
            let salesStatementHTML = `
                <html>
                    <head>
                        <title>Extrato de Vendas</title>
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Readex+Pro:wght@160..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
                        <link rel="stylesheet" href="media/css/estilos.css">
                        <link rel="icon" href="media/img/icones/toothIcone.png">
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
                                    <h1>Extrato - Histórico de Vendas</h1>
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
                                        ${saleItemsHTML}
                                    </table>
                
                                    <div class="saldoClientContainer">
                                        <span>Saldo Devedor Atual: <em>R$ ${parseFloat(clientDebitAmount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</em></span>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </body>
                    <script>
                                // Add a delay of 2 seconds (2000 milliseconds)
                                setTimeout(function() {
                                    window.print();
                                }, 1000);
                    </script>
                </html>
            `;

            // Abre uma nova guia com o extrato de vendas
            let salesStatementWindow = window.open('', '_blank');

            // Verifica se a guia foi aberta com sucesso
            if (salesStatementWindow) {
                salesStatementWindow.document.write(salesStatementHTML);
                salesStatementWindow.document.close();
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


function gerarExtratoFinal(dados) {
    // Cria um novo objeto FormData
    let formData = new FormData();
    
    // Adiciona os dados do extrato final ao FormData
    formData.append('extratoFinalData', JSON.stringify(dados));
    
    // Cria um novo objeto XMLHttpRequest
    let xhr = new XMLHttpRequest();
    
    // Configura a solicitação
    xhr.open('POST', 'treatment.php', true);
    
    // Define a função de retorno de chamada (callback) para quando a solicitação for concluída
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Requisição bem-sucedida, você pode processar a resposta do PHP aqui
            let respostaJSON = JSON.parse(xhr.responseText);
            // Chama a função openExtratoFinalTab com os dados retornados
            openExtratoFinalTab(respostaJSON);
        } else {
            // Ocorreu um erro na requisição
            console.error('Erro na requisição. Status:', xhr.status);
        }
    };
    
    // Define a função de retorno de chamada para tratamento de erros na requisição
    xhr.onerror = function() {
        console.error('Erro na requisição.');
    };
    
    // Envia a solicitação com o FormData
    xhr.send(formData);
}

function openExtratoFinalTab(data) {
    
    const clientData = data.clientData;
    const extratoData = data.extratoData;
    const payments = extratoData.payments || [];
    // Inicializa as datas mínima e máxima com valores extremos
    let minDate = new Date('9999-12-31');
    let maxDate = new Date('0000-01-01');

    // Encontra as datas mínima e máxima nos registros de vendas
    Object.values(extratoData).forEach(record => {
        const saleDate = new Date(record.sale_date);

        if (saleDate < minDate) {
            minDate = saleDate;
        }
        if (saleDate > maxDate) {
            maxDate = saleDate;
        }
    });

    // Encontra as datas mínima e máxima nos registros de pagamentos
    payments.forEach(payment => {
        const paymentDate = new Date(payment.payment_date);

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

    //-------------------------------------------------------
    // Acesso aos dados do cliente
    const clientName = clientData.client_name;
    const clientEmail = clientData.client_email;
    const clientAddress = clientData.address;
    const clientCity = clientData.city;
    const clientPhone = clientData.phone;
    const clientAmount = clientData.debit_amount;
    // Exemplo de como utilizar os dados dos clientes
    let tableHTML =
            '<html> '+
            '<head> '+
                '<title>Extrato</title> '+
                '<link rel="preconnect" href="https://fonts.googleapis.com">'+
                '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'+
                '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Readex+Pro:wght@160..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">'+
                '<link rel="stylesheet" href="media/css/estilos.css"> '+
                '<link rel="icon" href="media/img/icones/toothIcone.png">'+
            '</head> '+
            '<body> '+
                '<header> '+
                    '<div class="logoMarca"> '+
                        '<figure> '+
                            ' <img src="media/img/denteJoia.png" alt=""> '+
                        '</figure> '+
                        '<div class="logoTipo"> '+
                            '<h1>L.J. - Laboratório de <em>Prótese Dentária Joia</em></h1> '+
                            '<address> '+
                                '<p>RUA VICENTE PEREIRA DE ASSUNÇÃO, 134 | CEP - 04658000 - VL CONTÂNCIA</p> '+
                                '<p>CONTATO: (11) 99836-17314 (11) 94945-2727</p> '+
                            '</address> '+
                        '</div> '+
                    ' </div> '+
                '</header> '+
                '<main> ' +
                    "<div class='impressaoContainer'>" +
                        "<div class='impressaoTabela'>" +
                            "<h1>Extrato</h1>" +
                            "<div class='dataVenda'>" +
                                "<span>" + minDateBR + "</span>" +
                                "<span>à " + maxDateBR + "</span>" +
                            "</div>" +
                            "<div class='dadosContainer'>" +
                                "<div class='divisaoDadosContainer'>" +
                                    "<span>Cliente: " + clientName + "</span>" +
                                    "<span>Endereço: " + clientAddress + ", "+ clientData.number + ", "+ clientData.neighborhood +", "+ clientCity + "</span>" +
                                    
                                "</div>" +
                                "<div class='divisaoDadosContainer'>" +
                                    "<span>Email: " + clientEmail + "</span>" +
                                    "<span>Telefone: " + clientPhone + "</span>" +
                                "</div>" +
                            "</div>";
    tableHTML +=
                    '<div class="impressaoTabela"> ' +
                        "<table class='tabelaExtrato tabelaExtratoFinal'>" +
                            "<tr>" +
                                "<th>ID</th>" +
                                "<th>Data</th>" +
                                "<th>Observação</th>" +
                                "<th>Produtos</th>" +
                                "<th>Preço (qt. x un.)</th>" +
                                "<th>Total</th>" +
                                "<th>Saldo Anterior</th>" +
                                "<th>Saldo Atual</th>" +
                            "</tr>";

    // Cria um objeto para rastrear pedidos agrupados por sale_id
    let groupedOrders = {};

    // Loop através dos dados e agrupa os pedidos pelo sale_id
    for (let key in extratoData) {
        if (extratoData.hasOwnProperty(key) && typeof extratoData[key] === 'object' && extratoData[key].length === undefined) {
            const saleId = extratoData[key].sale_id;

            // Se o sale_id já existir no objeto, adiciona o produto ao array existente
            if (groupedOrders.hasOwnProperty(saleId)) {
                groupedOrders[saleId].products.push({
                    product_name: extratoData[key].product_name,
                    price: extratoData[key].price,
                    quantity: extratoData[key].quantity,
                });
            } else {
                // Se o sale_id não existir, cria uma nova entrada no objeto
                groupedOrders[saleId] = {
                    sale_id: extratoData[key].sale_id,
                    sale_date: extratoData[key].sale_date,
                    observation: extratoData[key].observation,
                    products: [{
                        product_name: extratoData[key].product_name,
                        price: extratoData[key].price,
                        quantity: extratoData[key].quantity,
                    }],
                    total_amount: extratoData[key].total_amount,
                    saldo_anterior: extratoData[key].saldo_anterior,
                    debito: extratoData[key].debito,
                };
            }
        }
    }

    // Mescla os arrays de pagamentos e vendas
    let allRecords = [...payments, ...Object.values(groupedOrders)];

    // Ordena todos os registros (pedidos e pagamentos) por data em ordem decrescente
    allRecords.sort((a, b) => new Date(a.sale_date || a.payment_date) - new Date(b.sale_date || b.payment_date));

    // Loop através dos registros e adiciona as linhas à tabela
    for (let i = 0; i < allRecords.length; i++) {
        let record = allRecords[i];

        // Formata a data do registro de acordo com o formato local 'pt-BR'
        let formattedRecordDate = new Date(record.sale_date || record.payment_date).toLocaleDateString('pt-BR');

        // Adiciona uma nova linha à tabela
        tableHTML += "<tr>";
        tableHTML += "<td>" + (record.sale_id || record.payment_id) + "</td>";
        tableHTML += "<td>" + formattedRecordDate + "</td>";

        if (record.payment_id !== undefined) {
            // Se for um pagamento
            tableHTML += "<td>Pagto.: <em style='display: block'>" + record.type_of_payment + "</em></td>";
            tableHTML += "<td></td>";  // Coluna 'Produtos' vazia para pagamento
            tableHTML += "<td></td>";  // Coluna 'Preço (U)' vazia para pagamento
            tableHTML += "<td>" + parseFloat(record.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
            tableHTML += "<td>" + parseFloat(record.saldo_anterior).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
            tableHTML += "<td>" + parseFloat(record.debito).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
        } else {
            // Se for uma venda
            tableHTML += "<td> Pac.: <em style='display: block'>" + record.observation + "</em></td>";

            // Adiciona os produtos à célula "Produtos"
            tableHTML += "<td>";
            for (let j = 0; j < record.products.length; j++) {
                tableHTML += record.products[j].product_name + "<br>";
            }
            tableHTML += "</td>";

            // Adiciona o preço e a quantidade na célula "Preço (U)"
            tableHTML += "<td>";
            for (let j = 0; j < record.products.length; j++) {
                tableHTML +=   record.products[j].quantity + " x " + "R$ " + (record.products[j].price / record.products[j].quantity).toFixed(2) + "<br>";
            }
            tableHTML += "</td>";

            tableHTML += "<td>" + parseFloat(record.total_amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
            tableHTML += "<td>" + parseFloat(record.saldo_anterior).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
            tableHTML += "<td>" + parseFloat(record.debito).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>";
        }

        tableHTML += "</tr>";
                    
            
    }

    // Abre uma nova aba com a tabela gerada
    let novaAba = window.open('');
    novaAba.document.write( tableHTML + 
                            "</table>" +
                        "</div>" +
                        "<div class='saldoClientContainer'>" +
                            "<span>Débito atual: <em>R$ "+ clientAmount +"</em></span>"+
                        "</div>"+
                    "</div>" +
                "</div>"+
            "</main>" +
        "<script>\
        setTimeout(function() {\
        window.print();\
        }, 1000);\
        </script></body>" +
    "</html>"
    );
    novaAba.document.close();
}
// Função para habilitar ou desabilitar o input com base na existência do ID
function atualizaInput() {
    let input = document.getElementById("client");
    let input2 = document.getElementById("paciente");
    let botao = document.getElementById("botaovendas");
    // Verifica se o elemento com o ID "meuElemento" existe
    if (document.getElementById("existe")) {
        // Se existir, desabilita o input
        input.disabled = true;
        input2.disabled = true;
    } else {
        // Se não existir, habilita o input
        input.disabled = false;
        input2.disabled = false;
    }

    if(document.getElementById("existe") && botao){
        botao.disabled = false;
    }
    else{
        botao.disabled = true;
    }
}

function confirmPayment() {
    // Display a confirmation dialog
    let result = confirm("Atualizar debito do cliente?");
    
    // If user clicks OK, return true to submit the form
    // If user clicks Cancel, return false to prevent form submission
    return result;
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