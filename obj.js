Obj = function (id, weight, position) {

    this.weight = weight;
    this.diameter = Math.pow(this.weight / (Math.PI * 4 / 3), 0.333) * 6

    this.id = id;

    $('body').append('<div class="obj" id="obj' + id + '" style="width:' + this.diameter + 'px; height:' + this.diameter + 'px;"></div>');
    this.div = $('#obj' + id);

    this.speed = {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5
    };
    this.position = position;

    this.getDistance = function (v) {
        return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
    };

    this.getF = function (toObjWeight, distance) {
        return this.weight * toObjWeight / Math.pow(distance, 2) / 1000;
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
    };

    this.move = function (biggest) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.div.css({top: (this.position.y - this.diameter / 2) - biggest.position.y + midY + 'px', left: (this.position.x - this.diameter / 2) - biggest.position.x + midX + 'px'});
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
        obj.splice(obj.indexOf(withObj), 1);
        obj.splice(obj.indexOf(this), 1);

        if(nO.weight > biggest.weight)
            biggest = nO;
    }

};
