import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { laborService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await laborService.DeleteLaborById(context); // 👈 This calls the participant service
};

export default httpTrigger;