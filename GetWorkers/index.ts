import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { workersService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await workersService.GetWorkers(context); // 👈 This calls the participant service
};

export default httpTrigger;