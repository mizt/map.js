const fs = require("fs");
const Jimp = require("jimp");

const composite = (y,z)=>(x)=>y(z(x));

const Map = {
	
	src:function(w,h) {
		
		this.cnt = 0;
		
		this.w = w;
		this.h = h;
		
		this.buffer = [
			new Jimp(w,h),
			new Jimp(w,h)
		];
		
		for(var i=0; i<h; i++) {
			for(var j=0; j<w; j++) {
				const x = 0x5555+(j<<3);
				const y = 0x5555+(i<<3);
				this.buffer[this.cnt].setPixelColor(((y&0xFF)<<24|(y>>8)<<16|(x&0xFF)<<8|(x>>8))>>>0,j,i);
			}
		}
		return this;
	},
	
	offset:function(me,x,y) {
		
		const w = me.w;
		const h = me.h;
		
		const s = (me.cnt)&1;
		const d = (++me.cnt)&1;
		
		for(var i=0; i<h; i++) {
			for(var j=0; j<w; j++) {
				me.buffer[d].setPixelColor(me.buffer[s].getPixelColor((j+x)%w,(i+y)%h),j,i);
			}
		}
		return me;
	},
	
	dst:function(me) { 
		me.buffer[(me.cnt)&1].write("Map.png");
	}
};
	
module.exports.src = new (function() {
	
	const _Map = function(){};
	
	this.src = function(...args) {
		let w = 1920;
		let h = 1080;
		if(Array.isArray(args)&&args.length>=1) {
			w = args[0];
			if(args[1]) h = args[1];
		}
		_Map.func = (function(){ return "this.src("+this.w+","+this.h+")"; }).bind({w:w,h:h});
		return Object.create(_Map.prototype);
	}
	
	_Map.prototype.offset = function(...args) {
		_Map.func = composite(function(v){ return "this.offset("+`${v}`+","+((this&&Array.isArray(this)&&this.length>=2)?this.join(","):"0,0")+")" }.bind(args),_Map.func);
		return this;
	}
	
	_Map.prototype.dst = function(...args) {
		const dst = function(v){ return "this.dst("+`${v}`+")" };
		const code = (composite(dst.bind(args),_Map.func))();
		console.log(code);
		(Function(code).bind(Map))();
	}
	
})().src;
