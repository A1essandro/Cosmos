Obj = function (id, weight, position, speed) {

    this.age = 0;
    this.weight = weight;
    this.diameter = Math.pow(this.weight / (Math.PI * 4 / 3), 0.45);

    this.id = id;

    $('body').append('<div class="obj" id="obj' + id + '" style="width:' + this.diameter + 'px; height:' + this.diameter + 'px;"></div>');
    this.div = $('#obj' + id);

    if (!speed) {
        this.speed = {
            x: 2.5 * (Math.random() - 0.5),
            y: 2.5 * (Math.random() - 0.5)
        };
    } else {
        this.speed = speed;
    }
    this.position = position;

    this.getDistance = function (v) {
        return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
    };

    this.getF = function (toObjWeight, distance) {
        return G * (toObjWeight /* * this.weight*/) / Math.pow(distance, 2);
    };

    this.calculate = function (obj) {
        for (var o = 0; o < obj.length; o++) {
            if (obj[o].id === this.id)
                continue;
            vector = {
                x: obj[o].position.x - this.position.x,
                y: obj[o].position.y - this.position.y
            };
            distance = this.getDistance(vector);
            if (distance <= (obj[o].diameter * 1.05 + this.diameter * 1.05)) {
                this.collapse(obj[o]);
                return;
            }
            f = this.getF(obj[o].weight, distance);
            this.speed.x += f * vector.x;
            this.speed.y += f * vector.y;
        }

        var style = 'inset -' + (this.diameter / 10) + 'px -' + (this.diameter / 10) + 'px ' + (this.diameter / 10) + 'px 1px rgba(92,51,0,0.55)';
        this.div.css('-webkit-box-shadow', style);
        this.div.css('-moz-box-shadow', style);
        this.div.css('box-shadow', style);
    };

    this.move = function (biggest) {
        this.age++;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        var curPos = {
            x: (this.position.x - this.diameter / 2) - biggest.position.x + midX,
            y: (this.position.y - this.diameter / 2) - biggest.position.y + midY
        };

        this.div.css({ top: curPos.y + 'px', left: curPos.x + 'px' });

        if ((this.age % 3) === 0 && biggest !== this) {
            var dHalv = this.diameter / 2;
            $('body').append('<div class="path path-' + this.id + '" id="path' + this.id + '-' + this.age + '" style="top:' + (curPos.y + dHalv) + 'px;left:' + (curPos.x + dHalv) + 'px"></div>');
            var maxCount = parseInt(2500 / obj.length);
            $('.path-' + this.id + ':lt(-' + maxCount + ')').remove();
        }

        //отрисовка маркера направления движения
        if (this === biggest) {
            var speedPos = {
                x: curPos.x + this.speed.x * 100,
                y: curPos.y + this.speed.y * 100
            };
            $('#speedPos').css({
                top: (speedPos.y + this.diameter / 2) + 'px',
                left: (speedPos.x + this.diameter / 2) + 'px'
            });
        }
    };

    this.collapse = function (withObj) {
        if (withObj.weight > this.weight)
            position = withObj.position;
        else
            position = this.position;

        var rel = Math.pow(1 / (this.weight / withObj.weight), 3);
        var revRel = Math.pow(1 - rel, 3);
        var speed = {
            x: (withObj.speed.x * rel + this.speed.x * revRel) / 10,
            y: (withObj.speed.y * rel + this.speed.y * revRel) / 10
        };

        speed = {x:0, y:0};

        var thisSpeed = this.speed;
        var otherSpeed = withObj.speed;
        var res = speed;

        nO = new Obj(this.id + '_' + withObj.id, withObj.weight + this.weight, position, speed);
        obj.push(nO);
        withObj.div.remove();
        this.div.remove();
        $('.path-' + withObj.id).remove();
        $('.path-' + this.id).remove();
        obj.splice(obj.indexOf(withObj), 1);
        obj.splice(obj.indexOf(this), 1);

        // if (nO.weight > biggest.weight) {
        //     $('.path').remove();
        //     biggest = nO;
        // }
    }

};
