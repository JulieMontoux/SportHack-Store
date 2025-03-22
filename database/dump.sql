-- Suppression si existantes
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products; 
DROP TABLE IF EXISTS users;

-- Table users
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user'
);

-- Données utilisateurs
INSERT INTO users (email, password, role) VALUES
('admin@sporthack.local', 'admin123', 'admin'),
('user1@mail.com', 'user123', 'user'),
('user2@mail.com', 'user456', 'user');

-- Table products
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  description TEXT,
  price DECIMAL(6,2),
  image VARCHAR(255)
);

-- Données produits
INSERT INTO products (name, description, price, image) VALUES
('Chaussures de Running', 'Chaussures légères pour course sur route.', 79.99, 'https://via.placeholder.com/400x250?text=Running'),
('Ballon de Football', 'Ballon officiel taille 5 résistant.', 24.50, 'https://via.placeholder.com/400x250?text=Football'),
('Raquette de Tennis', 'Raquette en graphite idéale pour débutants.', 49.90, 'https://via.placeholder.com/400x250?text=Tennis'),
('Tapis de Yoga', 'Tapis antidérapant confortable.', 18.99, 'https://via.placeholder.com/400x250?text=Yoga'),
('Gants de musculation', 'Gants rembourrés pour séances de fitness.', 14.99, 'https://via.placeholder.com/400x250?text=Fitness');

-- Table orders
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  date DATETIME,
  total DECIMAL(8,2),
  status VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Données commandes
INSERT INTO orders (user_id, date, total, status) VALUES
(1, NOW(), 79.99, 'Livrée'),
(2, NOW(), 49.90, 'En cours'),
(3, NOW(), 24.50, 'Annulée');

-- Table comments
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user VARCHAR(255),
  content TEXT,
  product_id INT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Données commentaires
INSERT INTO comments (user, content, product_id) VALUES
('user1', 'Super produit ! Merci beaucoup', 1),
('admin', '<script>alert("XSS vulnérable !")</script>', 2),
('user2', 'Très bon rapport qualité/prix', 3);

-- Table scores
CREATE TABLE scores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  label VARCHAR(255),
  date DATETIME DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Données de test
INSERT INTO scores (user_id, label) VALUES
(1, 'SQL Injection réussie'),
(1, 'XSS démontrée'),
(2, 'Connexion brute force'),
(3, 'Accès admin non autorisé'),
(1, 'Mot de passe faible détecté');
