import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { usersService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await usersService.UpdateUserById(req.params._id,context); // 👈 This calls the participant service
};

export default httpTrigger;