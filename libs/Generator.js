exports.setup = function(Map) {
	return {
		src:function(...args) {
			
			if(!Map.func["src"]) {
				Map.func["src"] = function(w,h) {
					
					const me = Map.setup(w,h);
					const pixels = me.buffer[me.cnt];
					for(var i=0; i<h; i++) {
						for(var j=0; j<w; j++) {
							const addr = i*w+j;
							const x = 0x5555+(j<<3);
							const y = 0x5555+(i<<3);
							pixels[addr] = (x<<16|y)>>>0;
						}
					}
		
					return me;
				}
			}
			
			const instance = new Map.$();
			instance.func = (function(){ return "this.src("+this.w+","+this.h+")" }).bind({
				w:(args[0])?args[0]:1920,
				h:(args[1])?args[1]:1080
			});
			return instance;
		},
		noise:function(...args) {
			
			if(!Map.func["noise"]) {
				Map.func["noise"] = function(w,h) {
					
					const me = Map.setup(w,h);
					const pixels = me.buffer[me.cnt];
					for(var i=0; i<h; i++) {
						for(var j=0; j<w; j++) {
							const x = 0x5555+(((Math.random()*w)>>0)<<3);
							const y = 0x5555+(((Math.random()*h)>>0)<<3);
							pixels[addr] = (x<<16|y)>>>0;
						}
					}
					
					return me;
				}
			}
			
			const instance = new Map.$();
			instance.func = (function(){ return "this.noise("+this.w+","+this.h+")" }).bind({
				w:(args[0])?args[0]:1920,
				h:(args[1])?args[1]:1080
			});
			return instance;
		}
	};
};