function Observer(data) {
  this.data=data;
  this.walk(data) //提供在子元素还是对象时的遍历
}
let p = Observer.prototype;
p.walk=function(obj) {
  for(var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];
      if(typeof(val)=="object") {
        new Observer(val);
      }//如果子元素仍是对象，进行遍历
      this.convert(key,val)
    }
  }
}

p.convert=function(key,val) {
  Object.defineProperty (this.data,key,{
    enumerable: true,
    configurable: true,
    set:function(newValue){
      console.log("你设置了"+key+"，新的值为"+newValue)
    },
    get:function(){
      console.log("你访问了"+key)
      return val
    }
  })
}

var app1 = new Observer({
  name: 'youngwind',
  age: 25,
  hobby:{
    sports:'football',
    games:'nintendo'
  }
});

var app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});