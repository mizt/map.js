exports.setup = function(Map) {
	return {
		mix:function(...args) {
			
			if(!Map.func["mix"]) {
				Map.func["mix"] = function(a,b,wet) {
					
					const w = a.w;
					const h = a.h;
					
					if(wet<=0) wet = 0;
					else if(wet>=1.0) wet = 1.0;
					
					const dry = 1.0-wet;
					
					const A = a.buffer[(a.cnt)&1];
					const B = b.buffer[(b.cnt)&1];
					
					for(var i=0; i<h; i++) {
						for(var j=0; j<w; j++) {
							
							const addr = i*w+j;
							
							const xy = A[addr];
							const zw = B[addr];
							
							A[addr] = (
								((((xy>>16)&0xFFFF)*wet+((zw>>16)&0xFFFF)*dry)>>0)<<16|
								(((xy&0xFFFF)*wet+(zw&0xFFFF)*dry)>>0)
							)>>>0;
							
							
						}
					}
					
					
					return a;
				}
			}
			
			const instance = new Map.$();
			if(args.length>=3&&args[0].constructor===Map.$&&args[1].constructor===Map.$&&typeof(args[2])==="number") {
				
				instance.func = (function(){ return "this.mix("+this[0]+","+this[1]+","+this[2]+")"; }).bind([args[0].func(),args[1].func(),args[2]]);
			}
			else {
				throw "Invalid Argument";
			}
			return instance;
		}
	};
};
