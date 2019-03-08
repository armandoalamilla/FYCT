$(document).ready(function() {

	
	$.ajax({

			url: "/MostSoldProducts",
			cache : false,
		    crossDomain: true,
			dataType : "json",

			error : function(errorMessage, textStatus, errorThrown) {
		        console.log(errorMessage);
		        console.log(textStatus);
		        console.log(errorThrown);
			},

			success: function(dataReceived){

					console.log("Data that was received from the server: ");

					/*
					if (dataReceived.ImagesInformation.length >= 1)
						alert("Ubicacion del producto 1: " + dataReceived.ImagesInformation[0].Ubicacion);*/

					for (i = 0; i < dataReceived.ImagesInformation.length; i++) { 
	 					 
	 					
		                 var newElement = "<div id='" + dataReceived.ImagesInformation[i].IDProducto + "' class='row'>" +
                                          "<div class='col s12 m6'><div class='card'><div class='card-image'><img src='" + 
                                          dataReceived.ImagesInformation[i].Ubicacion + "'><span class='card-title'>" + 
                                          dataReceived.ImagesInformation[i].Nombre + "  $" + dataReceived.ImagesInformation[i].Precio + "</span>" +
                                          "<a class='btn-floating halfway-fab waves-effect waves-light red'>" + 
                                          "<i class='material-icons'>add_shopping_cart</i></a></div><div class='card-content'>" +
                                          "<p>Ventas: " + dataReceived.ImagesInformation[i].Ventas + "</br>"+ 
                                          dataReceived.ImagesInformation[i].Descripcion + "</p></div></div></div></div>";


						$("#product_container").append(newElement);
	


					}

				
										   
			}

		});

});