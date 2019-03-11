$(document).ready(function() {

	
	$.ajax({

			url: "/ImagesInfo",
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
	 					 
	 					 var newElement = "<div id= '"+ dataReceived.ImagesInformation[i].IDProducto + "' class='col s4'><div class='card'><div class='card-image waves-effect waves-block waves-light'>" + 
		                 "<img class='activator' src='" + dataReceived.ImagesInformation[i].Ubicacion +"'></div>" + 
		                 "<div class='card-content'><span class='card-title activator grey-text text-darken-4'>" + dataReceived.ImagesInformation[i].Nombre + "  $" + dataReceived.ImagesInformation[i].Precio  + "<i class='material-icons right'>more_vert</i></span></div>" + 
		                 "<div class='card-reveal'><span class='card-title grey-text text-darken-4'>"+ dataReceived.ImagesInformation[i].Nombre + "<i class='material-icons right'>close</i></span><p>"+ dataReceived.ImagesInformation[i].Descripcion + "</p></div></div></div>";    
		
						$("#product_container").append(newElement);
	


					}


					//Trigger del DropDown
					$('.dropdown-trigger').dropdown({coverTrigger: false, alignment: 'right', constrainWidth: false });

					var carrCant = 1;

					var carrElement = "<li class='collection-item avatar'>" +
						"<img src='https://ss237.liverpool.com.mx/xl/1043934841.jpg' alt='' class='circle'>"+
					     "<div class='row'>"+ 
					        "<div class='valign-wrapper col s4'><h5>ZapatoTest</h5></div>"+
					        "<div id='carrito_menos' class='col s2'><a><i class='tiny material-icons'>expand_less</i></a></div>"+
					        "<div class='valign-wrapper col s1'><h5>"+carrCant+"</h5></div>"+
					        "<div id='carrito_mas'class='col s2'><a><i class='tiny material-icons'>expand_more</i></a></div>"+
					        "<div class='col s2'> <a href='#!' class='secondary-content'><i class='material-icons'>remove_shopping_cart</i></a></div>"+
					     "</div>" +
					   "</li>";

					$("#dropdown_container").append(carrElement);
					$("#dropdown_container").append(carrElement);
					$("#dropdown_container").append(carrElement);
					$("#dropdown_container").append(carrElement);

					//Trigger al pasar el mouse
					$(function() {
					    $('.card').hover(
					        function() {
					            $(this).find('> .card-image > img.activator').click();
					        }, function() {
					            $(this).find('> .card-reveal > .card-title').click();
					        }
					    );
					})

				
										   
			}

		});

});