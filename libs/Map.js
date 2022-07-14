const Map = {
	composite:(y,z)=>(x)=>y(z(x)),
	$:(function(){}),
	func:{},
	setup:function(w,h) {
		return {
			w:w,
			h:h,
			cnt:0,
			buffer:[new Uint32Array(w*h),new Uint32Array(w*h)]
		};
	}
};

const Generator = require("./Generator").setup(Map);
exports.src = Generator.src;
exports.noise = Generator.noise;

require("./Transform").setup(Map);
require("./Exporter").setup(Map);

const Operator = require("./Operator").setup(Map);
exports.mix = Operator.mix;
