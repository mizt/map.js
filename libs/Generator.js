exports.setup = function(Map) {
	return {
		src:function(...args) {
			
			if(!Map.func["src"]) {
				Map.func["src"] = function(w,h) {
					
					me = Map.setup(w,h);
					
					for(var i=0; i<h; i++) {
						for(var j=0; j<w; j++) {
							const x = 0x5555+(j<<3);
							const y = 0x5555+(i<<3);
							me.buffer[me.cnt].setPixelColor(((y&0xFF)<<24|(y>>8)<<16|(x&0xFF)<<8|(x>>8))>>>0,j,i);
						}
					}
		
					return me;
				}
			}
			
			const instance = new Map.$();
			instance.func = (function(){ return "this.src("+this.x+","+this.y+")" }).bind({
				x:(args[0])?args[0]:1920,
				y:(args[1])?args[1]:1080
			});
			return instance;
		}
	};
};