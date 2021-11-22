import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { faenaService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await faenaService.GetFaenas(context); // 👈 This calls the participant service
};

export default httpTrigger;