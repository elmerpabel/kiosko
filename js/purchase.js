function hacerPedido() {

    let lengthQuantity = document.querySelectorAll(".item-quantity").length;
    let lengthName = document.querySelectorAll(".item-name").length;
    let lengthPrice = document.querySelectorAll(".item-price").length;

    var producto = [];


    for (let i = 1; i <= lengthPrice - 1; i++) {
        let name = document.querySelectorAll(".item-name")[i].innerHTML;
        let price = document.querySelectorAll(".item-price")[i].innerHTML;
        let quantity = document.querySelectorAll(".item-quantity")[i].innerHTML;
        let color = document.querySelectorAll(".item-color")[i].innerHTML;
        let size = document.querySelectorAll(".item-size")[i].innerHTML;

        producto.push({name: name, color: color, size: size, quantity: quantity, price: price});
    }

    let productos = "";

    let inicio = "Hola estoy usando Kiosko EMM.";

    for (var key in producto) {
        productos += " QUIERO COMPRAR: " + producto[key].quantity + " " + producto[key].name + " DE COLOR " + producto[key].color + " EN TALLA " + producto[key].talla + " POR " + producto[key].price + " UNIDAD.";
    }


    let valor = document.querySelector(".simpleCart_grandTotal").innerHTML;
    let pedido = " Mi pedido total fue: " + valor + ".";

    //INSIRA SEU TELEFONE NO FORMATO 55dddNumeroTelefone - EX:5511999999999
    let msg =  "https://api.whatsapp.com/send?phone=51949755480&text=" + encodeURIComponent(inicio + productos + " " + pedido);

    document.querySelector(".button-whats").href = msg;
    
}