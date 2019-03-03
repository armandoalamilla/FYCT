$(document).ready(function() {

	console.log("LOGIN SCRIPT WAS LOADED");

	$("#login").click (function(e){

		e.preventDefault();
		console.log("LOGIN BUTTON WAS CLICKED");
		sendInfo();
		
	});


});




function sendInfo(){

	var email = $("#email").val();
	var password = $("#password").val();
	console.log("password: " + password);
	console.log("email: " + email);
	
	
	var jsonToSend = {
			"email" : email,
			"password" : password
	};

	$.ajax({

			url: "/LoginAction",
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


					if (dataReceived.names.length >= 1)
						alert("Usuario identificado: " + dataReceived.names[0].Nombres + " " + dataReceived.names[0].ApellidoP + " " +
							   dataReceived.names[0].ApellidoM);
					else
						alert("Usuario no identificado");
					   
			}

		});



}