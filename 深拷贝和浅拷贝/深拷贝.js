function deepCopy(obj) {
    let result = Array.isArray(obj) ? [] :{};
    console.log(result)
    for (let key in obj){
        if(obj.hasOwnProperty(key)){
            if(typeof obj[key]=="object" && obj[key]!= null){
                result[key] = deepCopy(obj[key])
            }else {
                result[key] = obj[key];
            }
        }
    }
    return result
}

var obj1 = {
    name:'libing',
    favs:[1,2,3,4]
};


var obj2 = deepCopy(obj1);

console.log(obj2);
obj2.age = 20;
console.log(obj2);
console.log(obj1);
