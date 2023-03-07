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
varios produtos = muitos carrinhos == relacionamento muitos para muitos

ver relação cliente => pedido
um cliente para muitos pedidos => um para muitos


Observações para criação da inteface de vendas:
* ver como cadastrar um produto atribuido a uma loja especifica e dizer que determinada loja vende aquele produto.
* a nível da API é possível fazer essa implementação a partir do cadastro do produto.

Testando nova mensagem para um novo commit


Então esse commit tem que ir com um amend no-edit
