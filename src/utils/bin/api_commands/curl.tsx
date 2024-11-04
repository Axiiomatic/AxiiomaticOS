import axios from 'axios';

const func = async (args: string[]) => {
    if (args.length === 0) return 'Please provide a URL to fetch data from';
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
        return 'Failed to fetch data';
    }
};
  
export default {
    func,
    description: "Fetches data from a given URL"
};