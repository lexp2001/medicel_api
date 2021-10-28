import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { laborReportsService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context,): Promise<void> {
  await laborReportsService.CreateLaborReport(context); // 👈 This calls the participant service
};

export default httpTrigger;