import axios from "axios";

export let loginApi = (user) => {
    return axios.get("/api/login", { params: user })
}