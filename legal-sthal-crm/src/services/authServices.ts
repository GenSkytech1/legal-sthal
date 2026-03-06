import api from '../lib/axios';

// Login 
export const loginUser = async (userName: string, password: string) => {
    const response = await api.post('/login', {
        user_name: userName,
        password
    });
    
    if (response.data && response.data.token) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', response.data.token);
        }
    }
    
    return response;
};