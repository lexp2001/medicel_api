import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { administratorService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await administratorService.getAdministrators(context); // 👈 This calls the participant service
};

export default httpTrigger;