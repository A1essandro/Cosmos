obj = [];

midX = $(document).width() / 2;
midY = $(document).height() / 2;
biggest = null

for (i = 0; i < 20; i++)
    obj[i] = new Obj(i, Math.random() * 20, {x: Math.random() * $(document).width(), y: Math.random() * $(document).height()});

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

}, 16);



