var aa = {
	a: 1,
	b: 2
}

var bb = {
	aa: aa,
	bb: function(){
		this.aa.a = 3;
	}
}

bb.bb();
console.log(aa);