G = 1 / parseInt($('#g-input').val());

obj = [];

midX = $(document).width() / 2;
midY = $(document).height() / 2;
biggest = null;

for (i = 0; i < 50; i++)
    obj[i] = new Obj(i, Math.random() * (10 + i * 2), {x: Math.random() * 600, y: Math.random() * 600});

setInterval(function () {

    if (biggest === null) {
        biggest = obj[0];
        for (var o = 1; o < obj.length; o++)
            if (biggest.weight < obj[o].weight)
                biggest = obj[o];
    }

    for (var o = 0; o < obj.length; o++)
        obj[o].calculate(obj);

    for (var o = 0; o < obj.length; o++)
        obj[o].move(biggest);

    $('#objects-count').html(obj.length)

}, 16);

function changeG(input) {
    G = 1 / $(input).val();
}
