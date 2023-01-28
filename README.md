## API e-commerce

Tecnologias utilizadas:

- Node com Express JS - para criação do backend
- MongoDB - para banco de dados
  bibliotecas:
  - nodemon
  - mongoose
  - dotenv

## Modelagem de dados

cliente se relaciona com um produto para isso é preciso um carrinho
col products <=== col carrinho <=== col customers

1 cliente = 1 carrinho / 1 carrinho = 1 carrinho == relacionamento 1 para 1
