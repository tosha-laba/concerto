package view;

import js.Browser;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import view.Image.JSImage;
import model.MusicVenue;

class JSView extends View {
    private var canvas: CanvasElement;
    private var context: CanvasRenderingContext2D;

    public function new(venue: MusicVenue) {
        super(venue);
    }

    override function init() {
        canvas = Browser.document.createCanvasElement();
        canvas.id = "concerto:canvas";
        canvas.width = Std.int(venue.width);
        canvas.height = Std.int(venue.height);
		canvas.style.width = canvas.width + "px";
		canvas.style.height = canvas.height + "px";
        canvas.style.backgroundColor = "#f1f1f1";

        context = canvas.getContext2d();
        context.imageSmoothingEnabled = false;

        Browser.window.onload = function(e) {
            Browser.document.body.appendChild(canvas);
            loop(0);
        }
    }

    function loop(f: Float) {
        update();

        Browser.window.requestAnimationFrame(loop);
    }

    override function loadImage(path: String): Image {
        return new JSImage(path, context);
    }

    override function clearScene() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    override function drawCone() {
        var cone = venue.getStage().getCone();
        var centerX = venue.getStage().x;
        var centerY = venue.getStage().y;

        var dirLen = Math.sqrt(cone.getDirection().x*cone.getDirection().x+cone.getDirection().y*cone.getDirection().y);
        var dirAngle = Math.acos(cone.getDirection().x/dirLen);
        var startAngle = dirAngle - cone.angle/2;
        var endAngle = dirAngle + cone.angle/2;

        context.save();
            context.fillStyle = 'rgba(0, 255, 0, 0.5)';
            context.strokeStyle = 'rgb(0, 255, 0)';
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, cone.radius, startAngle, endAngle);
            context.lineTo(centerX, centerY);
            context.fill();
            context.stroke();
        context.restore();
    }

    override function printText(x: Float, y: Float, caption: String) {
        context.save();
            context.font = '20px Sans-serif';
            context.strokeStyle = 'black';
            context.lineWidth = 4;
            context.strokeText(caption, x, y + 10);
            context.fillStyle = 'white';
            context.fillText(caption, x, y + 10);
        context.restore();
    }
}