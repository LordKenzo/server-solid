import axios from 'axios';
import { PagoPAApi } from '../Data/PagoPAApi';
// import { API_BASE_URL, API_PROFILE_URL } from "../Server/config";

export class AxiosAdapter implements PagoPAApi { 

    private header = {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '1d36deca4a984067822118aeec8e2f23' // process.env.APISECRET
    }
    
    async getProfile(profile: any): Promise<any> {
        if(profile.fiscal_code.length === 16) {
           return axios.post<any>(`https://api.io.italia.it/api/v1/profiles`,{
               fiscal_code: profile.fiscal_code
           }, {headers: this.header})
           .then(res => res.data)
           .catch(err => err)
        } else {
            return undefined;
        }
    }

    async postRequest(body: any): Promise<any> {
        try {
        return axios.post<any>(`https://api.io.italia.it/api/v1/messages`,{
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