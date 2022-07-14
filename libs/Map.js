const Jimp = require("jimp");
const Map = {
	composite:(y,z)=>(x)=>y(z(x)),
	$:(function(){}),
	func:{},
	setup:function(w,h) {
		return {
			w:w,
			h:h,
			cnt:0,
			buffer:[new Jimp(w,h),new Jimp(w,h)]
		};
	}
};


const Generator = require("./Generator").setup(Map);
exports.src = Generator.src;
require("./Transform").setup(Map);
require("./Exporter").setup(Map);
