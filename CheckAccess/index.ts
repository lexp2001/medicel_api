import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const rut = (req.query.rut || (req.body && req.body.rut));
    const user1 = {
        "data": {
            "rut": "76.498.451-K",
            "run": "27.141.089-1",
            "name": "ELIZABETH INES",
            "surname": "LABARCA DE ROA"
        },
        "response": {
            "run": "********.089-1",
            "surname": "LA******* DE******",
            "name": "ELIZA*****"
        },
        "status": "HABILITADO"

    }
    const user2 = {
        "data": {
            "rut": "76.331.281-K",
            "run": "26.905.333-K",
            "name": "JUAN MANUEL",
            "surname": "ROA ZAMBRANO"
        },
        "response": {
            "run": "********.333-K",
            "surname": "RO*** ZA******",
            "name": "JU**"
        },
        "status": "HABILITADO"

    }
    var user= null

    if (rut == "76.498.451-K") {
        user = user1
    }
    if (rut == "76.331.281-K") {
        user = user2
    }
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: user?user:{"error": "Usuario no registrado !"}
    };

};

export default httpTrigger;