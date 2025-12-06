const instance = axios.create({
    baseURL: apiURL,
});

instance.interceptors.request.use((config) => {
    return config;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => error,
);

export default instance;
