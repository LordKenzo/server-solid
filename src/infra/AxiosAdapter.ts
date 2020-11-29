import axios from 'axios';
import { PagoPAApi } from '../Data/PagoPAApi';
import { API_BASE_URL, API_MESSAGE_URL, API_PROFILE_URL } from "@/domain/common/serverConfig";

export class AxiosAdapter implements PagoPAApi { 

    private header = {}

    constructor() {
        if(process.env.NODE_ENV !== "production") {
            require('dotenv').config();
        }
        this.header = {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': process.env.API_SECRET
        }
    }
    
    async getProfile(profile: any): Promise<any> {
        if(profile.fiscal_code.length === 16) {
           return axios.post<any>(`${API_BASE_URL}/${API_PROFILE_URL}`,{
               fiscal_code: profile.fiscal_code
           }, {headers: this.header})
           .then(res => res.data)
           .catch(err => err.response.data)
        } else {
            return undefined;
        }
    }

    async postRequest(body: any): Promise<any> {
        try {
        return axios.post<any>(`${API_BASE_URL}/${API_MESSAGE_URL}`,{
            content: body.content,
            fiscal_code: body.fiscal_code
        }, {headers: this.header}).then(res => {
            return res.data;
        }).catch((err:any) => {
            console.error('Errore richiesta');
            return err;
        })
        } catch(err) {
            return err;
        }
      }

   
}