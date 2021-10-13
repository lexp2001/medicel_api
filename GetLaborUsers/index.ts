import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { laborUsersService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await laborUsersService.GetLaborsUsers(context); // 👈 This calls the participant service
};

export default httpTrigger;