function A()  {
	a = 1,
	b = 2
}
A.prototype.a = 1;
var bb = new A();
bb.a = 2;

console.log(bb.a);