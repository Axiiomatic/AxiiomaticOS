import axios from 'axios';

const func = async (args: string[]) => {
    try {
        const { data } = await axios.get(`https://wttr.in/${args.join(' ')}?A0Tm`);
        return data;
    } catch (error) {
        console.error('Error:', error);
        return 'Failed to fetch weather data';
    }
};
  
export default {
    func,
    description: "Prints the weather data for a given location"
};