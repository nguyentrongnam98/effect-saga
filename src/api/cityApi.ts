import { city, listResponse, Params } from "../models";
import axiosClient from "./axios";

const apiCity = {
    getAll(params:Params):Promise<listResponse<city>>{
        const url = '/cities'
        return axiosClient.get(url, {params})
    }
}

export default apiCity;