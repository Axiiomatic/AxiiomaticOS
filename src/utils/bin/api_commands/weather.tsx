import axios from 'axios';
import { languageTag } from '@/paraglide/runtime';
import { weatherErrorFailedRequest } from '@/paraglide/messages';


const func = async (args: string[]) => {
    try {
        const { data } = await axios.get(`https://wttr.in/${args.join(' ')}?A0T${languageTag() === "en" ? '' : `&lang=${languageTag()}`}`);
        return data;
    } catch (error) {
        return weatherErrorFailedRequest();
    }
};
  
export default {
    func,
    description: {
        "en": "Prints the weather data for a given location",
        "es": "Imprime la información del tiempo para alguna ubicación"
    }
};