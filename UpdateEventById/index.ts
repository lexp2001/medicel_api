import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { eventService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await eventService.UpdateEventById(req.params.id,context); // 👈 This calls the participant service
};

export default httpTrigger;