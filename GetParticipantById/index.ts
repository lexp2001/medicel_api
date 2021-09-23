import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { participantService } from '../services';


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await participantService.getParticipantById(req.params.id,context); // 👈 This calls the participant service
};

export default httpTrigger;