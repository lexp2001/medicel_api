import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { participantService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await participantService.DeleteParticipantByRut(req.params.rut,context); // 👈 This calls the participant service
};

export default httpTrigger;