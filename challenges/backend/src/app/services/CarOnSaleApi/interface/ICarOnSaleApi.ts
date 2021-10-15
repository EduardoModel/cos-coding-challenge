/**
 * This service describes an interface to access the CarOnSale API.
 */
 export interface ICarOnSaleApi {

    authenticate(): void

    isAuthenticated(): Boolean

    get(url: string): Promise<any>

    post(request: any): Promise<any>

    put(request: any): Promise<any>

    delete(request: any): Promise<any>

    patch(request: any): Promise<any>

}
