import getToken from "~/server/components/transport/getToken";

const API508S = async () =>{
    const token = await getToken();
    try {
        const api = await fetch("https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/Taipei/508%E5%8D%80?%24top=1&%24skip=69&%24format=JSON",
            {
               headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Encoding': 'gzip',
                },
            }
        );
        const data = await api.json();
        return data;
    } catch (e) {
        console.log(e);
    }
}
export default defineEventHandler(async (event) =>{
    const data = await API508S();
    return {
        data: data
    }
})