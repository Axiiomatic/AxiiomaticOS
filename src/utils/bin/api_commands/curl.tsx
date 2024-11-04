import axios from 'axios';
import { curlErrorNoURL, curlErrorFailedRequest } from "@/paraglide/messages";

const func = async (args: string[]) => {
    if (args.length === 0) return curlErrorNoURL();
    console.log(args.join(' '))
    try {
        const response : string[] = []
        args.forEach(async (arg) => {
            const { data } = await axios.get(arg);
            response.push(JSON.stringify(data, null, 2));
        })
        return response.join('\n');
    } catch (error) {
        console.error('Error:', error);
        return curlErrorFailedRequest();
    }
};
  
export default {
    func,
    description: {
        "en": "Fetches data from a given URL",
        "es": "Obtiene data de una URL"
    }
};