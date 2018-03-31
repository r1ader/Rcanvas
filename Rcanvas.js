// document.write("<script language='javascript' src='js/Math.js'></script>");

function test() {
    var a = -1;
    a = std_angle(a, Pi / 3);
    console.log(a);
}

var board;

var defult_color='white';

var defult_line_wid=2;

var objects = new Array();

function focus_On(c) {
    board = c.getContext('2d');
}

function draw_Background(color) {
    board.fillStyle = color;
    board.fillRect(0, 0, c.width, c.height);
}

function __typeof__(objClass) {
    if (objClass !== undefined && objClass.constructor) {
        var strFun = objClass.constructor.toString();
        var className = strFun.substr(0, strFun.indexOf('('));
        className = className.replace('function', '');
        return className.replace(/(^\s*)|(\s*$)/ig, '');
        // return className;
    }
    return typeof(objClass);
}

//Definition of Point (Begin)
{
    function Point(form_x, form_y) {
        this.x = form_x;
        this.y = form_y;
        this.speed_x = 0;
        this.speed_y = 0;
        this.color = defult_color;
    }

    function update_Point() {
        this.x += this.speed_x;
        this.y += this.speed_y;
    }

    Point.prototype.update = update_Point;

    function add_Point(form_x, form_y) {
        objects[objects.length] = new Point(form_x, form_y);
        return objects[objects.length - 1];
    }

    function draw_Point(form_point) {
        board.fillStyle = this.color;
        board.fillRect(form_point.x, form_point.y, 1, 1);
    }
}
//Definition of Point (End)


//Definition of Line (Begin)
{
    function Line(form_point_a, form_point_b) {
        this.start_pot = form_point_a;
        this.end_pot = form_point_b;
        this.line_wid = defult_line_wid;
        this.color = defult_color;
    }

    function update_Line() {
        this.start_pot.update();
        this.end_pot.update();
    }

    Line.prototype.update = update_Line;

    function add_Line(form_point_a, form_point_b) {
        objects[objects.length] = new Line(form_point_a, form_point_b);
        return objects[objects.length - 1];
    }

    function draw_Line(form_Line) {
        board.beginPath();
        board.moveTo(form_Line.start_pot.x, form_Line.start_pot.y);
        board.lineTo(form_Line.end_pot.x, form_Line.end_pot.y);
        board.closePath();
        board.strokeStyle = form_Line.color;
        board.lineWidth = form_Line.line_wid;
        board.stroke();
    }

}
//Definition of Line (End)


//Definition of Triangle (Begin)
{
    function Triangle(form_point, form_side, form_dir) {
        this.core_pot = Object.create(form_point);
        this.side_len = form_side;
        this.dir = form_dir;
        this.speed_dir = 0;
        this.color = defult_color;
        this.if_solid = false;
        this.line_wid=defult_line_wid;
    }

    Triangle.prototype.update = update_Triangle;

    function update_Triangle() {
        this.core_pot.update();
        this.dir += this.speed_dir;
        this.dir = std_angle(this.dir, 2*Pi / 3);
    }

    function add_Triangle(form_point, form_side, form_dir) {
        objects[objects.length] = new Triangle(form_point, form_side, form_dir);
        return objects[objects.length - 1];
    }


    function draw_Triangle(form_tr) {
        board.beginPath();
        var x=form_tr.core_pot.x+Rcos(form_tr.dir)*form_tr.side_len/Rsqrt(3);
        var y=form_tr.core_pot.y+Rsin(form_tr.dir)*form_tr.side_len/Rsqrt(3);
        board.moveTo(x,y);
        x=form_tr.core_pot.x+Rcos(form_tr.dir+Pi*2/3)*form_tr.side_len/Rsqrt(3);
        y=form_tr.core_pot.y+Rsin(form_tr.dir+Pi*2/3)*form_tr.side_len/Rsqrt(3);
        board.lineTo(x,y);
        x=form_tr.core_pot.x+Rcos(form_tr.dir+Pi*4/3)*form_tr.side_len/Rsqrt(3);
        y=form_tr.core_pot.y+Rsin(form_tr.dir+Pi*4/3)*form_tr.side_len/Rsqrt(3);
        board.lineTo(x,y);
        x=form_tr.core_pot.x+Rcos(form_tr.dir)*form_tr.side_len/Rsqrt(3);
        y=form_tr.core_pot.y+Rsin(form_tr.dir)*form_tr.side_len/Rsqrt(3);
        board.lineTo(x,y);
        board.strokeStyle=form_tr.color;
        board.fillStyle=form_tr.color;
        board.lineWidth=form_tr.line_wid;
        board.stroke();
        if(form_tr.if_solid){
            board.fill();
        }
    }
}
//Definition of Triangle (End)

//Definition of Square (Begin)
{
    function Square(form_point, form_side, form_dir) {
        this.core_pot = Object.create(form_point);
        this.side_len = form_side;
        this.dir = form_dir;
        this.speed_dir = 0;
        this.color = defult_color;
        this.if_solid = false;
        this.line_wid=defult_line_wid;
    }

    Square.prototype.update = update_Square;

    function update_Square() {
        this.core_pot.update();
        this.dir += this.speed_dir;
        this.dir = std_angle(this.dir, Pi / 2);
    }

    function add_Square(form_point, form_side, form_dir) {
        objects[objects.length] = new Square(form_point, form_side, form_dir);
        return objects[objects.length - 1];
    }


    function draw_Square(form_sq) {
        board.beginPath();
        var x=form_sq.core_pot.x+Rcos(form_sq.dir)*form_sq.side_len/Rsqrt(2);
        var y=form_sq.core_pot.y+Rsin(form_sq.dir)*form_sq.side_len/Rsqrt(2);
        board.moveTo(x,y);
        x=form_sq.core_pot.x+Rcos(form_sq.dir+Pi/2)*form_sq.side_len/Rsqrt(2);
        y=form_sq.core_pot.y+Rsin(form_sq.dir+Pi/2)*form_sq.side_len/Rsqrt(2);
        board.lineTo(x,y);
        x=form_sq.core_pot.x+Rcos(form_sq.dir+Pi)*form_sq.side_len/Rsqrt(2);
        y=form_sq.core_pot.y+Rsin(form_sq.dir+Pi)*form_sq.side_len/Rsqrt(2);
        board.lineTo(x,y);
        x=form_sq.core_pot.x+Rcos(form_sq.dir+Pi*3/2)*form_sq.side_len/Rsqrt(2);
        y=form_sq.core_pot.y+Rsin(form_sq.dir+Pi*3/2)*form_sq.side_len/Rsqrt(2);
        board.lineTo(x,y);
        x=form_sq.core_pot.x+Rcos(form_sq.dir)*form_sq.side_len/Rsqrt(2);
        y=form_sq.core_pot.y+Rsin(form_sq.dir)*form_sq.side_len/Rsqrt(2);
        board.lineTo(x,y);
        board.strokeStyle=form_sq.color;
        board.fillStyle=form_sq.color;
        board.lineWidth=form_sq.line_wid;
        board.stroke();
        if(form_sq.if_solid){
            board.fill();
        }
    }
}
//Definition of Square (End)

function add_Object(form_obj) {
    objects[objects.length] = form_obj;
}

function draw_Objects(draw_type) {
    draw_type = draw_type || 'All';
    for (var i = 0; i < objects.length; i++) {
        var object_tpy = __typeof__(objects[i]);
        if (object_tpy === 'Point' && (object_tpy === draw_type || draw_type === 'All'))
            draw_Point(objects[i]);
        if (object_tpy === 'Line' && (object_tpy === draw_type || draw_type === 'All'))
            draw_Line(objects[i]);
        if (object_tpy === 'Triangle' && (object_tpy === draw_type || draw_type === 'All'))
            draw_Triangle(objects[i]);
        if (object_tpy === 'Square' && (object_tpy === draw_type || draw_type === 'All'))
            draw_Square(objects[i]);
    }
}

function update_Objects(update_type) {
    update_type = update_type || 'All';
    for (var i = 0; i < objects.length; i++) {
        var object_tpy = __typeof__(objects[i]);
        if (update_type === object_tpy || update_type === 'All')
            objects[i].update();
    }
}


//Math Part (Begin)
{
    var Pi = Math.PI;

    function Rcos(form_a) {
        return Math.cos(form_a);
    }

    function Rsin(form_a) {
        return Math.sin(form_a);
    }

    function Rtan(form_a) {
        return Math.sin(form_a);
    }

    function Rsqrt(form_a) {
        return Math.sqrt(form_a);
    }

    function Rround(form_a) {
        return Math.round(form_a);
    }

    function std_angle(form_agl, form_std) {
        while (form_agl < 0) {
            form_agl += form_std;
        }
        while (form_agl >= form_std) {
            form_agl -= form_std;
        }
        return form_agl;
    }
}
//Math Part (end)