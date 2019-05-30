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

        AtualizarGraficos();
    });
});

$("#SelectMes").change(function () { AtualizarGraficos(); });
$("#SelectAno").change(function () { AtualizarGraficos(); });

function PegarCor(n) {
    var Cor = ["(255, 99, 132, 0.5)", "(54, 162, 235, 0.5)", "(255, 159, 64, 0.5)", "(255, 205, 86, 0.5)", "(75, 192, 192, 0.5)", "(153, 102, 255, 0.5)", "(201, 203, 207, 0.5)", "(0,100,0, 0.5)", "(128, 0, 0, 0.5)", "(255, 69, 0, 0.5)", "(50,205,50, 0.5)", "(210,105,30,0.5)", "(147,112,219, 0.5)", "(0, 191, 255, 0.5)", "(127, 255, 212, 0.5)", "(128, 128, 0,0.5)", "(255, 127, 80, 0.5)", "(255, 192, 203, 0.5)"];
    return Cor[n];
}

function PegarMes(n) {
    var Mes = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return Mes[n];
}

function AtualizarGraficos() {
    var mes = $('#SelectMes').val();
    var ano = $('#SelectAno').val();
    GraficoTempoOrc(dados, ano);
    GraficoOrcSituacao(dados);
    GraficoAnaliseCritica(dados);
    GraficoOrcAvulso(dados);
    GraficoOrcContrato(dados);
    GraficoOrcAp(dados);
    GraficoOrcDec(dados);
    GraficoOrcCan(dados);
}

function GraficoTempoOrc(data, ano) {

    var ConfiguracaoGrafico = {
        labels: ["10", "20", "30", "60", "+60"],
        datasets: []
    };

    var newDataset = {
        //label: [],
        data: [],
        backgroundColor: []
    };

    $.each(data, function (i, option) {
        $.each(option.TempoOrcamento, function (ii, option2) {
            $.each(option2.Quantidade, function (iii, option3) {
                'rgba' + PegarCor(ii)
                newDataset.data.push(option3.Quantidade);
                ConfiguracaoGrafico.labels[iii] = ConfiguracaoGrafico.labels[iii] + " (" + option3.Quantidade + ")";
                newDataset.backgroundColor.push('rgba' + PegarCor(iii));
            });
        });
    });

    ConfiguracaoGrafico.datasets.push(newDataset);

    if (window.tempoorc != null) {
        window.tempoorc.destroy();
    }

    var ctx = document.getElementById("TempoOrc");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: ConfiguracaoGrafico,
        responsive: true,
        radius: 5,
        options: {
            legend: {
                position: 'top',
                display: true,
                labels: {
                    fontColor: 'rgb(0, 0, 0)'
                }
            },
            title: {
                display: true,
                text: 'Tempo Envio de Orçamento (' + ano + ')',
                fontSize: 16,
                fontColor: 'rgb(0, 0, 0)'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });

    window.tempoorc = myChart;
}

function GraficoOrcSituacao(data) {

    var ConfiguracaoGrafico = {
        labels: [],
        datasets: []
    };

    var newDataset = {
        label: [],
        data: [],
        backgroundColor: []
    };

    $.each(data, function (i, option) {
        $.each(option.QuantidadeSitAtual, function (ii, option2) {
            newDataset.data.push(option2.Quantidade);
            //newDataset.label.push(option2.Situacao);
            newDataset.backgroundColor.push('rgba' + PegarCor(ii));
            ConfiguracaoGrafico.labels.push(option2.Situacao + " (" + option2.Quantidade + ")");
        });
    });

    ConfiguracaoGrafico.datasets.push(newDataset);

    if (window.situacaoOrc != null) {
        window.situacaoOrc.destroy();
    }

    var ctx = document.getElementById("SituacaoOrc");
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: ConfiguracaoGrafico,
        responsive: true,
        options: {
            legend: {
                position: 'top',
                display: false,
                labels: {
                    fontColor: 'rgb(0, 0, 0)'
                }
            },
            title: {
                display: true,
                text: 'Quantidade Orçamento por Situação',
                fontSize: 16,
                fontColor: 'rgb(0, 0, 0)'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });

    window.situacaoOrc = myChart;
    //$("#SituacaoOrc").append(myChart);

}

function GraficoAnaliseCritica(data) {

    var ConfiguracaoGrafico = {
        labels: [],
        datasets: []
    };

    $.each(data, function (i, option) {
        $.each(option.AnaliseCritica, function (ii, option2) {

            var newDataset = {
                label: [],
                data: [],
                backgroundColor: []
            };
            newDataset.label.push(option2.Laboratorio + " (" + option2.Quantidade + ")");
            newDataset.data.push(option2.Quantidade);
            newDataset.backgroundColor.push('rgba' + PegarCor(ii));
            ConfiguracaoGrafico.datasets.push(newDataset);
        });
    });

    if (window.analiseCritica != null) {
        window.analiseCritica.destroy();
    }

    var ctx = document.getElementById("AnaliseCritica");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: ConfiguracaoGrafico,
        responsive: true,
        radius: 5,
        options: {
            legend: {
                position: 'top',
                display: true,
                labels: {
                    fontColor: 'rgb(0, 0, 0)'
                }
            },
            title: {
                display: true,
                text: 'Análise Crítica Pendente',
                fontSize: 16,
                fontColor: 'rgb(0, 0, 0)'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });

    window.analiseCritica = myChart;
}

function GraficoOrcAvulso(data) {

    var ConfiguracaoGrafico = {
        //labels: [],
        datasets: []
    };

    $.each(data, function (i, option) {
        $.each(option.QuantidadeOrcAvulsoAno, function (ii, option2) {

            var newDataset = {
                label: option2.Ano + ": (" + option2.Quantidade + ")",
                data: [],
                backgroundColor: ['rgba' + PegarCor(ii)]
            };
            newDataset.data.push(option2.Quantidade);
            // ConfiguracaoGrafico.labels.push(option2.Ano);
            ConfiguracaoGrafico.datasets.push(newDataset);
        });
    });

    if (window.qtdorcAvulsoAno != null) {
        window.qtdorcAvulsoAno.destroy();
    }

    var ctx = document.getElementById("QtdOrcAvulsoAno");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: ConfiguracaoGrafico,
        responsive: false,
        options: {
            legend: {
                position: 'top',
                display: true,
                labels: {
                    fontColor: 'rgb(0, 0, 0)'
                }
            },
            title: {
                display: true,
                text: 'Quantidade Orçamento Avulso',
                fontSize: 16,
                fontColor: 'rgb(0, 0, 0)'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });

    window.qtdorcAvulsoAno = myChart;
    //$("#QuantidadeOrcAno").append(myChart);

}
function GraficoOrcContrato(data) {

    var ConfiguracaoGrafico = {
        //labels: [],
        datasets: []
    };

    $.each(data, function (i, option) {
        $.each(option.QuantidadeOrcContratoAno, function (ii, option2) {

            var newDataset = {
                label: option2.Ano + ": (" + option2.Quantidade + ")",
                data: [],
                backgroundColor: ['rgba' + PegarCor(ii)]
            };
            newDataset.data.push(option2.Quantidade);
            // ConfiguracaoGrafico.labels.push(option2.Ano);
            ConfiguracaoGrafico.datasets.push(newDataset);
        });
    });

    if (window.qtdorcContratoAno != null) {
        window.qtdorcContratoAno.destroy();
    }

    var ctx = document.getElementById("QtdOrcContratoAno");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: ConfiguracaoGrafico,
        responsive: true,
        options: {
            legend: {
                position: 'top',
                display: true,
                labels: {
                    fontColor: 'rgb(0, 0, 0)'
                }
            },
            title: {
                display: true,
                text: 'Quantidade Orçamento Contrato',
                fontSize: 16,
                fontColor: 'rgb(0, 0, 0)'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });

    window.qtdorcContratoAno = myChart;
    //$("#QuantidadeOrcAno").append(myChart);


}

function GraficoOrcAp(data) {

    var ConfiguracaoGrafico = {
        //labels: [],
        datasets: []
    };

    $.each(data, function (i, option) {
        $.each(option.QuantidadeApAno, function (ii, option2) {

            var newDataset = {
                label: option2.Ano + ": (" + option2.Quantidade + ")",
                data: [],
                backgroundColor: ['rgba' + PegarCor(ii)]
            };
            newDataset.data.push(option2.Quantidade);
            // ConfiguracaoGrafico.labels.push(option2.Ano);
            ConfiguracaoGrafico.datasets.push(newDataset);
        });
    });

    if (window.qtdorcApAno != null) {
        window.qtdorcApAno.destroy();
    }

    var ctx = document.getElementById("QtdOrcApAno");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: ConfiguracaoGrafico,
        responsive: false,
        options: {
            legend: {
                position: 'top',
                display: true,
                labels: {
                    fontColor: 'rgb(0, 0, 0)'
                }
            },
            title: {
                display: true,
                text: 'Quantidade Orçamento Aprovado',
                fontSize: 16,
                fontColor: 'rgb(0, 0, 0)'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });
    window.qtdorcApAno = myChart;
    //$("#QtdOrcApAno").append(myChart);

}

function GraficoOrcDec(data) {

    var ConfiguracaoGrafico = {
        //labels: [],
        datasets: []
    };

    $.each(data, function (i, option) {
        $.each(option.QuantidadeDecAno, function (ii, option2) {

            var newDataset = {
                label: option2.Ano + ": (" + option2.Quantidade + ")",
                data: [],
                backgroundColor: ['rgba' + PegarCor(ii)]
            };
            newDataset.data.push(option2.Quantidade);
            // ConfiguracaoGrafico.labels.push(option2.Ano);
            ConfiguracaoGrafico.datasets.push(newDataset);
        });
    });

    if (window.qtdorcDec != null) {
        window.qtdorcDec.destroy();
    }

    var ctx = document.getElementById("QtdOrcDec");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: ConfiguracaoGrafico,
        responsive: false,
        options: {
            legend: {
                position: 'top',
                display: true,
                labels: {
                    fontColor: 'rgb(0, 0, 0)'
                }
            },
            title: {
                display: true,
                text: 'Quantidade Orçamento Declinado',
                fontSize: 16,
                fontColor: 'rgb(0, 0, 0)'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });
    window.qtdorcDec = myChart;

    //$("#QtdOrcDec").append(myChart);

}

function GraficoOrcCan(data) {

    var ConfiguracaoGrafico = {
        //labels: [],
        datasets: []
    };

    $.each(data, function (i, option) {
        $.each(option.QuantidadeCanAno, function (ii, option2) {

            var newDataset = {
                label: option2.Ano + ": (" + option2.Quantidade + ")",
                data: [],
                backgroundColor: ['rgba' + PegarCor(ii)]
            };
            newDataset.data.push(option2.Quantidade);
            // ConfiguracaoGrafico.labels.push(option2.Ano);
            ConfiguracaoGrafico.datasets.push(newDataset);
        });
    });

    if (window.qtdorcCan != null) {
        window.qtdorcCan.destroy();
    }

    var ctx = document.getElementById("QtdOrcCan");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: ConfiguracaoGrafico,
        responsive: false,
        options: {
            legend: {
                position: 'top',
                display: true,
                labels: {
                    fontColor: 'rgb(0, 0, 0)'
                }
            },
            title: {
                display: true,
                text: 'Quantidade Orçamento Cancelado',
                fontSize: 16,
                fontColor: 'rgb(0, 0, 0)'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });

    window.qtdorcCan = myChart;
    // $("#QtdOrcCan").append(myChart);

}

$(window).on('load', function () {
    AtualizarGraficos();
});