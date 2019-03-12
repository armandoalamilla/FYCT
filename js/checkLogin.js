$(document).ready(function()
{

    var nameCookie = getCookie("name");
    
    console.log("name cookie: " + nameCookie);
    //alert("email cookie: " + emailCookie);

    if (nameCookie != ""){

        $("#loginBtn").remove();
        $("#registerBtn").remove();
        $("#loginBtnMob").remove();
        $("#registerBtnMob").remove();
        $("<li id='profileBtn'><a href='/Perfil'>" + nameCookie + "</a></li>").insertBefore("#cartBtn");
        $("<li id='logoutBtn'><a href='/CerrarSesion'>Logout</a></li>").insertAfter("#cartBtn");





    }
    
    
    

});


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
