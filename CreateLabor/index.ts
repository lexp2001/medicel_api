import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { laborService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await laborService.CreateLabor(context); // 👈 This calls the participant service
};

export default httpTrigger;