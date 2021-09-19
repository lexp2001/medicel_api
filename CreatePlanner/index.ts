import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { plannerService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await plannerService.createPlanner(context); // 👈 This calls the participant service
};

export default httpTrigger;