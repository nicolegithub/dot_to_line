var DotToLine = function(canvas,cw,ch,options){
  this.ctx = canvas.getContext('2d');
  this.cw = canvas.width = cw;
  this.ch = canvas.height = ch;

  this.dotsCount = parseInt(cw * ch / 24000);
  this.maxDotsCount = this.dotsCount * 2;
  this.dotsDistance = 120;
  this.dotsColor = '255,255,255'
  
  if (options) {
    for (var i in options) {
      this[options[i]] = options[i] || this[options[i]]
    }
  }

  this.dotsArr = [];

  var _this = this;
  this.dotObj = {
    ctx: _this.ctx,
    cw: cw,
    ch: ch,
    dotsColor: _this.dotsColor,
    dotsDistance: _this.dotsDistance
  }

  this._init()
}
DotToLine.prototype = {
  constructor: DotToLine,
  _init: function() {
    for (var i = 0; i < this.dotsCount; i ++) {
      var dot = new Dot(this.dotObj);
      dot.init()
      this.dotsArr.push(dot);
    }

    this.anim()
    this.onMouseClick()
    this.onMouseMove()
  },
  anim: function() {
    var requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
    requestAnimFrame(animateUpdate); // compatible with different browsers
    
    var _this = this;

    function animateUpdate() {
      _this.ctx.clearRect(0, 0, _this.cw, _this.ch); // clear canvas
      for (var i = 0; i < _this.dotsArr.length; i ++) {
        var callback = null
        if (_this.dotsArr.length>_this.dotsCount) {
          callback = function(){
            _this.dotsArr.splice(i,1)
          }
        }
        _this.dotsArr[i].update(callback);
        // console.log(_this.dotsArr.length)
        for (var j = i + 1; j < _this.dotsArr.length; j ++) {
          var dotIX = _this.dotsArr[i].x,
              dotIY = _this.dotsArr[i].y,
              dotJX = _this.dotsArr[j].x,
              dotJY = _this.dotsArr[j].y,
              s = Math.sqrt(Math.pow(dotIX - dotJX, 2) + Math.pow(dotIY - dotJY, 2)); // right triangle
            if (s < _this.dotsDistance) {
              //draw a line
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
      if (_this._checkInside(tx,ty)) {
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
      if (_this._checkInside(tx,ty)) {
        var dot = new Dot(_this.dotObj);
        dot.init(tx,ty)
        _this.dotsArr.push(dot);
        if (_this.maxDotsCount<_this.dotsArr.length) {
          _this.dotsArr.shift()
        }
      }  
    }
  },
  _checkInside: function(tx,ty) {
    if ((tx > 0 && tx < this.cw) && (ty > 0 && ty < this.ch)) {
      return true
    }
    return false
  }
} 
