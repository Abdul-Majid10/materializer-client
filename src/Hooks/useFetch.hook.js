import { useEffect, useState } from "react";
import { publicRequest, BASE_URL } from "../middleware/requestMethods";
import axios from "axios";
import { useSelector } from "react-redux";



export const useFetch = (requestAuthType, url, method, others = {}) => {

    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { currentUser } =  useSelector(state => state.user)

    const userRequest = () => axios.create({
        baseURL: BASE_URL,
        headers:{
          token : currentUser?.token ? `Bearer ${currentUser.token}` : ""
        }});

    const fetchData = async () => {
        try {
            let config = {};
            let requestType = publicRequest;
            if (requestAuthType === 'user') {requestType = userRequest()}
            if (others){
                let data = Object.assign({}, others);
                config.params = data;
            }
            config.url = url;
            config.method = method;
            const result = await requestType.request(config);
            setResponse(result.data);
        } catch (error) {
            setError(error?.response?.data?.error ?? error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [url]);

    return { response, error, loading, fetchData };
};
