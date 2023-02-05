var API_URL = 'http://localhost/bravi/testes/teste2/public/';

$(function() {
    list_people();
});

function list_people() {
    $.ajax({
        url: API_URL + 'people',
        dataType: "json",
        contentType: "application/json"
    
    }).done(function(data) {
        var html = '';
        console.log(data);
        $(data).forEach(function(people) {
            html += 'x';
        });
        $('.list-people .people').html(html);
    
    }).fail(function() {
        $.alert({
            title: 'Erro',
            content: 'Houve um erro ao processar a solicitação!',
            buttons: {
                ok: {
                    text: 'OK',
                    btnClass: 'btn-green'
                }
            }
        });
    });
}