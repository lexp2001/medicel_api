import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { laborTestsService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await laborTestsService.UpdateLaborTestById(context); // 👈 This calls the participant service
};

export default httpTrigger;