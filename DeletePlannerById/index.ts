import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { plannerService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,  ): Promise<void> {
  await plannerService.DeletePlannerById(context); // 👈 This calls the participant service
};

export default httpTrigger;