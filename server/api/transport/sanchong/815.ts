import getToken from "~/server/components/transport/getToken";

const API815 = async () =>{
    const token = await getToken();
    try {
        const api = await fetch("",
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
    const data = await API815();
    return {
        data: data
    }
})