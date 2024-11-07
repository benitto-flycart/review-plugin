import {axiosClient} from "./axios";

export const fetchLocalData = async () => {

    const response = await axiosClient.post('', {
        method: 'get_local_data',
    });

    return response.data;
}