
var drawingCanvas;
var oldPt;
var oldMidPt;
var title;
var colors;
var index;
var lastEmit = $.now();
//generate unique id for the new user

$(function () {
    //===================================================================
    //drawing with socket
    canvas = document.getElementById("paper");
    index = 0;
    //colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];

    //check to see if we are running in a browser with touch support
    stage = new createjs.Stage(canvas);
    stage.autoClear = false;
    stage.enableDOMEvents(true);

    createjs.Touch.enable(stage);
    createjs.Ticker.framerate = 24;

    drawingCanvas = new createjs.Shape();

    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);

    title = new createjs.Text("Click and Drag to draw", "36px Arial", "#777777");
    title.x = 300;
    title.y = 200;
    stage.addChild(title);

    stage.addChild(drawingCanvas);
    stage.update();
});

//===============================================================================
//drawing helper functions
function handleMouseDown(event) {
    if (!event.primary) { return; }
    if (stage.contains(title)) {
        stage.clear();
        stage.removeChild(title);
    }

    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    oldMidPt = oldPt.clone();
    if (drawing) stage.addEventListener("stagemousemove", handleMouseMove);
}

function handleMouseMove(event) {
    if (!event.primary) { return; }

    var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);
    //draw your line
    drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);
    //send data
    if ($.now() - lastEmit > 1) {
        socket.emit('mousemove', {
            'midx': midPt.x,
            'midy': midPt.y,
            'oldx': oldPt.x,
            'oldy': oldPt.y,
            'oldMidx': oldMidPt.x,
            'oldMidy': oldMidPt.y,
            'color': color,
            'stroke': stroke
        });
        lastEmit = $.now();
    }

    oldPt.x = stage.mouseX;
    oldPt.y = stage.mouseY;

    oldMidPt.x = midPt.x;
    oldMidPt.y = midPt.y;

    stage.update();
}

function handleMouseUp(event) {
    if (!event.primary) { return; }
    if (drawing) stage.removeEventListener("stagemousemove", handleMouseMove);
}

socket.on('moving', function (data) {
    drawingCanvas.graphics.clear().setStrokeStyle(data.stroke, 'round', 'round').beginStroke(data.color).moveTo(data.midx, data.midy).curveTo(data.oldx, data.oldy, data.oldMidx, data.oldMidy);
    stage.update();
});
