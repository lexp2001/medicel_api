import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { tipsService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await tipsService.UpdateTipsById(req.params._id,context); // 👈 This calls the participant service
};

export default httpTrigger;