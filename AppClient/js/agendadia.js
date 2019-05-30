$(document).ready(function () {   
    MontarTabelaAgendaDia(dados[0]);  
});

function MontarTabelaAgendaDia(data) {

    var date = new Date();
    var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    var year = date.getFullYear();
    var today = day + '/' + month + '/' + year;

    var evento = data.Evento;       

    var rowsHtml = '';

    $.each(evento, function (i, option) {

        if (evento[i].DataEvento == today) {
            rowsHtml += '<tr>' +
                '<td class="word-wrap">' + option.Evento + '</td>' +
                '<td>' + option.InicioFim + '</td>' +
                '</tr>';
        }
    })

    $("#LabelAgendaDia").append("Dia " + today);
    $("#TableAgendaDia tbody").html(rowsHtml);
}

$(window).on('load', function () {

});