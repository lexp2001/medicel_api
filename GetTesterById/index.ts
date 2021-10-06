import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { testerService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await testerService.GetTesterById(context); // 👈 This calls the participant service
};

export default httpTrigger;