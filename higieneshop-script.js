var cart = {}; // Carrinho de compras

// Função para adicionar item ao carrinho
function adicionarItem(nome, valor) {
    if (cart[nome]) {
        cart[nome].quantidade++;
    } else {
        cart[nome] = { quantidade: 1, valor: valor };
    }
    atualizarCarrinho();
}

// Função para adicionar uma unidade de um item no carrinho
function adicionarUnidade(nome) {
    if (cart[nome]) {
        cart[nome].quantidade++;
        atualizarCarrinho();
    }
}

// Função para remover uma unidade de um item no carrinho
function removerUnidade(nome) {
    if (cart[nome] && cart[nome].quantidade > 1) {
        cart[nome].quantidade--;
        atualizarCarrinho();
    }
}

// Função para remover um item do carrinho
function removerItem(nome) {
    if (cart[nome]) {
        delete cart[nome];
        atualizarCarrinho();
    }
}

// Função para atualizar o carrinho na interface
function atualizarCarrinho() {
    var cartDisplay = document.getElementById("cart-display");
    var total = 0;
    cartDisplay.innerHTML = ""; // Limpar o conteúdo atual do carrinho

    // Percorrer cada item no carrinho
    for (var item in cart) {
        var li = document.createElement("li");
        li.textContent = item + " - R$" + (cart[item].valor * cart[item].quantidade) + " (" + cart[item].quantidade + " unidades)";
        cartDisplay.appendChild(li);
        total += cart[item].valor * cart[item].quantidade;

        // Adiciona botões de adicionar e remover unidades
        var btnAddUnit = document.createElement("button");
        btnAddUnit.textContent = "+";
        btnAddUnit.onclick = function() { adicionarUnidade(item); };
        li.appendChild(btnAddUnit);

        var btnRemoveUnit = document.createElement("button");
        btnRemoveUnit.textContent = "-";
        btnRemoveUnit.onclick = function() { removerUnidade(item); };
        li.appendChild(btnRemoveUnit);

        var btnRemoveItem = document.createElement("button");
        btnRemoveItem.textContent = "Remover";
        btnRemoveItem.onclick = function() { removerItem(item); };
        li.appendChild(btnRemoveItem);
    }

    // Atualizar o total
    document.getElementById("cart-total").textContent = "R$" + total.toFixed(2);
}

// Função para finalizar a compra (limpa o carrinho)
function finalizarCompra() {
    cart = {}; // Limpar carrinho
    atualizarCarrinho();
    alert("Compra finalizada!");
}