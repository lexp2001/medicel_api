import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { promotionService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await promotionService.CreatePromotion(context); // 👈 This calls the participant service
};

export default httpTrigger;