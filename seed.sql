INSERT INTO categories (id, name, slug) VALUES
('cat_1', 'Electronics', 'electronics'),
('cat_2', 'Clothing', 'clothing'),
('cat_3', 'Books', 'books');

INSERT INTO products (id, category_id, name, slug, description, price, stock, image_url) VALUES
('prod_1', 'cat_1', 'Wireless Headphones', 'wireless-headphones', 'High quality wireless headphones with noise cancellation.', 99.99, 50, 'https://example.com/headphones.jpg'),
('prod_2', 'cat_1', 'Smartphone', 'smartphone', 'Latest model smartphone with a great camera.', 799.00, 100, 'https://example.com/smartphone.jpg'),
('prod_3', 'cat_2', 'Cotton T-Shirt', 'cotton-t-shirt', 'Comfortable 100% cotton t-shirt.', 19.50, 200, 'https://example.com/tshirt.jpg'),
('prod_4', 'cat_2', 'Jeans', 'jeans', 'Classic blue denim jeans.', 49.99, 150, 'https://example.com/jeans.jpg'),
('prod_5', 'cat_3', 'Sci-Fi Novel', 'sci-fi-novel', 'Award-winning science fiction novel.', 14.99, 75, 'https://example.com/novel.jpg'),
('prod_6', 'cat_3', 'Cookbook', 'cookbook', 'A collection of delicious recipes.', 24.50, 40, 'https://example.com/cookbook.jpg');
