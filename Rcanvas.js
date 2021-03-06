// document.write("<script language='javascript' src='js/Math.js'></script>");

function test(a) {
    var cont=a||"test";
    console.log(cont);
}

var canva;

var board;

var defult_color='white';

var defult_line_wid=2;

var objects = new Array();

var mousex = 0;
var mousey = 0;

var keyw = 0;   //鏄惁鎸変笅W寤?
var keya = 0;
var keys = 0;
var keyd = 0;
var keyf = 0;

var mouse_left = 0; //鏄惁鎸変笅榧犳爣宸﹂敭

var timeline=0;
var timeline_top=10000;

var if_over_turn = false;


function over_Turn() {
    ctx.translate(0, 600);
    ctx.scale(1, -1);
    if_over_turn=!if_over_turn;
}

function focus_On(c) {
    canva = c;
    board = c.getContext('2d');
}

function draw_Background(color) {
    board.fillStyle = color;
    board.fillRect(0, 0, c.width, c.height);
}

function get_Type(objClass) {
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
        this.color = defult_color;
    }


    function relocation_Point(x,y) {
        this.x=x;
        this.y=y;
    }
    
    function roate_Point(form_pot,form_angle) {
        var now_angle = Math.atan2(this.y-form_pot.y,this.x-form_pot.x);
        var len = Rsqrt((this.y-form_pot.y)*(this.y-form_pot.y)+(this.x-form_pot.x)*(this.x-form_pot.x));
        this.relocation(form_pot.x+Rcos(now_angle+form_angle)*len,form_pot.y+Rsin(now_angle+form_angle)*len)
    }

    Point.prototype.relocation = relocation_Point;
    Point.prototype.roate = roate_Point;

    function add_Point(form_x, form_y) {
        objects[objects.length] = new Point(form_x, form_y);
        return objects[objects.length - 1];
    }

    function draw_Point(form_point) {
        board.fillStyle = form_point.color;
        board.fillRect(form_point.x, form_point.y, 2, 2);
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
        this.color = defult_color;
        this.if_solid = false;
        this.line_wid=defult_line_wid;
    }

    Triangle.prototype.relocation = relocation_Triangle;

    function relocation_Triangle(x,y) {
        this.core_pot.x=x;
        this.core_pot.y=y;
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
        this.color = defult_color;
        this.if_solid = false;
        this.line_wid=defult_line_wid;
    }

    Square.prototype.relocation = relocation_Square;

    function relocation_Square(x,y) {
        this.core_pot.x=x;
        this.core_pot.y=y;
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

//Definition of Circle (Begin)
{
    function Circle(form_point, form_radius) {
        this.core_pot = Object.create(form_point);
        this.radius = form_radius;
        this.color = defult_color;
        this.if_solid = false;
        this.line_wid=defult_line_wid;
    }

    Circle.prototype.relocation = relocation_Circle;
    
    function relocation_Circle(x,y) {
        this.core_pot.x=x;
        this.core_pot.y=y;
    }

    function add_Circle(form_point, form_radius) {
        objects[objects.length] = new Circle(form_point, form_radius);
        return objects[objects.length - 1];
    }


    function draw_Circle(form_ci) {
        board.beginPath();
        board.arc(form_ci.core_pot.x,form_ci.core_pot.y,form_ci.radius,0,2*Pi);
        board.strokeStyle=form_ci.color;
        board.fillStyle=form_ci.color;
        board.lineWidth=form_ci.line_wid;
        board.stroke();
        if(form_ci.if_solid){
            board.fill();
        }
    }
}
//Definition of Circle (End)



function add_Object(form_obj) {
    objects[objects.length] = form_obj;
}

function draw_Objects(draw_type) {
    draw_type = draw_type || 'All';
    for (var i = 0; i < objects.length; i++) {
        var object_tpy = get_Type(objects[i]);
        if (object_tpy === 'Point' && (object_tpy === draw_type || draw_type === 'All'))
            draw_Point(objects[i]);
        if (object_tpy === 'Line' && (object_tpy === draw_type || draw_type === 'All'))
            draw_Line(objects[i]);
        if (object_tpy === 'Triangle' && (object_tpy === draw_type || draw_type === 'All'))
            draw_Triangle(objects[i]);
        if (object_tpy === 'Square' && (object_tpy === draw_type || draw_type === 'All'))
            draw_Square(objects[i]);
        if (object_tpy === 'Circle' && (object_tpy === draw_type || draw_type === 'All'))
            draw_Circle(objects[i]);
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

    function Rabs(form_a) {
        return Math.abs(form_a);
    }

    function Rsqrt(form_a) {
        return Math.sqrt(form_a);
    }

    function Rround(form_a) {
        return Math.round(form_a);
    }

    function Rfloor(form_a) {
        return Math.floor(form_a);
    }

    function Rceil(form_a) {
        return Math.ceil(form_a);
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

//bezier (begin)
{
    function PointOnCubicBezier(cp, t) {
        var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;
        var result = new Point();

        /*瑷堢畻澶氶爡寮忎總鏁?*/

        cx = 3.0 * (cp[0].x);
        bx = 3.0 * (cp[1].x - cp[0].x) - cx;
        ax = 100 - cx - bx;

        cy = 3.0 * (cp[0].y);
        by = 3.0 * (cp[1].y - cp[0].y) - cy;
        ay = 100 - cy - by;

        /*瑷堢畻浣嶆柤鍙冩暩鍊紅鐨勬洸绶氶粸*/

        tSquared = t * t;
        tCubed = tSquared * t;

        result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + 0;
        result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + 0;

        return result;
    }

    function ComputeBezier(cp, numberOfPoints, curve) {
        var dt;
        var i;
        var temp=new Array();
        dt = 1.0 / (numberOfPoints*5 - 1);

        for (i = 0; i < numberOfPoints*5; i++) {
            temp[i] = PointOnCubicBezier(cp, i * dt);
            curve[Rfloor(temp[i].x)]=temp[i].y;
        }
    }
}
//bezier (end)

//timeline (begin)
{
    var time_flash = function () {
        timeline++;
        if (timeline > 0) {
        }
        if (timeline > timeline_top)
            timeline = 0;
        // test.innerText = timeline;
    };

    var set_Timeline_top = function (a) {
        timeline_top=a;
    }
}
//timeline (end)

function clog(a) {
    console.log(a);
}


document.onkeydown = function (event) {
    var e = e || event;
//        console.log(e.keyCode);
    var speed = 10;
    if (e && e.keyCode == 87) { // 鎸? w
        keyw = 1;
    }
    if (e && e.keyCode == 83) { // 鎸? s
        keys = 1;
    }
    if (e && e.keyCode == 68) { // 鎸? d
        keyd = 1;
    }
    if (e && e.keyCode == 65) { // 鎸? a
        keya = 1;
    }
    if (e && e.keyCode == 70) { // 鎸? f
        keyf = 1;
    }

};

document.onkeyup = function (event) {
    var e = e || event;
    if (e && e.keyCode == 87) { // 鏉惧紑 w
        keyw = 0;
    }
    if (e && e.keyCode == 83) { // 鏉惧紑 s
        keys = 0;
    }
    if (e && e.keyCode == 68) { // 鏉惧紑 d
        keyd = 0;
    }
    if (e && e.keyCode == 65) { // 鏉惧紑 a
        keya = 0;
    }
    if (e && e.keyCode == 70) { // 鎸? f
        keyf = 0;
    }
};

document.onmousemove = function (e) {
    e = e || window.event;
    var rc = canva.getBoundingClientRect();
    mousex = Math.floor(e.clientX - rc.left);//鑾峰彇榧犳爣鍦╟anvsa涓殑鍧愭爣
    mousey = Math.floor(e.clientY - rc.top);
    if(if_over_turn){
        mousey=c.height-mousey;
    }
//        console.log(me.dir);
};

document.onmousedown = function (e) {
    mouse_left = 1;
};

document.onmouseup = function (e) {
    mouse_left = 0;
};