module.exports = {
    get url() {
        // console.log("上下文url", this)
        return this.request.url
    },
    get method() {
        return this.request.method
    },
    get body() {
        return this.response.body
    },
    set body(val) {
        return this.response.body = val
    }
}