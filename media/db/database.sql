--1 Baixar XAMPP, criar pasta na HTDOCS (laboratorioJoia) e colocar os arquivos nela. Depois navegar no: [`localhost](http://localhost)/laboratorioJoia` ou `127.0.0.1/laboratorioJoia` para acessar o arquivo PHP.
--2 Ao abrir o XAMPP, ligar o Apache e MySQL.
--3 Entrar na aba `phpmyadmin` > `criar novo` “laboratoriojoia” > `acessar` “laboratoriojoia” > `SQL` > colar script e executar.


-- Create Clients table
CREATE TABLE Clients (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(20) NOT NULL,
    address VARCHAR(255),
    number VARCHAR(20),
    complement VARCHAR(255),
    neighborhood VARCHAR(255),
    city VARCHAR(255),
    zipcode VARCHAR(20),
    debit_amount DECIMAL(10, 2) DEFAULT 0.00,
		status VARCHAR(10) DEFAULT 'ativado'
);

-- Create Products table
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    price_type_1 DECIMAL(10, 2) NOT NULL,
    price_type_2 DECIMAL(10, 2),
    price_type_3 DECIMAL(10, 2),
    price_type_4 DECIMAL(10, 2),
    price_type_5 DECIMAL(10, 2),
    price_type_6 DECIMAL(10, 2),
		status VARCHAR(10) DEFAULT 'ativado'
);

-- Create SalesHistory table
CREATE TABLE saleshistory (
    sale_id INT(11) PRIMARY KEY AUTO_INCREMENT,
    client_id INT(11),
    sale_date DATETIME,
    total_amount DECIMAL(10,2),
    saldo_anterior DECIMAL(10,2),
    debito DECIMAL(10,2),
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

-- Create SalesDetails table
CREATE TABLE SalesDetails (
    sale_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    observation VARCHAR(255),
    FOREIGN KEY (sale_id) REFERENCES SalesHistory(sale_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- criação da clientPayments table
CREATE TABLE clientPayments (
    payment_id INT(11) PRIMARY KEY AUTO_INCREMENT,
    client_id INT(11),
    payment_date DATETIME,
    amount DECIMAL(10,2),
    type_of_payment VARCHAR(255),
    saldo_anterior DECIMAL(10,2),
    saldo_atual DECIMAL(10,2),
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

-- criação da users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- adiciona um usuario para mexer no sistema, só trocar o usuario e senha:
INSERT INTO users (username, password) VALUES
('usuario1', 'senha123'),

-- Add mock data

-- Clients
INSERT INTO Clients (client_name, client_email, phone, cpf_cnpj, address, number, complement, neighborhood, city, zipcode)
VALUES 
    ('John Doe', 'john@example.com', '123-456-7890', '123.456.789-01', '123 Main St', '101', 'Apt 1', 'Downtown', 'New York', '10001'),
    ('Jane Smith', 'jane@example.com', '987-654-3210', '987.654.321-02', '456 Elm St', '202', '', 'Uptown', 'Los Angeles', '90001'),
    ('Michael Johnson', 'michael@example.com', '111-222-3333', '111.222.333-03', '789 Oak St', '303', '', 'Midtown', 'Chicago', '60601'),
    ('Emily Davis', 'emily@example.com', '444-555-6666', '444.555.666-04', '321 Pine St', '404', '', 'Westside', 'Houston', '77002'),
    ('William Brown', 'william@example.com', '777-888-9999', '777.888.999-05', '654 Maple St', '505', '', 'Eastside', 'Philadelphia', '19103'),
    ('Emma Wilson', 'emma@example.com', '123-456-7890', '123.456.789-06', '987 Birch St', '606', '', 'Northside', 'Phoenix', '85001'),
    ('Daniel Taylor', 'daniel@example.com', '987-654-3210', '987.654.321-07', '753 Walnut St', '707', '', 'Southside', 'San Antonio', '78205'),
    ('Olivia Martinez', 'olivia@example.com', '111-222-3333', '111.222.333-08', '852 Cedar St', '808', '', 'Central', 'San Diego', '92101'),
    ('James Anderson', 'james@example.com', '444-555-6666', '444.555.666-09', '159 Pineapple St', '909', '', 'Downtown', 'Dallas', '75201'),
    ('Sophia Thomas', 'sophia@example.com', '777-888-9999', '777.888.999-10', '753 Cherry St', '1010', '', 'Uptown', 'San Francisco', '94102');



--drop table é usado exclusivamente para apagar as tabelas do banco de dados. 

-- Drop SalesDetails Table
DROP TABLE IF EXISTS SalesDetails;

-- Drop SalesHistory Table
DROP TABLE IF EXISTS SalesHistory;

-- Drop Products Table
DROP TABLE IF EXISTS Products;

-- Drop ClientPayments Table
DROP TABLE IF EXISTS ClientPayments;

-- Drop Clients Table
DROP TABLE IF EXISTS Clients;

-- Drop users Table
DROP TABLE IF EXISTS users;