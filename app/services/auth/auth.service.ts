import Cookies from 'js-cookie';

import { saveToStorage, removeTokensStorage } from './auth.helper';

import { IAuthResponse } from './../../store/user/user.interface';

import { axiosClassic } from 'api/interceptors';
import { getContentType } from 'api/api.helpers';

import { getAuthUrl } from '@/config/api.config';

export const AuthService = {
    async register(email: string, password: string) {
        const response = await axiosClassic.post<IAuthResponse>(getAuthUrl('/register'),
        {email, password})

        if (response.data.accessToken) /* save to cookie */
            saveToStorage(response.data)

        return response
    },

    async login(email: string, password: string) {
        const response = await axiosClassic.post<IAuthResponse>(getAuthUrl('/login'),
        {email, password})

        if (response.data.accessToken) /* save to cookie */
            saveToStorage(response.data)

        return response
    },

    logout() {
        removeTokensStorage()
        localStorage.removeItem('user')
    },

    async getNewTokens() {
        const refreshToken = Cookies.get('refreshToken')
        const response = await axiosClassic.post<IAuthResponse>(
            getAuthUrl('/login/access-token'), 
            {refreshToken},
            {headers: getContentType()}
        )
       
        if (response.data.accessToken) saveToStorage(response.data)

        return response
    }
}