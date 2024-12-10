import getToken from "~/server/components/transport/getToken";

const API816 = async () =>{
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
    const data = await API816();
    return {
        data: data
    }
})