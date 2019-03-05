//Trigger del DropDown
$('.dropdown-trigger').dropdown({coverTrigger: false, alignment: 'right', constrainWidth: false });

//boton de registro 
document.getElementById("btnRegistro").onclick = function () {

	
    var $nombre = $("#first_name");
    var $apellido = $("#last_name");
    var $contrasena = $("#password");
    var $contrasenaConfirma =$("#confirmPassword");
    var $email = $("#email");


    //validar si el field de nombre esta lleno
	if($nombre.val()=='')
	{
		$("#btnRegistro").attr('data-target',"modal_nombre");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	} //valida si el campo de apellido esta lleno
	else if($apellido.val()=='')
	{
		$("#btnRegistro").attr('data-target',"modal_apellido");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	} //valida si el campo contraseña esta agregado
	else if($contrasena.val()=='')
	{
		$("#btnRegistro").attr('data-target',"modal_contrasena");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	} //validar si las contraseñas son iguales
	else if($contrasena.val()!=$contrasenaConfirma.val())
	{
		$("#btnRegistro").attr('data-target',"modal_contrasenaConfirma");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	}//validar si se escribio el mail
	else if($email.val()=='')
	{
		$("#btnRegistro").attr('data-target',"modal_email");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	}
	else {

		alert("Datos guardados en la base de datos");



		window.location.href = "index.html"
	}

	



};
        
  
 
    


