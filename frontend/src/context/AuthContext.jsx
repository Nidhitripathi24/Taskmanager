import { createContext, useState, useEffect } from 'react';
import { authAPI, profileAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                try {
                    const response = await profileAPI.getProfile();
                    setUser(response.data);
                    setToken(savedToken);
                } catch (err) {
                    // Token invalid, clear it
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const register = async (data) => {
        try {
            const response = await authAPI.register(data);
            const { token: newToken, ...userData } = response.data;

            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(userData);

            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.message || 'Registration failed',
            };
        }
    };

    const login = async (data) => {
        try {
            const response = await authAPI.login(data);
            const { token: newToken, ...userData } = response.data;

            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(userData);

            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.message || 'Login failed',
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
