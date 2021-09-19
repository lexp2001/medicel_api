import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { sanitaryQuestionsService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await sanitaryQuestionsService.CreateSanitaryQuestion(context); // 👈 This calls the participant service
};

export default httpTrigger;