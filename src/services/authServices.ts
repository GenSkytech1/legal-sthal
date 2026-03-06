import api from '../lib/axios'; 

// Login 
export const loginUser = (userName: string, password: string) => {
    return api.post('/login', {
        user_name: userName,
        password
    });
};