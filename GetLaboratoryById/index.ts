import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { laboratoryService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await laboratoryService.GetLaboratoryById(context); // 👈 This calls the participant service
};

export default httpTrigger;