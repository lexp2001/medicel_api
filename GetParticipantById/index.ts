import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { participantService } from '../services';


const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await participantService.GetParticipantById(context); // 👈 This calls the participant service
};

export default httpTrigger;