/* =====================================================
   PRODUTOS
   =====================================================

   DEPOIS, QUANDO TIVER AS PEÇAS REAIS,
   É SÓ EDITAR ESTA PARTE.

*/

const produtos = [

    {
        id: 1,

        nome: "Blusa Elegance",

        preco: 59.90,

        imagem: "produtos/blusa-1.jpg",

        cores: [
            "Marrom",
            "Preto",
            "Bege"
        ],

        tamanhos: [
            "P",
            "M",
            "G",
            "GG"
        ]
    },


    {
        id: 2,

        nome: "Blusa Essencial",

        preco: 69.90,

        imagem: "produtos/blusa-2.jpg",

        cores: [
            "Bege",
            "Preto"
        ],

        tamanhos: [
            "P",
            "M",
            "G"
        ]
    },


    {
        id: 3,

        nome: "Blusa Classic",

        preco: 79.90,

        imagem: "produtos/blusa-3.jpg",

        cores: [
            "Marrom",
            "Branco"
        ],

        tamanhos: [
            "M",
            "G",
            "GG"
        ]
    },


    {
        id: 4,

        nome: "Blusa Charm",

        preco: 64.90,

        imagem: "produtos/blusa-4.jpg",

        cores: [
            "Preto",
            "Bege",
            "Marrom"
        ],

        tamanhos: [
            "P",
            "M",
            "G"
        ]
    }

];


/* =====================================================
   CARRINHO
===================================================== */

let carrinho = [];


/* =====================================================
   PRODUTOS
===================================================== */

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
                onerror="this.style.visibility='hidden'"
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
                    onclick="abrirProduto(${produto.id})">

                    Escolher peça

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =====================================================
   MODAL
===================================================== */

let produtoSelecionado = null;

let corSelecionada = "";

let tamanhoSelecionado = "";

let quantidadeSelecionada = 1;


function abrirProduto(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );


    if (!produto) return;


    produtoSelecionado = produto;

    corSelecionada = "";

    tamanhoSelecionado = "";

    quantidadeSelecionada = 1;


    const modal =
        document.createElement("div");


    modal.id = "productModal";

    modal.className =
        "product-modal-overlay";


    modal.innerHTML = `

        <div class="product-modal">

            <button
                class="modal-close"
                onclick="fecharProduto()">

                ×

            </button>


            <img
                class="modal-product-image"
                src="${produto.imagem}"
                alt="${produto.nome}"
                onerror="this.style.visibility='hidden'"
            >


            <h2 class="modal-product-name">
                ${produto.nome}
            </h2>


            <p class="modal-product-price">
                ${formatarPreco(produto.preco)}
            </p>


            <div class="option-title">
                Escolha a cor
            </div>


            <div class="options">

                ${produto.cores.map(
                    cor => `

                    <button
                        class="option"
                        onclick="selecionarCor(this, '${cor}')">

                        ${cor}

                    </button>

                `).join("")}

            </div>


            <div class="option-title">
                Escolha o tamanho
            </div>


            <div class="options">

                ${produto.tamanhos.map(
                    tamanho => `

                    <button
                        class="option"
                        onclick="selecionarTamanho(this, '${tamanho}')">

                        ${tamanho}

                    </button>

                `).join("")}

            </div>


            <div class="option-title">
                Quantidade
            </div>


            <div class="modal-quantity">

                <button
                    onclick="alterarQuantidadeModal(-1)">

                    −

                </button>


                <span id="modalQuantity">
                    1
                </span>


                <button
                    onclick="alterarQuantidadeModal(1)">

                    +

                </button>

            </div>


            <button
                class="modal-add"
                onclick="adicionarProdutoCarrinho()">

                Adicionar ao carrinho

            </button>

        </div>

    `;


    document.body.appendChild(modal);


    setTimeout(() => {

        modal.classList.add("active");

    }, 10);

}


/* =====================================================
   FECHAR MODAL
===================================================== */

function fecharProduto() {

    const modal =
        document.getElementById("productModal");


    if (!modal) return;


    modal.classList.remove("active");


    setTimeout(() => {

        modal.remove();

    }, 300);

}


/* =====================================================
   COR
===================================================== */

function selecionarCor(botao, cor) {

    corSelecionada = cor;


    document
        .querySelectorAll(
            "#productModal .option"
        )
        .forEach(elemento => {

            if (
                elemento.parentElement ===
                botao.parentElement
            ) {

                elemento.classList.remove(
                    "selected"
                );

            }

        });


    botao.classList.add("selected");

}


/* =====================================================
   TAMANHO
===================================================== */

function selecionarTamanho(
    botao,
    tamanho
) {

    tamanhoSelecionado = tamanho;


    document
        .querySelectorAll(
            "#productModal .option"
        )
        .forEach(elemento => {

            if (
                elemento.parentElement ===
                botao.parentElement
            ) {

                elemento.classList.remove(
                    "selected"
                );

            }

        });


    botao.classList.add("selected");

}


/* =====================================================
   QUANTIDADE NO MODAL
===================================================== */

function alterarQuantidadeModal(valor) {

    quantidadeSelecionada += valor;


    if (quantidadeSelecionada < 1) {

        quantidadeSelecionada = 1;

    }


    document.getElementById(
        "modalQuantity"
    ).textContent =
        quantidadeSelecionada;

}


/* =====================================================
   ADICIONAR AO CARRINHO
===================================================== */

function adicionarProdutoCarrinho() {

    if (!corSelecionada) {

        alert(
            "Escolha uma cor."
        );

        return;

    }


    if (!tamanhoSelecionado) {

        alert(
            "Escolha um tamanho."
        );

        return;

    }


    const existente =
        carrinho.find(item =>

            item.produtoId ===
            produtoSelecionado.id &&

            item.cor ===
            corSelecionada &&

            item.tamanho ===
            tamanhoSelecionado

        );


    if (existente) {

        existente.quantidade +=
            quantidadeSelecionada;

    } else {

        carrinho.push({

            produtoId:
                produtoSelecionado.id,

            nome:
                produtoSelecionado.nome,

            preco:
                produtoSelecionado.preco,

            cor:
                corSelecionada,

            tamanho:
                tamanhoSelecionado,

            quantidade:
                quantidadeSelecionada

        });

    }


    atualizarCarrinho();

    fecharProduto();

    abrirCarrinho();

}


/* =====================================================
   ATUALIZAR CARRINHO
===================================================== */

function atualizarCarrinho() {

    const container =
        document.getElementById(
            "cartItems"
        );


    const contador =
        document.getElementById(
            "cartCount"
        );


    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    const quantidadeTotal =
        carrinho.reduce(
            (total, item) =>
                total + item.quantidade,
            0
        );


    contador.textContent =
        quantidadeTotal;


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
        (item, index) => {

            const subtotal =
                item.preco *
                item.quantidade;


            total += subtotal;


            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "cart-item";


            elemento.innerHTML = `

                <div class="cart-item-top">

                    <div>

                        <div class="cart-item-name">
                            ${item.nome}
                        </div>

                        <div class="cart-item-details">

                            Cor: ${item.cor}
                            <br>

                            Tamanho: ${item.tamanho}

                        </div>

                    </div>

                </div>


                <div class="cart-item-bottom">

                    <div class="quantity-control">

                        <button
                            onclick="alterarQuantidadeCarrinho(${index}, -1)">

                            −

                        </button>

                        <span>
                            ${item.quantidade}
                        </span>

                        <button
                            onclick="alterarQuantidadeCarrinho(${index}, 1)">

                            +

                        </button>

                    </div>


                    <strong
                        class="cart-item-price">

                        ${formatarPreco(subtotal)}

                    </strong>

                </div>


                <button
                    class="remove-item"
                    onclick="removerCarrinho(${index})">

                    Remover

                </button>

            `;


            container.appendChild(
                elemento
            );

        }
    );


    totalElement.textContent =
        formatarPreco(total);

}


/* =====================================================
   ALTERAR QUANTIDADE DO CARRINHO
===================================================== */

function alterarQuantidadeCarrinho(
    index,
    valor
) {

    carrinho[index].quantidade +=
        valor;


    if (
        carrinho[index].quantidade <= 0
    ) {

        carrinho.splice(
            index,
            1
        );

    }


    atualizarCarrinho();

}


/* =====================================================
   REMOVER
===================================================== */

function removerCarrinho(index) {

    carrinho.splice(
        index,
        1
    );


    atualizarCarrinho();

}


/* =====================================================
   ABRIR CARRINHO
===================================================== */

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


/* =====================================================
   FECHAR CARRINHO
===================================================== */

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


/* =====================================================
   WHATSAPP
===================================================== */

function finalizarWhatsApp() {

    if (carrinho.length === 0) {

        alert(
            "Adicione pelo menos uma peça ao carrinho."
        );

        return;

    }


    /*
       TROCAR PELO WHATSAPP DA JACI

       Exemplo:

       5583999999999

       Sem +, espaços ou traços.
    */

    const numero =
        "5583999999999";


    let mensagem =
        "Olá, Jaci! Gostaria de fazer um pedido:\n\n";


    let total = 0;


    carrinho.forEach(
        (item, index) => {

            const subtotal =
                item.preco *
                item.quantidade;


            total += subtotal;


            mensagem +=

                `${index + 1}. ${item.nome}\n` +

                `Cor: ${item.cor}\n` +

                `Tamanho: ${item.tamanho}\n` +

                `Quantidade: ${item.quantidade}\n` +

                `Subtotal: ${formatarPreco(subtotal)}\n\n`;

        }
    );


    mensagem +=
        `Total do pedido: ${formatarPreco(total)}\n\n`;


    mensagem +=
        "Gostaria de confirmar a disponibilidade das peças. 🤎";


    const url =
        `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;


    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   FORMATAÇÃO
===================================================== */

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =====================================================
   INICIAR
===================================================== */

mostrarProdutos();

atualizarCarrinho();
