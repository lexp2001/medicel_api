import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { administratorService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await administratorService.GetAdministratorById(context); // 👈 This calls the participant service
};

export default httpTrigger;