export interface PagoPAApi {
  getProfile(profile: any): Promise<any>
  postRequest(body: any): Promise<any> 
}