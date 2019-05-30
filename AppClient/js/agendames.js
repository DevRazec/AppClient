$(document).ready(function () {
    $("#SelectMesAno").ready(function () {
        $.each(dados[0].MesAnoEvento, function (i, option) {
            $("#SelectMesAno").append($('<option/>').attr("value", option.NomeMesAno).text(option.NomeMesAno)
            );
        });

        $("#SelectMesAno").val(dados[0].MesAnoEvento[0].NomeMesAno);
        MontarTabelaAgendaMes(dados[0]);
    });    
});

$("#SelectMesAno").change(function () { MontarTabelaAgendaMes(dados[0]); });

function MontarTabelaAgendaMes(data) {

    var mesano = $('#SelectMesAno').val();

    var mesAnoEvento = data.MesAnoEvento
    var evento = data.Evento;

    var rowsHtml = '';

    var eventoMes = [];

    evento.map((data) => {
        if (data.NomeMesAno == mesano) {
            mesAnoEvento.map((data1) => {
                if (data.NomeMesAno == data1.NomeMesAno) {
                    var itemData = {
                        Evento: data.Evento,
                        DataEvento: data.DataEvento,
                        DiaSemana: data.DiaSemana,
                        InicioFim: data.InicioFim
                    }
                    eventoMes.push(itemData)
                }
            })
        }
    })

    $.each(eventoMes, function (i, option) {

        rowsHtml += '<tr>' +
            '<td class="word-wrap">' + option.Evento + '</td>' +
            '<td>' + option.DataEvento + '<br>' + option.DiaSemana + '<br>' + option.InicioFim + '</td>' +
            '</tr>';
    })
        
    $("#TableAgendaMes tbody").html(rowsHtml);
}

$(window).on('load', function () {

});