var DotToLine = function(canvas,cw,ch,options){
  this.ctx = canvas.getContext('2d');
  this.cw = canvas.width = cw;
  this.ch = canvas.height = ch;

  this.dotsCount = parseInt(cw * ch / 30000);
  this.maxDotsCount = this.dotsCount * 2;
  this.dotsDistance = 120;
  this.dotsColor = '255,255,255'

  if (options) {
    for (var i in options) {
      this[options[i]] = options[i] || this[options[i]]
    }
  }
  this.dotsArr = [];
  this._init()
}
DotToLine.prototype = {
  constructor: DotToLine,
  _init: function() {
    for (var i = 0; i < this.dotsCount; i ++) {
      var dot = new Dot(this.ctx,this.cw,this.ch,this.dotsColor);
      dot.init()
      this.dotsArr.push(dot);
    }
    this.anim()
    this.onMouseClick()
    this.onMouseMove()
  },
  anim: function() {
    var _this = this;
    var requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
    requestAnimFrame(animateUpdate); // compatible with different browsers
    function animateUpdate() {
      _this.ctx.clearRect(0, 0, cw, ch); // clear canvas
      //draw a line
      for (var i = 0; i < _this.dotsCount; i ++) {
        _this.dotsArr[i].update();
        for (var j = i + 1; j < _this.dotsCount; j ++) {
            var dotIX = _this.dotsArr[i].x,
                dotIY = _this.dotsArr[i].y,
                dotJX = _this.dotsArr[j].x,
                dotJY = _this.dotsArr[j].y,
                s = Math.sqrt(Math.pow(dotIX - dotJX, 2) + Math.pow(dotIY - dotJY, 2)); // right triangle
            if (s < _this.dotsDistance) {
              _this.ctx.beginPath();
              _this.ctx.moveTo(dotIX, dotIY);
              _this.ctx.lineTo(dotJX, dotJY);
              _this.ctx.strokeStyle = 'rgba('+_this.dotsColor+','+(_this.dotsDistance-s) / _this.dotsDistance+')';
              _this.ctx.strokeWidth = 1;
              _this.ctx.stroke();
              _this.ctx.closePath();
            }
        }
      }
      requestAnimFrame(animateUpdate);
    }
  },
  onMouseMove: function(){
    document.addEventListener('mousemove', _moveDot)
    var _this = this;
    function _moveDot(e) {
      var tx = e.pageX,
          ty = e.pageY;
      if ((tx > 0 && tx < cw) && (ty > 0 && ty < ch)) {
        _this.dotsArr[0].init(tx,ty)
      }  
    }
  },
  onMouseClick: function() {
    document.addEventListener('click', _createDot);
    var _this = this;
    function _createDot(e) {
      var tx = e.pageX,
          ty = e.pageY;
      if ((tx > 0 && tx < cw) && (ty > 0 && ty < ch)) {
        var dot = new Dot(_this.ctx,this.cw,this.ch,this.dotsColor);
        dot.init(tx,ty)
        _this.dotsArr.push(dot);
        _this.dotsCount++
      }  
    }
  }
} 
