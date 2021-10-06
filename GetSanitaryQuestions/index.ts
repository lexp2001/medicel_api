import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { sanitaryQuestionsService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await sanitaryQuestionsService.GetSanitaryQuestions(context); // 👈 This calls the participant service
};

export default httpTrigger;