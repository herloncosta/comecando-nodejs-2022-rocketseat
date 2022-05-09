const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();
app.use(express.json());

// simulando banco de dados
let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        products = JSON.parse(data);
    }
});

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

    updateProductFile();

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

    updateProductFile();

    return response.json({ message: "Produto alterado com sucesso! " });
});

// remover produtos por id
app.delete("/products/:id", (request, response) => {
    const { id } = request.params;
    const productIndex = products.findIndex((item) => item.id === id);

    // remove do array o objeto que possui o índice passado
    products.splice(productIndex, 1);

    updateProductFile();

    return response.json({ message: "Produto removido com sucesso!" });
});

function updateProductFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Produto inserido.");
        }
    });
}

app.listen(4003, () => console.log("Servidor está rodando na porta 4003."));
