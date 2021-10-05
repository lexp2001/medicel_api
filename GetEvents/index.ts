import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { eventService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await eventService.GetEvents(context); // 👈 This calls the participant service
};

export default httpTrigger;