$(document).ready(function() {
  var nameCookie = getCookie("name");

  $(".modal").modal();
  $('.tabs').tabs();
  $('.tooltipped').tooltip();

  console.log("name cookie: " + nameCookie);
  //alert("email cookie: " + emailCookie);
  document.getElementById("saludoAdmin").innerHTML = nameCookie;

  $("#añadirProducto").click(function(e) {
    e.preventDefault();
    console.log("Añadir Producto BUTTON WAS CLICKED");
    AñadeProducto();
  });

$("#clickFoto").click(function(e) {
    e.preventDefault();
    console.log("Tab Fotografia WAS CLICKED");
    AñadeProducto();
  });

});

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function AñadeProducto() {
  //alert("se añadio el producto!");
  var nombre = $("#nombreProducto").val();
  var precio = $("#precioProducto").val();
  var descripcion = $("#descripcionProducto").val();
  var cantidad = $("#cantidadProducto").val();
  var categoria = $("#categoriaProducto").val();

  var jsonToSend = {
    nombre: nombre,
    precio: precio,
    descripcion: descripcion,
    cantidad: cantidad,
    categoria: categoria
  };

  $.ajax({
    url: "/upload",
    cache: false,
    type: "POST",
    crossDomain: true,
    data: jsonToSend,
    ContentType: "text/plain",
    dataType: "json",

    error: function(errorMessage, textStatus, errorThrown) {
      console.log(errorMessage);
      console.log(textStatus);
      console.log(errorThrown);
    },

    success: function(dataReceived) {
      console.log("Data that was received from the server: ");
      alert("Producto Añadido a la base de datos");
    }
  });
}

function addFotografia(){

}
