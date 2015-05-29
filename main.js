obj = [];

for (i = 0; i < 20; i++)
    obj[i] = new Obj(i, Math.random() * 20, {x: Math.random() * $(document).width(), y: Math.random() * $(document).height()});

setInterval(function () {

    for (var o = 0; o < obj.length; o++)
        obj[o].calculate(obj);

    for (var o = 0; o < obj.length; o++)
        obj[o].move();

}, 16);



