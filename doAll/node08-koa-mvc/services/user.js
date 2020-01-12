const delay = (data, tack) => new Promise(resolve => {
    setTimeout(() => {
        resolve(data)
    }, tack)
})

module.exports = app => ({
    getName() {
        return delay('老铁', 1000)
    },
    getAge() {
        return 20
    },
    async getFruits() {
        return await app.$model.Fruits.findAll();
    }
})