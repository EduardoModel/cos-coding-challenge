import {ICarOnSaleApi} from "../interface/ICarOnSaleApi";
import {injectable} from "inversify";
import "reflect-metadata";

import { AxiosError, AxiosResponse} from "axios";
import api from './../index';

interface AuthResponse {
    token: string,
    userId: string
}


@injectable()
export class CarOnSaleApi implements ICarOnSaleApi {

    private authenticated : boolean;

    public constructor() {
        this.authenticated = false;
    }

    public async authenticate(): Promise<void> {
        if(!this.authenticated){
            try{
                // Retrieve an access token
                const encodedUserEmail = encodeURIComponent(process.env.API_USER_EMAIL as string);

                const authenticationResponse : AxiosResponse = await api.put(`/v1/authentication/${encodedUserEmail}`, {
                    password: process.env.API_USER_PASSWORD
                });
                const data : AuthResponse = authenticationResponse.data as AuthResponse;
    
                // Verify if the userId or the token aren't defined inside the response
                if(!data.token || !data.userId){
                    throw new Error('Access token is not defined.');
                }

                // Define the token inside the defaults of the request headers
                api.defaults.headers.common['authtoken'] = data.token;
                api.defaults.headers.common['userId'] = data.userId;
    
                this.authenticated = true;
            }
            catch(e: AxiosError | any){
                console.error(e.data);
            }
        }
    }

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public async get(url: string): Promise<Response> {
        const response : Response = await api.get(url);
        // console.log(response);
        return response;
    }

    public async post(request: Request): Promise<Response> {
        return new Promise((resolve) => resolve(1));
    }

    public async put(request: Request): Promise<Response> {
        return new Promise((resolve) => resolve(1));
    }

    public async delete(request: Request): Promise<Response> {
        return new Promise((resolve) => resolve(1));
    }

    public async patch(request: Request): Promise<Response> {
        return new Promise((resolve) => resolve(1));
    }

}