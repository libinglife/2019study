module.exports = {
    get method() {
        return this.req.method.toLowerCase()
    },
    get url() {
        return this.req.url
    }
}