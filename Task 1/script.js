

// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');


//     ctx.fillStyle = 'white'; // фон
//     ctx.fillRect(0, 0, 400, 400);
//     ctx.fillStyle = 'white';
//     ctx.fillRect(10, 10, 400-20, 400-20);

//     var X = 75, W = 50, G = 20;
//     ctx.lineWidth = 10;
//     var colors = ['#6A9FE1', 'black', 'red', '#E1A939', 'green'];
//     var args = [
//         [X,X,W],
//         [X+W+W+G,X,W],
//         [X+W+W+G+W+W+G,X,W],
//         [X+W+G/2,X+W,W],
//         [X+W+G/2+W+W+G,X+W,W]];

//     while (colors.length > 0) {
//         ctx.strokeStyle = colors.shift();
//         ctx.beginPath();
//         ctx.arc.apply(ctx, args.shift().concat([0,Math.PI*2,true]));
//         ctx.stroke();
//     }

var canvas = document.getElementById('c1').getContext('2d');
var radius = 50;

var circles = [
    { color:'#89B8E1',   x: 2*radius - radius/2, y: 2*radius, q: [1,2,3,0] },
    { color:'black',  x: 4*radius,            y: 2*radius, q: [2,0,1,3] },
    { color:'red',    x: 6*radius + radius/2, y: 2*radius, q: [2,0,1,3] },
    { color:'#FBB131', x: 3*radius - radius/4, y: 3*radius, q: [3,0,1,2] },
    { color:'green',  x: 5*radius + radius/4, y: 3*radius, q: [3,0,1,2] }
];

function drawArc(canvas, circle, q) {
    var s = (circle.q[q]+0.5)/2 * Math.PI,
        e = (circle.q[q]-0.5)/2 * Math.PI;

    canvas.lineWidth   = 16;
    canvas.strokeStyle = 'white';
    canvas.beginPath();
    canvas.arc( circle.x, circle.y, radius, s, e, true );
    canvas.stroke();

    canvas.lineWidth   = 10;
    canvas.strokeStyle = circle.color;
    canvas.beginPath();
    canvas.arc( circle.x, circle.y, radius, s, e, true );
    canvas.stroke();
}

for ( var q = 0; q < 4; ++q ){
    circles.forEach(function(circle){
        drawArc( canvas, circle, q );
    })
}