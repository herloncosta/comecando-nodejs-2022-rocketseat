const express = require("express");
const { randomUUID } = require("crypto");

const app = express();
app.use(express.json());

// simulando banco de dados
const products = [];

/*
GET -> buscar um registro
POST -> inserir um registro
PUT -> alterar um registro
DELETE -> excluir um registro
*/

/*
body -> sempre que eu quiser enviar dados para uma aplicação
params -> parâmetros passados em uma rota /products/something...
query -> parâmetros que fazem parte da rota mas não são obrigatórios
/products/something?id=135151&value=gsfg415a1ga
*/

// cadastrar produtos
app.post("/products", (request, response) => {
    // nome e preço => name e price
    const { name, price } = request.body;
    const product = {
        name,
        price,
        id: randomUUID().slice(0, 6),
    };

    products.push(product);

    return response.json(products);
});

// listar produtos
app.get("/products", (_, response) => {
    return response.json(products);
});

// ler produtos por id
app.get("/products/:id", (request, response) => {
    const { id } = request.params;
    const product = products.find((item) => item.id === id);

    return response.json(product);
});

// alterar produtos por id
app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;
    const productIndex = products.findIndex((item) => item.id === id);

    // reatribuição de valores do objeto que possui o índice passado
    products[productIndex] = { ...products[productIndex], name, price };

    return response.json({ message: "Produto alterado com sucesso! " });
});

// remover produtos por id
app.delete("/products/:id", (request, response) => {
    const { id } = request.params;
    const productIndex = products.findIndex((item) => item.id === id);

    // remove do array o objeto que possui o índice passado
    products.splice(productIndex, 1);

    return response.json({ message: "Produto removido com sucesso!" });
});

app.listen(4002, () => console.log("Servidor está rodando na porta 4002."));
