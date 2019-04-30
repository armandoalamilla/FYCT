var total;
var productos="";
var nombre;
var apellido;
var ordenID;

$(document).ready(function() {

	console.log("shopConfirmation SCRIPT WAS LOADED");
	//alert("prueba de que js esta corriendo");


	var email = getCookie("email");

	
	var jsonToSend = {
			"email" : email
	};

	

		$.ajax({

			url: "/ShopConfirmationAction",
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

					//alert("entro el for cantidad de informacion:" + dataReceived.CartInformation[0].Colonia);
					var subtotalGeneral = 0;
					var colonia = dataReceived.CartInformation[0].Colonia;
					var estado = dataReceived.CartInformation[0].Estado;
					var pais = dataReceived.CartInformation[0].Pais;
					var numero = dataReceived.CartInformation[0].Numero;
					var calle = dataReceived.CartInformation[0].Calle;

					$("#info").append( "<p> Calle: "+calle+"</p>");
					$("#info").append( "<p> Colonia: "+colonia+"</p>");
					$("#info").append( "<p> Estado: "+estado+"</p>");
					$("#info").append( "<p> Pais: "+pais+"</p>");
					$("#info").append( "<p> Telefono de Usuario: "+numero+"</p>");

					for (i = 0; i < dataReceived.CartInformation.length; i++) {

						productos += (i+1) + ". " + dataReceived.CartInformation[i].Nombre + " ";
						

						



						subtotalGeneral = subtotalGeneral + dataReceived.CartInformation[i].Cantidad * dataReceived.CartInformation[i].Precio;
						var newElement = " <div class='col s6'> " +
       									 "	<div class='card-panel cyan darken-1 hoverable'>" +
        								 " <h5 class='white-text'>"+ dataReceived.CartInformation[i].Nombre +"</h5> " +
                                         " <div class='row'>" +
									     " <div class='col s6'>" +
									     " <img id='imagen_tenis' class='circle responsive-img' src="+ dataReceived.CartInformation[i].Ubicacion +"  >" +
									     " </div> " +
									     " <div class='col s6'>" +
									     " <span class='white-text left-align'>Cantidad comprada: "+ dataReceived.CartInformation[i].Cantidad +"</span>" +
									     " </div>" +	
									     " </div>" +
									     " </div>" +
									     " </div>";

						$("#tenisCards").append(newElement);

					}

						$("#totalF").append( "$" + subtotalGeneral + ".00 MXN");
						total = subtotalGeneral;

					

			}

		});


});

paypal.Buttons({

  style: {
                layout: 'horizontal',
                shape: 'pill',
                color: 'black'
            },

    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total
          },

          description : productos       

         
        }]
      });
    },
    onApprove: function(data, actions) {     
      

      // se obtionon los fondos de la cuenta
      return actions.order.capture().then(function(details) {
        // mensaje de exito para la compra
         nombre = details.payer.name.given_name;
         apellido = details.payer.name.surname;    
         ordenID = data.orderID;
        alert("Gracias por tu compra (nombre paypal) " + nombre + " " + apellido);        
        alert("ID de orden " + ordenID);
        window.location.replace("/");   


             
       
             
      });
      
    }
    
   /* onCancel: function (data, actions) {

      alert("Compra cancelada, no se te hizo el cargo ");   


    }, */




  }).render('#paypal-button-container');



