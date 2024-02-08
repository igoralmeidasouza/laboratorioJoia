<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>laboratorio Joia</title>
    <link rel="stylesheet" href="media/css/estilosLogin.css">
    <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="/laboratorioJoia/media/js/script.js"></script>

</head>
<body>
    <?php
    include 'dbConnection.php'; // Conexão com o banco de dados
    // Inicia a sessão
    session_start();
    $error = "";
    // Verifica se o usuário já está logado e redireciona para a página principal
    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
        header("Location: index.php");
        exit;
    }

    // Verifica se o formulário foi submetido
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Verifica se os campos de usuário e senha foram preenchidos
        if (isset($_POST['username']) && isset($_POST['password'])) {
            // Consulta SQL para verificar o usuário e a senha
            $username = $_POST['username'];
            $password = $_POST['password'];
            $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
            $result = $conn->query($sql);
    
            if ($result->num_rows == 1) {
                // Usuário autenticado com sucesso
                $_SESSION['logged_in'] = true;
                $_SESSION['username'] = $username;
                header("Location: index.php"); // Redireciona para a página principal
                exit;
            } else {
                // Nome de usuário ou senha incorretos
                $error = "Nome de usuário ou senha incorretos";
            }
    
            // Fechar conexão com o banco de dados
            $conn->close();
        } else {
            // Campos de entrada em branco
            $error = "Por favor, preencha todos os campos";
        }
    } else {
        // Se o formulário não foi submetido, exibe uma mensagem de erro
        $error = "";
    }

    ?>
    <div class="telaLogin">
        <figure>
            <img src="media/img/denteJoia.png" alt="">
            <h1>Laboratório Jóia</h1>
        </figure>
        <div class="login">
            <p>Login</p>
            <form method="post" action="login.php">
                <?php if (isset($error)): ?>
                <p style="color: red;"><?php echo $error; ?></p>
                <?php endif; ?>
                <div>
                    <input type="text" name="username" id="username" placeholder="Nome de usuário" required>
                    <label for="username">Nome de usuário</label>
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder="Senha" required>
                    <label for="password">Senha</label>
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    </div>
</body>
</html>