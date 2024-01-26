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


