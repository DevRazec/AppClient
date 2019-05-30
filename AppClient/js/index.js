var strLogin = '';
var strPassword = '';

$(document).ready(function () {


});

//Evento click dos botões
$('#btnLogin').on('click', function () {

    strLogin = $('#txtLogin').val();
    strPassword = $('#txtPassword').val();

    if (strLogin != '' && strPassword != '') {
        GetToken();
        //CheckServerConection();        
        //CheckHeaderResponse();
    } else {
        $("#lblMessage").empty();
        $("#lblMessage").append("Entre com Login e Senha");
    }
});

//function CheckHeaderResponse() {
      
//    $.ajax({
//        type: "POST",
//        data: formData,
//        url: "http://teanalitica.fortiddns.com:5555",
//        complete: function (resp) {
//            console.log("done!" + resp.getAllResponseHeaders());
//        },        
//        success: function () {
//            console.log("done!" + resp.getAllResponseHeaders());
//        },
//        error: function () {
//            console.log("done!" + resp.getAllResponseHeaders());
//        },
//        failure: function () {
//            console.log("done!" + resp.getAllResponseHeaders());
//        },
//    });
//}

//function CheckServerConection() {
//    $.ajax({
//        url: "http://teanalitica.fortiddns.com:5555",
//        context: document.body,
//        error: function (jqXHR, exception) {
//            //console.log(exception);
//            $("#lblMessage").empty();
//            $("#lblMessage").append("Erro, verifique a conexao ou tente mais tarde");
//        },
//        success: function () {
//            //console.log(document.header);
//            GetToken();
//        }
//    });
//}

//function GetToken2() {

//    var xhr = new XMLHttpRequest();
//    xhr.open('POST', 'http://neo2apphttp.teanalitica.local/token');
//    xhr.withCredentials = true;
//    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//    xhr.send("UserName=" + strLogin + "&Password=" + strPassword + "&grant_type=password");
//    xhr.onload = function () {
//        if (xhr.status === 200) {
//            var data = JSON.parse(xhr.responseText);
//            console.log(data.access_token);
//        }
//    };
//}

function GetToken() {
    $.ajax({
        type: "POST",
        //url: "http://teanalitica.fortiddns.com/token",
        //url: "http://neo2apphttp.teanalitica.local/token",
        //url: "http://localhost:5555/token",
        url: "https://appte.ddns.net/token",

        //xhrFields: {
        //    withCredentials: true
        //},
        data: "UserName=" + strLogin + "&Password=" + strPassword + "&grant_type=password",
        //crossDomain: true,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        success: function (data) {

            GetAuthorization(data.access_token);
            console.log("Got Token");
        },
        failure: function (data) {
            //console.log(data.responseJSON.error);
            $("#lblMessage").empty();
            $("#lblMessage").append(data.responseJSON.error);
            console.log("Got Token Failure");
        },
        error: function (data) {
            //console.log(data.responseJSON.error);
            $("#lblMessage").empty();
            $("#lblMessage").append(data.responseJSON.error);   
            console.log("Got Token Error");
        }
    });
}

function GetAuthorization(token) {
    $.ajax({
        type: "GET",
        //url: "http://teanalitica.fortiddns.com/api/UsuarioNeo1/1",
        //url: "http://neo2apphttp.teanalitica.local/api/UsuarioNeo1/1",
        //url: "http://localhost:5555/api/UsuarioNeo1/1",
        url: "https://appte.ddns.net/api/UsuarioNeo1/1",
        headers: {
            'Authorization': 'bearer ' + token
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            window.location.replace('./menuhome.html');
            console.log("Got Authorization");
        },
        failure: function (data) {
            //console.log(data.responseJSON.error);
            $("#lblMessage").empty();
            $("#lblMessage").append(data.responseJSON.error);
            console.log("Got Authorization Failure");
        },
        error: function (data) {
            //console.log(data.responseJSON.error);
            $("#lblMessage").empty();
            $("#lblMessage").append(data.responseJSON.error);
            console.log("Got Authorization Error");
        }
    });
}

$(window).on('load', function () {

});

// Code Sample

//var data = '{"name": "mkyong","age": 30,"address": {"streetAddress": "88 8nd Street","city": "New York"},"phoneNumber": [{"type": "home","number": "111 111-1111"},{"type": "fax","number": "222 222-2222"}]}';

//var json = JSON.parse(data);

//alert(json["name"]); //mkyong
//alert(json.name); //mkyong

//alert(json.address.streetAddress); //88 8nd Street
//alert(json["address"].city); //New York

//alert(json.phoneNumber[0].number); //111 111-1111
//alert(json.phoneNumber[1].type); //fax

//alert(json.phoneNumber.number); //undefined

//var dados1 = data;
//console.log(dados1);   
//console.log(dados1.access_token); 
//console.log(dados1["access_token"]);

//var dados2 = JSON.stringify(data); // then convert data to json string
//var dados3 = JSON.parse(dados2); // parse json data and pass json string
//console.log(dados3); 
//console.log(dados3.access_token); // got result of particular string
//console.log(dados3["access_token"]); // got result of particular string