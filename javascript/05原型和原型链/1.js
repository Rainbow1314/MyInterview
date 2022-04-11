~ function anonymous(proto) {
	const checkNum = function checkNum(num) {
		num = Number(num);
		if (isNaN(num)) {
			num = 0;
		}
		return num;
	};
	proto.plus = function plus(num) {
		//=>this:我们要操作的那个数字实例（对象）
		//=>返回Number类的实例，实现链式写法
		return this + checkNum(num);
	};
	proto.minus = function minus(num) {
		return this - checkNum(num);
	};
}(Number.prototype);

// let n = 10;
// let m = n.plus(10).minus(5);
// console.log(m); //=>15（10+10-5）

/*
 * 创建一个数据类型值：
 *   1.字面量方式
 *   2.构造函数方式 
 * 不论哪一种方式，创建出来的结果都是所属类的实例
 */
//=>基本数据类型两种创建方式是不一样的：字面量创建的是基本类型值，构造函数方式创建的是引用类型值
// let x = 10;
// let y = new Number(10);
// console.log(y.valueOf() === x); //=>对象结果的原始值是基本类型数字10

//=========================
/* function fun() {
	this.a = 0;
	this.b = function () {
		alert(this.a);
	}
}
fun.prototype = {
	//=>constructor:fun,
	b: function () {
		this.a = 20;
		alert(this.a);
	},
	c: function () {
		this.a = 30;
		alert(this.a)
	}
}
var my_fun = new fun();
my_fun.b();
my_fun.c(); */

//===================================
/* function C1(name) {
	//=>name:undefined 没有给实例设置私有的属性name
	if (name) {
		this.name = name;
	}
}

function C2(name) {
	this.name = name;
	//=>给实例设置私有属性name =>this.name=undefined
}

function C3(name) {
	this.name = name || 'join';
	//=>给实例设置私有属性name =>this.name=undefined || 'join'
}
C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';
alert((new C1().name) + (new C2().name) + (new C3().name));
//=> (new C1().name) 找原型上的 'Tom'
//=> (new C2().name) 找私有属性 undefined
//=> (new C3().name) 找私有属性 'join'
//=> 'Tomundefinedjoin' */

//================================
/* function Foo() {
	getName = function () {
		console.log(1);
	};
	return this;
}
Foo.getName = function () {
	console.log(2);
};
Foo.prototype.getName = function () {
	console.log(3);
};
var getName = function () {
	console.log(4);
};

function getName() {
	console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence JS运算符的优先级 */


//================================
/*
 * ==相等 VS ===绝对相等
 *   1.左右数据值类型不同，三个等号不能转换数据类型，直接返回false，但是两个等于号会默认先转换为一致的数据类型再进行比较 
 * 
 * NaN==NaN ：NaN和谁都不相等（包括自己）
 * null==undefined：null和undefined两个等号比较是相等的（三个则不相等），但是他们和其它任何值都不相等
 * 对象==字符串：把对象转换为字符串（对象.toString()）
 * 剩余的情况都是转换为数字（对象转换数字：Number(对象.toString())）
 */

/* 方案一：利用比较的时候默认会转化为字符串的机制，我们通过重写toString来完成需求 */
/* var a = {
	i: 0,
	toString() {
		return ++this.i;
	}
};
//=>a == 1 ：a.toString()
if (a == 1 && a == 2 && a == 3) {
	console.log('OK');
} */

/* var a = [1, 2, 3];
a.toString = a.shift;
if (a == 1 && a == 2 && a == 3) {
	console.log('OK');
} */

/* 方案二： Object.defineProperty劫持对象中某个属性的操作 */
//全局变量也是给window设置一个全局属性
/* var i = 0;
Object.defineProperty(window, 'a', {
	get() {
		//=>获取window.a的时候触发
		return ++i;
	},
	set() {
		//=>给window.a设置属性值的时候触发
	}
});
if (a == 1 && a == 2 && a == 3) {
	console.log('OK');
} */

//==================================
/* Array.prototype.push = function push(num) {
	//=>this:arr
	//this.length=this.length||0;
	//=>拿原有length作为新增项的索引
	this[this.length] = num;
	//=>length的长度会自动跟着累加1
};
let arr = [10, 20]; //=>{0:10,1:20,length:2}
arr.push(30); */

/* let obj = {
	2: 3,
	3: 4,
	length: 2,
	push: Array.prototype.push
};
obj.push(1); //=>obj[2]=1  obj.length=3
obj.push(2); //=>obj[3]=2  obj.length=4
console.log(obj); //=>{2:1,3:2,length:4...} */

/* let obj = {
	1: 10,
	push: Array.prototype.push
};
obj.push(20); //=>obj[obj.length]=20   obj[0]=20
console.log(obj); */