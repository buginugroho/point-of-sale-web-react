import axios from "axios";

const myAxios = axios.create({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
    baseURL: "http://localhost:8080/pos/api"
})

export default myAxios;