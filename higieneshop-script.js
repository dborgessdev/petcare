// Função para adicionar um item ao carrinho de compras
    function adicionarItem(id, nome, valor) {
        // Verificar se o item já está no carrinho
        var itemExistente = document.getElementById("cart-item-" + id);
        if (itemExistente) {
            // Se o item já existe, apenas aumente a quantidade
            var quantidadeElement = itemExistente.querySelector(".cart-item-quantity");
            var quantidade = parseInt(quantidadeElement.textContent);
            quantidadeElement.textContent = quantidade + 1;

            // Atualizar o total do carrinho
            atualizarTotal();
        } else {
            // Se o item não existe, crie um novo item no carrinho
            var cartDisplay = document.getElementById("cart-display");
            var novoItem = document.createElement("li");
            novoItem.setAttribute("id", "cart-item-" + id);

            var itemHTML = `
                <span>${nome}</span>
                <span class="cart-item-price">R$${valor}</span>
                <span class="cart-item-quantity">1 und</span>
                <button class="btn-plus" onclick="aumentarQuantidade(${id},${valor})">+</button>
                <button class="btn-minus" onclick="diminuirQuantidade(${id},${valor})">-</button>
                <button class="btn-remove" onclick="removerItem(${id},${valor})">Remover</button>
            `;
            novoItem.innerHTML = itemHTML;
            cartDisplay.appendChild(novoItem);

            // Atualizar o total do carrinho
            atualizarTotal();
        }
    }

    // Função para aumentar a quantidade de um item no carrinho
    function aumentarQuantidade(id, valor) {
        var quantidadeElement = document.getElementById("cart-item-" + id).querySelector(".cart-item-quantity");
        var quantidade = parseInt(quantidadeElement.textContent.split(" ")[0]);
        quantidadeElement.textContent = quantidade + 1 + " unds";

        // Atualizar o total do carrinho
        atualizarTotal();
    }

    // Função para diminuir a quantidade de um item no carrinho
    function diminuirQuantidade(id, valor) {
        var quantidadeElement = document.getElementById("cart-item-" + id).querySelector(".cart-item-quantity");
        var quantidade = parseInt(quantidadeElement.textContent.split(" ")[0]);
        if (quantidade > 1) {
            quantidadeElement.textContent = quantidade - 1 + " unds";

            // Atualizar o total do carrinho
            atualizarTotal();
        }
    }

    // Função para remover um item do carrinho
    function removerItem(id, valor) {
        var itemRemover = document.getElementById("cart-item-" + id);
        itemRemover.parentNode.removeChild(itemRemover);

        // Atualizar o total do carrinho
        atualizarTotal();
    }

    // Função para atualizar o total do carrinho
    function atualizarTotal() {
        var subtotalItens = document.querySelectorAll(".cart-item-price");
        var total = 0;
        subtotalItens.forEach(function (element) {
            total += parseFloat(element.textContent.replace("R$", "")) * parseInt(element.nextElementSibling.textContent.split(" ")[0]);
        });

        document.getElementById("cart-total").textContent = "R$" + total.toFixed(2);
    }

    // Função para finalizar a compra
    function finalizarCompra() {
        alert("Compra finalizada!");
    }

    function buscarEndereco() {
            var cep = document.getElementById('cepInput').value;
            var url = `https://viacep.com.br/ws/${cep}/json/`;
            
            fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.erro) {
                    document.getElementById('endereco').innerText = "CEP não encontrado.";
                } else {
                    var endereco = `CEP: ${data.cep}, ${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
                    document.getElementById('endereco').innerText = endereco;
                }
            })
            .catch(error => console.error('Erro:', error));
        }