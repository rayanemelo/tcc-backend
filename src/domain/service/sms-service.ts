export interface ISmsService {
  send(phone: string, data: any): Promise<void>;
}
