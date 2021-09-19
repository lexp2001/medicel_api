import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { tipsService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await tipsService.GetTips(context); // 👈 This calls the participant service
};

export default httpTrigger;