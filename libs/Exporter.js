exports.setup = function(Map) {
	if(!Map.$.prototype["dst"]) {
		Map.$.prototype["dst"] = function() {
			
			let output = 0;
			
			if(!Map.func["dst"]) {
				Map.func["dst"] = function(me) {
					if(output!==0) {
						me.buffer[(me.cnt)&1].write("Map-"+output+".png");
					}
					else {
						me.buffer[(me.cnt)&1].write("Map.png");
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