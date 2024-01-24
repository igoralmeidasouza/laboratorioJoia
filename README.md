Criação do banco de dados.

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
    debit_amount DECIMAL(10, 2) DEFAULT 0.00
);

-- Create Products table
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    price_type_1 DECIMAL(10, 2) NOT NULL,
    price_type_2 DECIMAL(10, 2) NOT NULL,
    price_type_3 DECIMAL(10, 2) NOT NULL,
    price_type_4 DECIMAL(10, 2) NOT NULL,
    price_type_5 DECIMAL(10, 2) NOT NULL,
    price_type_6 DECIMAL(10, 2) NOT NULL
);

-- Create SalesHistory table
CREATE TABLE SalesHistory (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    sale_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Clients(client_id)
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

-- Create ClientPayments table
CREATE TABLE ClientPayments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    payment_date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type_of_payment VARCHAR(255),
    FOREIGN KEY (client_id) REFERENCES Clients(client_id)
);

-- Add mock data
-- Clients
INSERT INTO Clients (client_name, client_email, cpf_cnpj, address, number, neighborhood, city, zipcode, debit_amount)
VALUES 
    ('John Doe', 'john@example.com', '123.456.789-01', '123 Main St', 'Apt 101', 'Downtown', 'Cityville', '12345-678', 0.00),
    ('Jane Smith', 'jane@example.com', '987.654.321-01', '456 Oak St', 'Unit 202', 'Suburb', 'Townsville', '54321-876', 30.00),
    ('Bob Johnson', 'bob@example.com', '111.222.333-44', '789 Pine St', 'Suite 303', 'Suburbia', 'Townsville', '98765-432', 50.00),
    ('Alice Williams', 'alice@example.com', '555.666.777-88', '321 Elm St', 'Floor 2', 'Downtown', 'Cityburg', '56789-012', 0.00),
    ('Eva Davis', 'eva@example.com', '333.444.555-66', '567 Pine St', 'Apt 202', 'Suburbia', 'Townsville', '87654-321', 20.00);

-- Products
INSERT INTO Products (product_name, product_description, price_type_1, price_type_2, price_type_3, price_type_4, price_type_5, price_type_6)
VALUES 
    ('Headache Relief', 'Pain reliever for headaches', 5.99, 7.99, 9.99, 11.99, 14.99, 17.99),
    ('Cold & Flu Tablets', 'Relief for cold and flu symptoms', 8.99, 10.99, 12.99, 14.99, 16.99, 19.99),
    ('Vitamin C Supplement', 'Immune system support', 12.99, 14.99, 16.99, 18.99, 20.99, 24.99),
    ('Pain Relief Gel', 'Topical gel for pain relief', 7.99, 9.99, 11.99, 13.99, 16.99, 19.99);

-- SalesHistory and SalesDetails
INSERT INTO SalesHistory (client_id, sale_date, total_amount)
VALUES 
    (1, '2024-01-15', 75.00),
    (2, '2024-01-16', 45.00),
    (3, '2024-01-17', 120.00),
    (4, '2024-01-18', 90.00);

INSERT INTO SalesDetails (sale_id, product_id, quantity, price, observation)
VALUES 
    (1, 1, 2, 10.00, 'Albert - Headache Relief (Resale)'),
    (1, 2, 1, 12.00, 'Albert - Cold & Flu Tablets (Resale)'),
    (1, 3, 1, 9.99, 'Albert - Vitamin C Supplement (Resale)'),
    (2, 1, 3, 8.00, 'William - Headache Relief (Resale)'),
    (3, 2, 3, 15.00, 'Charlie - Cold & Flu Tablets (Resale)'),
    (4, 1, 2, 18.00, 'David - Headache Relief (Resale)');

-- Add mock data to ClientPayments
INSERT INTO ClientPayments (client_id, payment_date, amount, type_of_payment)
VALUES 
    (1, '2024-01-15', 50.00, 'Credito'),
    (2, '2024-01-16', 30.00, 'pix'),
    (3, '2024-01-17', 100.00, 'debito'),
    (4, '2024-01-18', 80.00, 'pix');

-- Display sales history with client names
SELECT SalesHistory.sale_id, Clients.client_name, SalesHistory.sale_date, SalesHistory.total_amount, Clients.debit_amount
FROM SalesHistory
INNER JOIN Clients ON SalesHistory.client_id = Clients.client_id;
