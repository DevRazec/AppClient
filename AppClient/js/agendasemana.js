$(document).ready(function () {
    MontarTabelaAgendaSemana(dados[0]);    
});

function MontarTabelaAgendaSemana(data) {

    var evento = data.Evento;

    var rowsHtml = '';

    var eventoSemana = [];

    evento.map((data) => {
        if (data.EstaSemana == 1) {
            var itemData = {
                DataEvento: data.DataEvento
            }
            eventoSemana.push(itemData)
        }
    })

    $.each(evento, function (i, option) {

        if (evento[i].EstaSemana == 1) {
            rowsHtml += '<tr>' +
                '<td class="word-wrap">' + option.Evento + '</td>' +
                '<td>' + option.DataEvento + '<br>' + option.DiaSemana + '<br>' + option.InicioFim + '</td>' +
                '</tr>';
        }
    })

    $("#LabelAgendaSemana").append("Do dia " + eventoSemana[0].DataEvento + " à " + eventoSemana[eventoSemana.length - 1].DataEvento);
    $("#TableAgendaSemana tbody").html(rowsHtml);
}

$(window).on('load', function () {

});