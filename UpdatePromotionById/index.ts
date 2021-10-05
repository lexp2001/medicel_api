import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { promotionService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await promotionService.UpdatePromotionById(req.params.id,context); // 👈 This calls the participant service
};

export default httpTrigger;