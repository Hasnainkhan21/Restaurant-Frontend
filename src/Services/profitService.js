import axios from "axios";
import { getToken } from "./orderService";
import { BASE_URL } from "./menuServices";

export const menuProfit = async () =>{
    const res = await axios.get(`${BASE_URL}/users/item-profit`, {
        headers : {Authorization: `Bearer ${getToken()}`}
    })
        return res.data
}
