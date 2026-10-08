const produtos = [

    {
        id: 1,
        nome: "Blusa Elegance",
        preco: 59.90,
        imagem: "produtos/blusa-1.jpg"
    },

    {
        id: 2,
        nome: "Blusa Essencial",
        preco: 69.90,
        imagem: "produtos/blusa-2.jpg"
    },

    {
        id: 3,
        nome: "Blusa Classic",
        preco: 79.90,
        imagem: "produtos/blusa-3.jpg"
    },

    {
        id: 4,
        nome: "Blusa Charm",
        preco: 64.90,
        imagem: "produtos/blusa-4.jpg"
    }

];


let carrinho = [];


/* =========================
MOSTRAR PRODUTOS
========================= */

function mostrarProdutos() {

    const container =
        document.getElementById("products");

    container.innerHTML = "";


    produtos.forEach(produto => {

        const card =
            document.createElement("div");

        card.className = "product";


        card.innerHTML = `

            <img
                class="product-image"
                src="${produto.imagem}"
                alt="${produto.nome}"
            >

            <div class="product-info">

                <h3 class="product-name">
                    ${produto.nome}
                </h3>

                <p class="product-price">
                    ${formatarPreco(produto.preco)}
                </p>

                <button
                    class="product-button"
                    onclick="adicionarCarrinho(${produto.id})">

                    Adicionar ao carrinho

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================
ADICIONAR
========================= */

function adicionarCarrinho(id) {

    const produto =
        produtos.find(p => p.id === id);


    if (!produto) return;


    carrinho.push(produto);


    atualizarCarrinho();


    abrirCarrinho();

}


/* =========================
REMOVER
========================= */

function removerCarrinho(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


/* =========================
ATUALIZAR
========================= */

function atualizarCarrinho() {

    const container =
        document.getElementById("cartItems");


    const contador =
        document.getElementById("cartCount");


    const totalElement =
        document.getElementById("cartTotal");


    contador.textContent =
        carrinho.length;


    if (carrinho.length === 0) {

        container.innerHTML = `

            <p class="empty-cart">
                Seu carrinho está vazio.
            </p>

        `;


        totalElement.textContent =
            "R$ 0,00";


        return;

    }


    container.innerHTML = "";


    let total = 0;


    carrinho.forEach(
        (produto, index) => {

            total += produto.preco;


            const item =
                document.createElement("div");


            item.className =
                "cart-item";


            item.innerHTML = `

                <div class="cart-item-info">

                    <h4>
                        ${produto.nome}
                    </h4>

                    <p>
                        ${formatarPreco(produto.preco)}
                    </p>

                </div>


                <button
                    class="remove-item"
                    onclick="removerCarrinho(${index})">

                    Remover

                </button>

            `;


            container.appendChild(item);

        }
    );


    totalElement.textContent =
        formatarPreco(total);

}


/* =========================
ABRIR
========================= */

function abrirCarrinho() {

    document
        .getElementById("cart")
        .classList
        .add("active");


    document
        .getElementById("cartOverlay")
        .classList
        .add("active");

}


/* =========================
FECHAR
========================= */

function fecharCarrinho() {

    document
        .getElementById("cart")
        .classList
        .remove("active");


    document
        .getElementById("cartOverlay")
        .classList
        .remove("active");

}


/* =========================
WHATSAPP
========================= */

function finalizarWhatsApp() {

    if (carrinho.length === 0) {

        alert(
            "Adicione pelo menos uma peça ao carrinho."
        );

        return;

    }


    /*
        COLOQUE AQUI O WHATSAPP DA JACI.

        Exemplo:

        5583999999999

        55 = Brasil
        83 = DDD
        restante = número

        Não coloque:
        +
        espaços
        parênteses
        hífen
    */

    const numero =
        "5583999999999";


    let mensagem =
        "Olá, Jaci! Gostaria de fazer um pedido:\n\n";


    let total = 0;


    carrinho.forEach(
        (produto, index) => {

            total += produto.preco;


            mensagem +=
                `${index + 1}. ${produto.nome} - ${formatarPreco(produto.preco)}\n`;

        }
    );


    mensagem +=
        `\nTotal: ${formatarPreco(total)}\n\n`;


    mensagem +=
        "Gostaria de confirmar a disponibilidade das peças. 🤎";


    const url =
        `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;


    window.open(
        url,
        "_blank"
    );

}


/* =========================
FORMATAR PREÇO
========================= */

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =========================
INICIAR
========================= */

mostrarProdutos();

atualizarCarrinho();
