import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { usersService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await usersService.DeleteUserById(context); // 👈 This calls the participant service
};

export default httpTrigger;