//Slider && Select Init
$('.dropdown-trigger').dropdown({coverTrigger: false, alignment: 'right', constrainWidth: false, isScrollable: true, closeOnClick: false});

var pictureLocation;

$(document).ready(function(){

    console.log("productDetails script activated");


    $('.slider').slider({height: 500});
    $('select').formSelect();



    var productID = getCookie("productID");

    
    var jsonToSend = {
            "productID" : productID
    };

    $.ajax({

            url: "/SelectedProduct",
            cache : false,
            type : "POST",
            crossDomain: true,
            data : jsonToSend,
            ContentType : "text/plain",
            dataType : "json",

            error : function(errorMessage, textStatus, errorThrown) {
                console.log(errorMessage);
                console.log(textStatus);
                console.log(errorThrown);
                
            },

            success: function(dataReceived){

                    console.log("Data that was received from the server: " + dataReceived.ProductInformation[0].IDProducto + " " +  dataReceived.ProductInformation[0].Nombre);
                    document.getElementById("productTitle").innerHTML = dataReceived.ProductInformation[0].Nombre;
                    document.getElementById("productAvailability").innerHTML = "Disponibilidad: " + dataReceived.ProductInformation[0].Disponibilidad;
                    document.getElementById("productDescription").innerHTML = "Descripcion: " + dataReceived.ProductInformation[0].Descripcion;
                    document.getElementById("productPrice").innerHTML = "Precio: $" + dataReceived.ProductInformation[0].Precio;
                    document.getElementById("productID").innerHTML = dataReceived.ProductInformation[0].IDProducto;
                    pictureLocation = dataReceived.ProductInformation[0].Ubicacion;

                    //alert ("Img ubicacion: " + dataReceived.ProductInformation[0].Ubicacion);

                    for (i = 0; i < dataReceived.ProductInformation.length; i++) { 

                        
                         var newElement = "<li><img id = 'pic" + i + "' src='" + dataReceived.ProductInformation[i].Ubicacion + "'>" +
                                          "<div class='caption center-align'><h5 class='teal-text lighten-2'></h5></div></li>";
                        

                        //var newElement = '<li><img src="https://ss237.liverpool.com.mx/xl/1043934841.jpg"><div class="caption center-align"><h5 class="teal-text lighten-2">Zapato Foto2</h5></div></li>';
                        $("#productPictures").append(newElement);
                        
                    }

                    $('.slider').slider();


                    $("#addToCartBtn").click (function(e){

                        e.preventDefault();
                        console.log("addToCartBtn WAS CLICKED");
                        addToCart();
                        
                    });


            }

        });


    $('.slider').slider();


    //var email = "roberto@mail.com";
    var email = getCookie("email");

    
    var jsonToSend = {
            "email" : email
    };

    $.ajax({

            url: "/CartAction",
            cache : false,
            type : "POST",
            crossDomain: true,
            data : jsonToSend,
            ContentType : "text/plain",
            dataType : "json",

            error : function(errorMessage, textStatus, errorThrown) {
                console.log(errorMessage);
                console.log(textStatus);
                console.log(errorThrown);
                alert("error");
                
            },

            success: function(dataReceived){

                    console.log("Data that was received from the server:---------------------------------- ");
                    //console.log("img: " + dataReceived.CartInformation[0].Ubicacion);
  
                    for (i = 0; i < dataReceived.CartInformation.length; i++) { 

                        var newDropdownElement = "<li id='" + dataReceived.CartInformation[i].IDProducto + "dropdown' class='collection-item avatar'>" +
                                                    "<img src="+ dataReceived.CartInformation[i].Ubicacion +" alt='' class='circle'>"+
                                                     "<div class='row'>"+ 
                                                        "<div class='valign-wrapper col s4'><h5>"+dataReceived.CartInformation[i].Nombre+"</h5></div>"+
                                                        "<div id='carrito_menos' class='col s2'><a onclick='aumentaCant("+ dataReceived.CartInformation[i].IDProducto +  ")' href='#!'><i class='tiny material-icons'>expand_less</i></a></div>"+
                                                        "<div class='valign-wrapper col s1'><h5>"+dataReceived.CartInformation[i].Cantidad+"</h5></div>"+
                                                        "<div id='carrito_mas'class='col s2'><a onclick='disminuyeCant("+ dataReceived.CartInformation[i].IDProducto + ")' href='#!'><i class='tiny material-icons'>expand_more</i></a></div>"+
                                                        "<div class='col s2'> <a onclick='remove("+ dataReceived.CartInformation[i].IDProducto + ")' href='#!' class='secondary-content'><i class='material-icons'>remove_shopping_cart</i></a></div>"+
                                                     "</div>" +
                                                   "</li>"; 


                        
                        $("#dropdown_container").append(newDropdownElement);

                    }

                    

            }

        });


});

// Ahorita estaré haciendo esto y lo de cantidad 
function remove(IDProducto){

    var email = getCookie("email");

    var jsonToSend = {
            "IDProducto" : IDProducto,
            "email" : email
    };

    $.ajax({

            url: "/CartActionRemove",
            cache : false,
            type : "POST",
            crossDomain: true,
            data : jsonToSend,
            ContentType : "text/plain", 
            dataType : "json",

            error : function(errorMessage, textStatus, errorThrown) {
                console.log(errorMessage);
                console.log(textStatus);
                console.log(errorThrown);
            },

            success: function(dataReceived){

                        var dropdownItem = document.getElementById(IDProducto + "dropdown");
                        dropdownItem.parentNode.removeChild(dropdownItem);
                        
            }

        });
}



function aumentaCant(IDProducto){
    var email = getCookie("email");

    var dropdownItem = document.getElementById(IDProducto + "dropdown");

    var Cantidad = parseInt(dropdownItem.childNodes[1].childNodes[2].childNodes[0].innerHTML);


    var jsonToSend = {
            "IDProducto" : IDProducto,
            "email" : email,
            "Cantidad" : Cantidad
    };


    //console.log("Cantidad actual carrito: " + Cantidad);
    //console.log("Cantidad actual dropdown: " + dropdownItem.childNodes[1].childNodes[2].childNodes[0].innerHTML);

    $.ajax({

            url: "/CartActionAddCant",
            cache : false,
            type : "POST",
            crossDomain: true,
            data : jsonToSend,
            ContentType : "text/plain",
            dataType : "json",

            error : function(errorMessage, textStatus, errorThrown) {
                console.log(errorMessage);
                console.log(textStatus);
                console.log(errorThrown);
            },

            success: function(dataReceived){

                    console.log("Data that was received from the server: Aumento");
                    dropdownItem.childNodes[1].childNodes[2].childNodes[0].innerHTML = Cantidad + 1;
                    
            }

        });

}



function disminuyeCant(IDProducto){

    var email = getCookie("email");

    var dropdownItem = document.getElementById(IDProducto + "dropdown");

    var Cantidad = parseInt(dropdownItem.childNodes[1].childNodes[2].childNodes[0].innerHTML);



    var jsonToSend = {
            "IDProducto" : IDProducto,
            "email" : email,
            "Cantidad" : Cantidad
    };


    //alert("aumentando cantidad jsoooooooooooon");

    $.ajax({

            url: "/CartActionSubstractCant",
            cache : false,
            type : "POST",
            crossDomain: true,
            data : jsonToSend,
            ContentType : "text/plain",
            dataType : "json",

            error : function(errorMessage, textStatus, errorThrown) {
                console.log(errorMessage);
                console.log(textStatus);
                console.log(errorThrown);
            },

            success: function(dataReceived){

                    console.log("Data that was received from the server: Aumento");
                    //location.reload();

                    dropdownItem.childNodes[1].childNodes[2].childNodes[0].innerHTML = Cantidad - 1;


                    if (Cantidad - 1 <= 0){

                        dropdownItem.parentNode.removeChild(dropdownItem);

                    }


            }

        });

}















function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}



function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



function addToCart(){

    if (getCookie("email") != ""){

        var email = getCookie("email");
        var Cantidad = document.getElementById("quantitySelect").value;
        var IDProducto = document.getElementById("productID").innerHTML; 

        console.log("email:" + email + ".");
        console.log("id producto:" + IDProducto + ".");
        console.log("cantidad:" + Cantidad + ".");

        var jsonToSend = {
                "IDProducto" : IDProducto,
                "email" : email,
                "Cantidad" : Cantidad
        };


        $.ajax({

                url: "/CartInsertProduct",
                cache : false,
                type : "POST",
                crossDomain: true,
                data : jsonToSend,
                ContentType : "text/plain",
                dataType : "json",

                error : function(errorMessage, textStatus, errorThrown) {
                    console.log(errorMessage);
                    console.log(textStatus);
                    console.log(errorThrown);
                },

                success: function(dataReceived){

                        //console.log("Data that was received from the server: Aumento");
                        //location.reload();
                        var dropdownItem = document.getElementById(IDProducto + "dropdown");
                        console.log("dropdownItem content: " + dropdownItem);

                        if (dropdownItem != null){
                            
                            var cantidadVieja = parseInt(dropdownItem.childNodes[1].childNodes[2].childNodes[0].innerHTML);
                            dropdownItem.childNodes[1].childNodes[2].childNodes[0].innerHTML = cantidadVieja + parseInt(Cantidad);

                        } else {

                           // var pictureStuff = document.getElementById("pic0");
                           // var pictureLocation = pictureStuff.getAttribute("src");
                            console.log("picture location: " + pictureLocation);

                            var productName = document.getElementById("productTitle").innerHTML;

                             var newDropdownElement = "<li id='" + IDProducto + "dropdown' class='collection-item avatar'>" +
                                                        "<img src='"+ pictureLocation +"' alt='' class='circle'>"+
                                                         "<div class='row'>"+ 
                                                            "<div class='valign-wrapper col s4'><h5>"+productName+"</h5></div>"+
                                                            "<div id='carrito_menos' class='col s2'><a onclick='aumentaCant("+ IDProducto +  ")' href='#!'><i class='tiny material-icons'>expand_less</i></a></div>"+
                                                            "<div class='valign-wrapper col s1'><h5>"+Cantidad+"</h5></div>"+
                                                            "<div id='carrito_mas'class='col s2'><a onclick='disminuyeCant("+ IDProducto + ")' href='#!'><i class='tiny material-icons'>expand_more</i></a></div>"+
                                                            "<div class='col s2'> <a onclick='remove("+ IDProducto + ")' href='#!' class='secondary-content'><i class='material-icons'>remove_shopping_cart</i></a></div>"+
                                                         "</div>" +
                                                       "</li>"; 


                            
                            $("#dropdown_container").append(newDropdownElement);


                        }

                }

            });

    } else {

            window.location.assign("http://localhost:8080/IniciarSesion");


    }


}