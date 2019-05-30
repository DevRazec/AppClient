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

        AtualizarIndicadores();
    });
});

ContaAnaliseCritica();

$("#SelectMes").change(function () { LimparIndicadores(); });
$("#SelectAno").change(function () { LimparIndicadores(); });

function LimparIndicadores() {

    $("#DivAvulso").html("");
    $("#DivContrato").html("");
    $("#DivAprovado").html("");
    $("#DivDeclinado").html("");
    $("#DivCancelado").html("");
    $("#MinMax").html("");
    $("#Medio").html("");
    $("#DivAnaliseCritica").html("");
    $("#DivTotalAvulso").html("");
    $("#DivTotalContrato").html("");
    $("#DivPendenteCliente").html("");

    AtualizarIndicadores();
    ContaAnaliseCritica();
}

function AtualizarIndicadores() {
    var mes = $("#SelectMes").val();
    var ano = $("#SelectAno").val();

    $.each(dados, function (i, option) {
        $("#DivAvulso").append(option.Avulso);
        $("#DivContrato").append(option.Contrato);
        $("#DivAprovado").append(option.Aprovado);
        $("#DivDeclinado").append(option.Declinado);
        $("#DivCancelado").append(option.Cancelado);
        $("#MinMax").append("Min: " + option.TempoMedioOrcamento[0].Min + " | Max: " + option.TempoMedioOrcamento[0].Max);
        $("#Medio").append("Médio: " + option.TempoMedioOrcamento[0].Medio);

        $("#DivTotalAvulso").append(option.ConsultaValorOrcamento[0].ValorAvulso);
        $("#DivTotalContrato").append(option.ConsultaValorOrcamento[0].ValorContrato);
        $("#DivPendenteCliente").append(option.ConsultaValorOrcamento[0].ValorPendente);
    });
}

function ContaAnaliseCritica() {

    var QtdAnaCritica = 0;

    $.each(dados, function (i, option) {
        $.each(option.AnaliseCritica, function (ii, option2) {
            QtdAnaCritica += parseInt(option2.Quantidade);
        });
    });

    $("#DivAnaliseCritica").append(QtdAnaCritica);
}

$(window).on('load', function () {

});