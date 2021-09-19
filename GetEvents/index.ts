import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { eventService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await eventService.getEvents(context); // 👈 This calls the participant service
};

export default httpTrigger;