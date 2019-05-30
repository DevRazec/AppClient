$(document).ready(function () {
    $("#SelectAno").ready(function () {

        $.each(mesatualanos, function (i, option) {
            $.each(option.Anos, function (ii, option2) {
                $("#SelectAno").append($('<option/>').attr("value", option2.ano).text(option2.ano)
                );
            });
            $("#SelectAno").val(option.AnoAtual);
            $("#SelectMes").val(option.Mes);
        });

        AtualizarTop15();
    });
});

$("#SelectMes").change(function () { LimparTop15(); });
$("#SelectAno").change(function () { LimparTop15(); });

function LimparTop15() {

    $("#LabelTopOrcApMes").html("");
    $("#LabelTopOrcApAno").html("");

    //$('#TableTop15OrcAno').children('tbody').remove();
    //$('#TableTop15OrcMes').children('tbody').remove();

    //$("#TableTop15OrcAno > tbody").html("");
    //$("#TableTop15OrcMes > tbody").html("");

    //$('#TableTop15OrcAno tbody').empty();
    //$('#TableTop15OrcMes tbody').empty();

    $('#TableTop15OrcMes tbody > tr').remove();
    $('#TableTop15OrcAno tbody > tr').remove();

    AtualizarTop15();
}

function AtualizarTop15() {
    var mes = $("#SelectMes").val();
    var ano = $("#SelectAno").val();

    $.each(dados, function (i, option) {
        $("#LabelTopOrcApMes").append("Top 15 Clientes Orçamento Aprovado (" + PegarMes(mes) + "/" + ano + ")");
        $("#LabelTopOrcApAno").append("Top 15 Clientes Orçamento Aprovado (" + ano + ")");
    });

    MontarTabelaTop15Mes(dados);
    MontarTabelaTop15Ano(dados);
}

function PegarMes(n) {
    var Mes = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return Mes[n];
}

function MontarTabelaTop15Mes(data) {

    var rowsHtml = '';

    $.each(data[0].ConsultaTop15[0].Top15Mes, function (i, option) {

        var count = i + 1;

        rowsHtml += '<tr>' +
            '<td>' + count + '</td>' +
            '<td>' + option.Empresa + '</td>' +
            '<td>' + option.Valor + '</td>' +
            '</tr>';
    })

    $("#TableTop15OrcMes tbody").html(rowsHtml);
}

function MontarTabelaTop15Ano(data) {

    var rowsHtml = '';

    $.each(data[0].ConsultaTop15[0].Top15Ano, function (i, option) {

        var count = i + 1;

        rowsHtml += '<tr>' +
            '<td>' + count + '</td>' +
            '<td>' + option.Empresa + '</td>' +
            '<td>' + option.Valor + '</td>' +
            '</tr>';
    })

    $("#TableTop15OrcAno tbody").html(rowsHtml);
}

$(window).on('load', function () {

});