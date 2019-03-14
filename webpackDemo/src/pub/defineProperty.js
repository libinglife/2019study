
var obj ={
    "name":"李兵" ,
    "age" :"25"
};

Object.defineProperty(obj,"name",{
    value : "libing",
    writable :true, //是否可以被重写
    enumerable : true
});

Object.defineProperty(obj,"newKey" ,{
    "value" :'newValue',
    writable:false,
    enumerable:true //是否可以被枚举
});

for (var key in obj){ //遍历对象
    console.log(key +"=="+ obj[key])
}

var keys =Object.keys(obj);

keys.map((key , index)=>{  //key 值 ，index 索引
    console.log(index +key+"="+obj[key])
})

console.log(keys)
console.log(obj)