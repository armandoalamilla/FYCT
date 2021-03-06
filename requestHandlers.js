//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Proposito de este modulo: contener todas las funciones necesarias para despachar cualquier recurso (html,css,js,pdf,etc) o servicio (IBM PI, login, logout,etc) solicitado por un cliente
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var fs = require('fs'); //modulo para accesar, crear, modificar, borrar archivos de extension .txt entre otros
var mysql = require('mysql'); //modulo para establecer una conexion con la base de datos de un servidor MySQL
var querystring = require('querystring'); //modulo para parsear en un objeto con sus atributos (ej. nombredelobjeto.atributo) a la informacion enviada por el usuario via metodo POST
var async = require("async");  //modulo para utilizar funciones asincronas (ej. each,foreach, y otros loops de manera asincrona)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Acceso al servidor MySQL para usar la base de datos que esta aplicacion web necesita
//Nota: cualquier servidor MySQL sirve, solo hay que ejecutar el script 'newCreation' (que se encuentra en este proyecto) en la base de datos
//      que el servidor nos esté prestando, y dicha base de datos sera util para esta aplicacion web
//Servidor MySQL provisto por: Gearhost.com
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//BASE De datos de prueba

var pool  = mysql.createPool({
 connectionLimit : 10,
 host            : 'den1.mysql5.gear.host',
 user            : 'fyctdb',
 password        : 'fyct0!',
 database        : 'fyctdb',
 multipleStatements : true
});

//Parametros para conectarse a la base de datos de digital ocean desde fuera del servidor
//falta habilitar que el servidor acepte conexiones que no sean de localhost
// var pool  = mysql.createPool({
//  connectionLimit : 10,
//  host            : '104.131.75.96',
//  user            : 'root',
//  password        : 'b930f62a8d513ae4962f7c37433aa263482f343d9ef60e77',
//  database        : 'MostlaPI',
//  multipleStatements : true
// });

//Parametros para conectarse a la base de datos de digital ocean estando en el servidor,
// asegurate que al subir los cambios al droplet, que sean estos parametros los que esten descomentedaos
// var pool  = mysql.createPool({
//  connectionLimit : 10,
//  host            : 'localhost',
//  user            : 'root',
//  password        : 'b930f62a8d513ae4962f7c37433aa263482f343d9ef60e77',
//  database        : 'MostlaPI',
//  multipleStatements : true
// });



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Funcion que entrega al cliente la view de la homepage de la app web
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function homePage(response, postData, cookieJar) {
	console.log("Request handler 'homePage' was called.");
	fs.readFile('./home.html', null, function (error,data){

		if (error){
			response.writeHead( 302, { "Location": "./public/error.html" } );
			//response.write('File not found!');
		} else{
      response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data);
		}

		response.end();

	});
}


function loginPage(response, postData, cookieJar) {
  console.log("Request handler 'loginPage' was called.");
  fs.readFile('./login.html', null, function (error,data){

    if (error){
      response.writeHead( 302, { "Location": "./public/error.html" } );
      //response.write('File not found!');
    } else{
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data);
    }

    response.end();

  });
}

function shopPage(response, postData, cookieJar) {
  console.log("Request handler 'shopPage' was called.");
  fs.readFile('./shop.html', null, function (error,data){

    if (error){
      response.writeHead( 302, { "Location": "./public/error.html" } );
      //response.write('File not found!');
    } else{
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data);
    }

    response.end();

  });
}

function cartPage(response, postData, cookieJar) {
  console.log("Request handler 'cartPage' was called.");
  fs.readFile('./cart.html', null, function (error,data){

    if (error){
      response.writeHead( 302, { "Location": "./public/error.html" } );
      //response.write('File not found!');
    } else{
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data);
    }

    response.end();

  });
}

function profilePage(response, postData, cookieJar) {
  console.log("Request handler 'cartPage' was called.");
  fs.readFile('./perfil.html', null, function (error,data){

    if (error){
      response.writeHead( 302, { "Location": "./public/error.html" } );
      //response.write('File not found!');
    } else{
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data);
    }

    response.end();

  });
}




function registerPage(response, postData, cookieJar) {
  console.log("Request handler 'registerPage' was called.");
  fs.readFile('./register.html', null, function (error,data){

    if (error){
      response.writeHead( 302, { "Location": "./public/error.html" } );
      //response.write('File not found!');
    } else{
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data);
    }

    response.end();

  });
}




function loginAction(response,postData, cookieJar){
	console.log("Request handler 'loginAction' was called.");

	console.log(querystring.parse(postData).email);
  console.log(querystring.parse(postData).password);

  var email = querystring.parse(postData).email;
  var password = querystring.parse(postData).password;

  pool.query("SELECT * FROM Usuario WHERE Correo = '"+email+"' AND Contrasena = '"+password+"' ;" , function(err, result){
    
     if(err) throw err;

      if (result.length >= 1)
      {
         console.log(result[0].Nombres);

         var nameString = "" + result[0].Nombres + " " +  result[0].ApellidoP + " " + result[0].ApellidoM;

          var someDate = new Date();
          someDate.setTime(someDate.getTime() + (30*60*1000) ) ;
          cookieJar.set( "name", nameString , { httpOnly: false, expires: someDate} );

      }

      var namesArray = [];
      for (var i = 0;i < result.length; i++) {
           namesArray.push({Nombres: result[i].Nombres, ApellidoP: result[i].ApellidoP, ApellidoM: result[i].ApellidoM});
      }


     var json = JSON.stringify({
                    names: namesArray
                  });

     response.writeHead(200, {"Content-Type": "application/json"});
     response.end(json);

  });


}




function logoutAction(response, postData, cookieJar){

  console.log("Request handler 'logout' was called.");


  //Destruye la cookie dandole una fecha de expiracion ya pasada
  var someDate = new Date();
  someDate.setTime(someDate.getTime() - 500000 ) ;

  cookieJar.set( "name", "dummy", { httpOnly: false, expires: someDate} );

  fs.readFile('./home.html', null, function (error,data){

    if (error){
      response.writeHead( 302, { "Location": "./public/error.html" } );
      //response.write('File not found!');
    } else{
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data);
    }

    response.end();

  });


}








function registerAction(response,postData, pathname){
  console.log("Request handler 'registerAction' was called.");

  console.log(querystring.parse(postData).names);
  console.log(querystring.parse(postData).lastname1);
  console.log(querystring.parse(postData).lastname2);
  console.log(querystring.parse(postData).password);
  console.log(querystring.parse(postData).email);

  var names = querystring.parse(postData).names;
  var lastname1 = querystring.parse(postData).lastname1;
  var lastname2 = querystring.parse(postData).lastname2;
  var password = querystring.parse(postData).password;
  var email = querystring.parse(postData).email;

  if (email == '' || password == '')
  {

      var json = JSON.stringify({
                      success: false,
                      reason: 'Email or password are missing.'
                    });

       response.writeHead(200, {"Content-Type": "application/json"});
       response.end(json);
  }

  else
  {

     pool.query("SELECT * FROM Usuario WHERE Correo = '"+email+"' ;" , function(err, result){
    
        if(err) throw err;

        if (result.length >= 1)
        {
            var json = JSON.stringify({
                      success: false,
                      reason: 'The provided email is already registered.'
                    });

           response.writeHead(200, {"Content-Type": "application/json"});
           response.end(json);
        }

        else
        {

            pool.query("INSERT INTO usuario(Correo,ApellidoM,ApellidoP,Nombres,Contrasena) VALUES ('"+email+"','"+lastname2+"','"+lastname1+"','"+names+"','"+password+"');" , function(err, result){
      
               if(err) throw err;

               var json = JSON.stringify({
                              success: true,
                              reason: 'The account was registered.'
                            });

               response.writeHead(200, {"Content-Type": "application/json"});
               response.end(json);
            });


        }


    });
  }
  
  


}



function retrieveImagesInfo(response,postData, pathname){ 
  
  console.log("Request handler 'retrieveImagesInfo' was called.");

  pool.query("SELECT * FROM producto, productoimagen WHERE producto.IDProducto = productoimagen.IDProducto AND ImgPrincipal = true AND Ubicacion IS NOT NULL;" , function(err, result){
      
          if(err) throw err;

          if (result.length >= 1)
          {

              var imageInfoArray = [];
              for (var i = 0;i < result.length; i++) {
                  imageInfoArray.push({IDProducto: result[i].IDProducto, Nombre: result[i].Nombre, Precio: result[i].Precio,
                                        Descripcion: result[i].Descripcion, Ubicacion: result[i].Ubicacion});
              }

              var json = JSON.stringify({
                        success: true,
                        reason: 'Images information retrieved.',
                        ImagesInformation: imageInfoArray
                      });

             response.writeHead(200, {"Content-Type": "application/json"});
             response.end(json);
          }
          else
          {
             var imageInfoArray = [];
             var json = JSON.stringify({
                        success: false,
                        reason: 'Nothing retrieved.',
                        ImagesInformation: imageInfoArray
                      });

             response.writeHead(200, {"Content-Type": "application/json"});
             response.end(json);

          }


  });


}





function mostSoldProducts(response,postData, pathname){

  console.log("Request handler 'mostSoldProducts' was called.");

  pool.query("select producto.IDProducto, producto.Nombre, producto.Precio, sum(ordendetalle.cantidad) as Ventas, producto.Descripcion, productoimagen.Ubicacion from ordendetalle, producto, productoimagen where ordendetalle.IDProducto = producto.IDProducto AND productoimagen.IDProducto = producto.IDProducto AND productoimagen.ImgPrincipal = true group by ordendetalle.IDProducto order by ventas desc limit 3;" , function(err, result){
        
        if(err) throw err;


         if (result.length >= 1)
          {

              var imageInfoArray = [];
              for (var i = 0;i < result.length; i++) {
                  imageInfoArray.push({IDProducto: result[i].IDProducto, Nombre: result[i].Nombre, Precio: result[i].Precio,
                                        Ventas: result[i].Ventas, Descripcion: result[i].Descripcion,
                                        Ubicacion: result[i].Ubicacion});
              }

              var json = JSON.stringify({
                        success: true,
                        reason: 'Images information retrieved.',
                        ImagesInformation: imageInfoArray
                      });

             response.writeHead(200, {"Content-Type": "application/json"});
             response.end(json);
          }
          else
          {
             var imageInfoArray = [];
             var json = JSON.stringify({
                        success: false,
                        reason: 'Nothing retrieved.',
                        ImagesInformation: imageInfoArray
                      });

             response.writeHead(200, {"Content-Type": "application/json"});
             response.end(json);

          }



  });


}





function pdfService(response,postData, pathname){
  //console.log("Request handler 'pdfService' was called. The file " + querystring.parse(postData).pdfNombre + " was requested.");
  console.log("Request handler 'pdfService' was called. The file " + pathname + " was requested.");

  //var nombrePDF =  querystring.parse(postData).pdfNombre;
  //var fullpath = './documents' +  nombrePDF;
  //var fullpath = './documents' +  pathname;
  var fullpath = '.' + pathname;


  var file = fs.createReadStream(fullpath);
  var stat = fs.statSync(fullpath);
  response.setHeader('Content-Length', stat.size);
  response.setHeader('Content-Type', 'application/pdf');

  if (pathname == "/Casos-y-hallazgos-in.pdf")
    response.setHeader('Content-Disposition', 'attachment; filename=Casos-y-hallazgos-in.pdf');
  else if (pathname == "/CaracteristicasPersonalidad.pdf")
    response.setHeader('Content-Disposition', 'attachment; filename=CaracteristicasPersonalidad.pdf');
  file.pipe(response);


}



function cssContent(response,postData, pathname){

//	var fullpath = './public' + pathname;
  var fullpath = '.' + pathname;

	console.log("Request handler 'cssContent' was called. The file " + fullpath + " was requested.");

	fs.readFile(fullpath, null, function (error,data){

		if (error){
			console.log("No file found at:" + fullpath);
			response.writeHead(404);
			response.write('File not found!');
		} else{
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(data);
		}

		response.end();

	});


}

function jsContent(response,postData, pathname){
	console.log("Request handler 'jsContent' was called. The file " + pathname + " was requested.");

	//var fullpath = './public' + pathname;
  var fullpath = '.' + pathname;

	fs.readFile(fullpath, null, function (error,data){

		if (error){
			console.log("No file found at:" + fullpath);
			response.writeHead(404);
			response.write('File not found!');
		} else{
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(data);

		}

		response.end();

	});
}

function pngContent(response,postData, pathname){
	console.log("Request handler 'pngContent' was called. The file " + pathname + " was requested.");

	//var fullpath = './public' + pathname;
  var fullpath = '.' + pathname;

	fs.readFile(fullpath, null, function (error,data){

		if (error){
			console.log("No file found at:" + fullpath);
			response.writeHead(404);
			response.write('File not found!');
		} else{
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(data);
		}

		response.end();

	});
}


function jpgContent(response,postData, pathname){
  console.log("Request handler 'jpgContent' was called. The file " + pathname + " was requested.");

  //var fullpath = './public' + pathname;
  var fullpath = '.' + pathname;

  fs.readFile(fullpath, null, function (error,data){

    if (error){
      console.log("No file found at:" + fullpath);
      response.writeHead(404);
      response.write('File not found!');
    } else{
      response.writeHead(200, {"Content-Type": "image/jpg"});
      response.write(data);
    }

    response.end();

  });
}



//Views de la app web
exports.homePage = homePage;
exports.loginPage = loginPage;
exports.shopPage = shopPage;
exports.registerPage = registerPage;
exports.cartPage = cartPage;
exports.profilePage = profilePage

//Acciones o servicios que el cliente solicita manualmente
exports.loginAction = loginAction;
exports.registerAction = registerAction;
exports.retrieveImagesInfo = retrieveImagesInfo;
exports.mostSoldProducts = mostSoldProducts;
exports.logoutAction = logoutAction;

//Acciones o servicios que el cliente solicita automaticamente
exports.cssContent = cssContent;
exports.jsContent = jsContent;
exports.pngContent = pngContent;
exports.jpgContent = jpgContent;
