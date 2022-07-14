const Jimp = require("jimp");

exports.setup = function(Map) {
	if(!Map.$.prototype["dst"]) {
		Map.$.prototype["dst"] = function() {
			
			let output = 0;
			
			if(!Map.func["dst"]) {
				Map.func["dst"] = function(me) {
					
					const w = me.w;
					const h = me.h;
					
					const buffer = new Jimp(me.w,me.h);
					const pixels = me.buffer[(me.cnt)&1];
					
					for(var i=0; i<h; i++) {
						for(var j=0; j<w; j++) {
							const addr = i*w+j;
							const xy = (pixels[addr])>>>0;
							const x = (xy>>16)&0xFFFF;
							const y = xy&0xFFFF;
							buffer.setPixelColor(((y&0xFF)<<24|(y>>8)<<16|(x&0xFF)<<8|(x>>8))>>>0,j,i);
						}
					}
					
					if(output!==0) {
						buffer.write("Map-"+output+".png");
					}
					else {
						buffer.write("Map.png");
					}
					output++;
					return me;
				}
			}
			
			const dst = function(v) { return "this.dst("+`${v}`+")" };
			const code = (Map.composite(dst,this.func))();
			(Function(code).bind(Map.func))();
			
			return this;
		}
	}
}