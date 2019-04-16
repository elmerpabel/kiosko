function hacerPedido() {
(function(){
var CloseTime = new Date().getTime();
var CloseValor = encodeURIComponent((simpleCart.ids()).toString()+';'+(function(){
var cadena=[];
simpleCart.each(function(item,x){
cadena.push('\"'+item.get('name')+'\"'+':'+item.get('quantity'))});return cadena})().toString());
var url = 'https://script.google.com/macros/s/AKfycbxvsIAHyGlbrAXZWrZ8_TTbcGjm8hBLktslGYVlQkLOadXsfX8A/exec?CloseTime='+CloseTime+'&CloseValor='+CloseValor;
var sendCart = function(url){
var xhr = new XMLHttpRequest();
xhr.responseType = 'text';
xhr.open('GET', url, true);
xhr.onload = function () {
  console.log(xhr.response);
  console.log(xhr.responseURL);
 };
xhr.send(null);
}
sendCart(url);
}
)();

    let lengthQuantity = document.querySelectorAll(".item-quantity").length;
    let lengthName = document.querySelectorAll(".item-name").length;
    let lengthPrice = document.querySelectorAll(".item-price").length;

    // var producto = [];


    // for (let i = 1; i <= lengthPrice - 1; i++) {
    //     let name = document.querySelectorAll(".item-name")[i].innerHTML;
    //     let price = document.querySelectorAll(".item-price")[i].innerHTML;
    //     let quantity = document.querySelectorAll(".item-quantity")[i].innerHTML;
    //     let color = document.querySelectorAll(".item-color")[i].innerHTML;
    //     let size = document.querySelectorAll(".item-size")[i].innerHTML;

    //     producto.push({name: name, color: color, size: size, quantity: quantity, price: price});
    // }
    var producto = [];
    simpleCart.each(function( item , x ){
    producto.push({name: item.get('name'), color: item.get('color'), size: item.get('size'), quantity: item.get('quantity'), price: item.get('price')} );
    });

    let productos = "";

    let inicio = "Hola estoy usando Kiosko EMM, quiero comprar:";

    for (var key in producto) {
        productos += "\n " + producto[key].quantity + " " + producto[key].name + " DE COLOR " + producto[key].color + " EN TALLA " + producto[key].size + " POR " + producto[key].price + " UNIDAD.";
    }


    //let valor = document.querySelector(".simpleCart_grandTotal").innerHTML;
    let valor = simpleCart.grandTotal();
    let pedido = "\n\nMi pedido total fue por: " + valor.toFixed(2) + "";

    //INSIRA SEU TELEFONE NO FORMATO 55dddNumeroTelefone - EX:5511999999999
    let msg =  "https://api.whatsapp.com/send?phone=51949755480&text=" + encodeURIComponent(inicio + productos + " " + pedido);

    document.querySelector(".button-whats").href = msg;
    
}
