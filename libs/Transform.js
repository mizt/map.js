exports.setup = function(Map) {
		
	if(!Map.$.prototype["translate"]) {
		Map.$.prototype["translate"] = function(...args) {
			
			if(!Map.func["translate"]) {
				Map.func["translate"] = function(me,x,y) {
					
					const w = me.w;
					const h = me.h;
					
					const src = me.buffer[(me.cnt)&1];
					const dst = me.buffer[(++me.cnt)&1];
					
					for(var i=0; i<h; i++) {
						for(var j=0; j<w; j++) {
							const addr = i*w+j;
							dst[addr] = src[((i+y)%h)*w+((j+x)%w)];
						}
					}
					
					return me;
				}
			}
			
			this.func = Map.composite(function(v){ return "this.translate("+`${v}`+","+this.x+","+this.y+")" }.bind({
				x:(args[0])?args[0]:0,
				y:(args[1])?args[1]:0
			}),this.func);
			return this;
		}
	}
}
