let person = {
    info: {
        name: '李兵',
        age: '20'
    },
    get name() {
        return this.info.name
    },
    set name(val) {
        this.info.name = val
    }
}

console.log(person.name);
person.name = "老铁"
console.log(person.name);