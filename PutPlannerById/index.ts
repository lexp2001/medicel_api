import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { plannerService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await plannerService.PutPlannerById(req.params._id,context); // 👈 This calls the participant service
};

export default httpTrigger;