exports.setup = function(Map) {
		
	if(!Map.$.prototype["translate"]) {
		Map.$.prototype["translate"] = function(...args) {
			
			if(!Map.func["translate"]) {
				Map.func["translate"] = function(me,x,y) {
					
					const w = me.w;
					const h = me.h;
					
					const src = (me.cnt)&1;
					const dst = (++me.cnt)&1;
					
					for(var i=0; i<h; i++) {
						for(var j=0; j<w; j++) {
							me.buffer[dst].setPixelColor(me.buffer[src].getPixelColor((j+x)%w,(i+y)%h),j,i);
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
