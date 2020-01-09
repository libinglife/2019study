const delay = (data, tack) => new Promise(resolve => {
    setTimeout(() => {
        resolve(data)
    }, tack)
})

module.exports = app => ({

    async getPlayer() {
        return await app.$model.player.findAll();
    }
})