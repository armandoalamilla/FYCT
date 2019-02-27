

//boton de registro 
document.getElementById("btnRegistro").onclick = function () {

	
    var $nombre = $("#first_name");
    var $apellido = $("#last_name");


    //validar si el field de nombre esta lleno
	if($nombre.val()=='')
	{
		$("#btnRegistro").attr('data-target',"modal_nombre");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	}
	else if($apellido.val()=='')
	{
		$("#btnRegistro").attr('data-target',"modal_apellido");
		 

		 $(document).ready(function(){
    	$('.modal').modal();
 		});
	}

	



};
        
  
 
    


