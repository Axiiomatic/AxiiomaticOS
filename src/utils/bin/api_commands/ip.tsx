import axios from 'axios';
import { ipErrorFailedRequest } from "@/paraglide/messages";

const func = async () => {
    try {
        const { data } = await axios.get(`https://api.ipify.org?format=json`);
        return data.ip;
    } catch (error) {
        console.error('Error:', error);
        return ipErrorFailedRequest();
    }
};
  
export default {
    func,
    description: {
        "en": "Prints the current IP address",
        "es": "Imprime la dirección IP actual"
    },
    validArgs: []
};