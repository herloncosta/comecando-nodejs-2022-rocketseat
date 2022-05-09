const http = require("http");

http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });

    if (request.url === "/produtos") {
        response.write(
            JSON.stringify({
                message: "Rota de produtos",
            })
        );
    }

    if (request.url === "/usuarios") {
        response.write(
            JSON.stringify({
                message: "Rota de usuários",
            })
        );
    }

    response.end(
        JSON.stringify({
            message: "Qualquer outra rota.",
        })
    );
}).listen(4001, () => console.log("Servidor está rodando na porta 4001."));
