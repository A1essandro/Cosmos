Obj = function (id, weight, position) {

    this.age = 0;
    this.weight = weight;
    this.diameter = Math.pow(this.weight / (Math.PI * 4 / 3), 0.333) * 6;

    this.id = id;

    $('body').append('<div class="obj" id="obj' + id + '" style="width:' + this.diameter + 'px; height:' + this.diameter + 'px;"></div>');
    this.div = $('#obj' + id);

    this.speed = {
        x: 2.5 * (Math.random() - 0.5),
        y: 2.5 * (Math.random() - 0.5)
    };
    this.position = position;

    this.getDistance = function (v) {
        return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
    };

    this.getF = function (toObjWeight, distance) {
        return G * toObjWeight / Math.pow(distance, 2);
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
            if (distance <= (obj[o].diameter / 2 + this.diameter / 2)) {
                this.collapse(obj[o]);
                return;
            }
            f = this.getF(obj[o].weight, distance);
            this.speed.x += f * vector.x;
            this.speed.y += f * vector.y;
        }

        var style = 'inset -' + (this.diameter / 10) +'px -' + (this.diameter / 10) +'px ' + (this.diameter / 10) +'px 1px rgba(92,51,0,0.55)';
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

        this.div.css({top: curPos.y + 'px', left: curPos.x + 'px'});

        var curPos = {
            x: (this.position.x - this.diameter / 2) - biggest.position.x + midX,
            y: (this.position.y - this.diameter / 2) - biggest.position.y + midY
        };

        if ((this.age % 10) === 0 && biggest !== this) {
            $('body').append('<div class="path path-' + this.id + '" id="path' + this.id + '-' + this.age + '" style="top:' + curPos.y + 'px;left:' + curPos.x + 'px"></div>');
            var maxCount = parseInt(1500 / obj.length);
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

        nO = new Obj(this.id + '_' + withObj.id, withObj.weight + this.weight, position);
        nO.speed = {
            x: withObj.speed.x / this.weight + this.speed.x / withObj.weight,
            y: withObj.speed.y / this.weight + this.speed.y / withObj.weight
        }
        obj.push(nO);
        withObj.div.remove();
        this.div.remove();
        $('.path-' + withObj.id).remove();
        $('.path-' + this.id).remove();
        obj.splice(obj.indexOf(withObj), 1);
        obj.splice(obj.indexOf(this), 1);

        if (nO.weight > biggest.weight) {
            $('.path').remove();
            biggest = nO;
        }
    }

};
