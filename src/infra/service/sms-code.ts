import { ISmsService } from '../../domain/service/sms-service';

export class SmsService implements ISmsService {
  async send(phone: string, data: any): Promise<void> {
    // // implementação do envio de SMS
    // throw new Error('Method not implemented.');
    console.log('send sms');
  }
}
