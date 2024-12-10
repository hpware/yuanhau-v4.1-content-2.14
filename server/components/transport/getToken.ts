// Import
import NodeCache from "node-cache";

// Rate Limit & Token Cache
const tokenCache = new NodeCache({ stdTTL: 86280 });
const maxRequestHr =  150 ;
const reqtrackingkey = 'token';

// Get Token from TDX
const getTokenURL = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
const clientId = process.env.TDX_CLIENT_ID;
const clientSecret = process.env.TDX_CLIENT_SECRET;
const grantType = "client_credentials";

async function getToken() {
    // If cached token
    const reqtrackingkey2 = tokenCache.get(reqtrackingkey);
    //console.log('og:' + reqtrackingkey);
    //console.log('2: ' + reqtrackingkey2);
    console.log('og:' + reqtrackingkey);
    console.log('2: ' + reqtrackingkey2);

    if (reqtrackingkey2) {
        console.log('Using cached token\n' + reqtrackingkey2);
        return reqtrackingkey2;
    }
    // Pull Token
    const response = await fetch(getTokenURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`,
    });
<<<<<<< HEAD
    const data = await response.json(); 
=======
    //const data = await response.json(); 
>>>>>>> 0c62103618c64b0e9dc0bf2ee7c0db19578bdf05
    //console.log('Using newly created token\n' + data.access_token);
    tokenCache.set(reqtrackingkey, data.access_token);
    return data.access_token;
    // The code above must be uncommented in prod
<<<<<<< HEAD
    //return null;
=======
    return 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJER2lKNFE5bFg4WldFajlNNEE2amFVNm9JOGJVQ3RYWGV6OFdZVzh3ZkhrIn0.eyJleHAiOjE3MzM3NTU2NjgsImlhdCI6MTczMzY2OTI2OCwianRpIjoiYWYwMmExZjItZDk2YS00OTE4LWFkODktNjEyMGIyNjQ5ZjEyIiwiaXNzIjoiaHR0cHM6Ly90ZHgudHJhbnNwb3J0ZGF0YS50dy9hdXRoL3JlYWxtcy9URFhDb25uZWN0Iiwic3ViIjoiZDc5ZDk5OTYtMDE3Mi00NTAzLWFlZjAtZTAzNzYyMTdiMzRlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiczUxMzMxMTAyLThkYzM0NDllLTE5ODMtNDY0MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsic3RhdGlzdGljIiwicHJlbWl1bSIsInBhcmtpbmdGZWUiLCJtYWFzIiwiYWR2YW5jZWQiLCJnZW9pbmZvIiwidmFsaWRhdG9yIiwidG91cmlzbSIsImhpc3RvcmljYWwiLCJjd2EiLCJiYXNpYyJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwidXNlciI6IjhiYWUyMTM2In0.GLBKj_JRTGdXJTrcpWrGnxpYL7v7J18eK1Wc30bYfD99kV6f0hmJoVSfqgd9qPQaLxSdQiq6RCCSNr627G9uSrgITzRuyk4yxrkV_kFtcMouitjPzvnukdIxNIhVCu-kPU3W9Oa6REaqbWmu0zSGxW92rWJeldyICG-c25D2PkTiIl0uNCvaf_xayyrl5g4_ujIBZQSw2VbKBEp4_IzwFDO79s8p8PS7NKBcMQhN_S-WjUOUcuJIyd_87nz59sogsyLOi8SXm6azi7s30PG5Q4wLdIeeZ3sjrOSTHk8efg6O_qyeyGEXsWJuffhBTdCk99svwj0NimObFTpFINXTew';
>>>>>>> 0c62103618c64b0e9dc0bf2ee7c0db19578bdf05
    
}
export default getToken;