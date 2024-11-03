import axios from 'axios';

const func = async () => {
    try {
        const { data } = await axios.get(`https://api.ipify.org?format=json`);
        return data.ip;
    } catch (error) {
        console.error('Error:', error);
        return 'Failed to fetch IP data';
    }
};
  
export default {
    func,
    description: "Prints the current IP address",
    validArgs: []
};