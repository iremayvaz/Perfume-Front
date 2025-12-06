import axios from "../utils/axios";

export const getProducts = async () => {
    return await axios.get("/perfume/list").then((response) => response.data);
};

export const getProductDetail = async (id) => {
    return axios.get(`/perfume/${id}`);
};