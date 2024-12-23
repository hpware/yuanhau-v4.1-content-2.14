//import { useCookie } from 'h3';

/*
 * GitHub user fetch function (temporarily disabled)
 * Uses GitHub API to fetch user details with token auth
 * 
async function fetchGH() {
    const res = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `token ${useCookie('token')}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    
    if (!res.ok) {
        throw new Error(`GitHub API error: ${res.statusText}`)
    }
    user.value = await res.json();
}
*/
export default defineEventHandler((event) => {
  return {
    status: 403,
  };
});
