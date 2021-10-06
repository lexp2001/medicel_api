import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { generaladminService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await generaladminService.CreateGeneralAdmin(context); // 👈 This calls the participant service
};

export default httpTrigger;