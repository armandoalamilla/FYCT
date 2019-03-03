$(document).ready(function() {

	console.log("REGISTER SCRIPT WAS LOADED");

	$("#btnRegistro").click (function(e){

		e.preventDefault();
		console.log("REGISTER BUTTON WAS CLICKED");
		sendInfo();
		
	});


});


function sendInfo(){
	
    var nombres = $("#names");
    var apellidoP = $("#last_name1");
    var apellidoM = $("#last_name2");
    var contrasena = $("#password");
    var contrasenaConfirma =$("#confirmPassword");
    var email = $("#email");


    //validar si el field de nombre esta lleno
	if(nombres.val()=='')
	{
		$("#btnRegistro").attr('data-target',"modal_nombre");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	} //valida si el campo de apellido paterno esta lleno
	else if(apellidoP.val()=='')
	{
		$("#btnRegistro").attr('data-target',"modal_apellidoP");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	} //valida si el campo de apellido materno esta lleno
	else if(apellidoM.val()=='')
	{
		$("#btnRegistro").attr('data-target',"modal_apellidoM");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	} //valida si el campo contraseña esta agregado
	else if(contrasena.val()=='')
	{
		$("#btnRegistro").attr('data-target',"modal_contrasena");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	} //validar si las contraseñas son iguales
	else if(contrasena.val()!=contrasenaConfirma.val())
	{
		$("#btnRegistro").attr('data-target',"modal_contrasenaConfirma");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	}//validar si se escribio el mail
	else if(email.val()=='')
	{
		$("#btnRegistro").attr('data-target',"modal_email");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	}
	else {


		var jsonToSend = {
				"names" : nombres.val() ,
				"lastname1" : apellidoP.val(),
				"lastname2" : apellidoM.val(),
				"password" : contrasena.val(),
				"email" : email.val()
		};

		$.ajax({

				url: "/registerAction",
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

						console.log("Data that was received from the server: ");
						alert(dataReceived.reason);

						   
				}

			});
	}

	



};