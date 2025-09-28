import {GraphQLFormattedError} from "graphql";

type Error = { //error type we created
    message : string,
    statusCode : string
}


const customFetch = async (url: string, options: RequestInit) =>{ //get the url and options to pass when calling this function

    const accessToken = localStorage.getItem('access_token'); //get the access tocan from the local storage
    const headers = options.headers as Record <string, string>; //get headers from the options object (we are creating a type here(keys are string and values are string))
   
    // now we have the headers (http) and access tokens, we can return the fetch requst with the added authorization headers 

    return await fetch (url, { //original fetch function and we pass the url
      ...options, //options we pass for any request
        headers : { //headers
            ...headers, // all the headers we pass

            /*
            In the context of web APIs and HTTP, “Bearer” is a type of authentication token. 


            If headers exists and has an Authorization property, use that value.

            If headers is undefined or doesn’t have Authorization, this part returns undefined.



            The || operator is a fallback.

            If headers?.Authorization is falsy (undefined, null, empty string, etc.), it will use the value on the right side.

          
            `Bearer ${accessToken}` -> we use backticks `

            This is a template string in JavaScript.

            ${accessToken} is replaced by the value of the variable accessToken.

            Bearer ${accessToken} is the standard format for a Bearer token.
             */
            Authorization : headers?.Authorization || `Bearer ${accessToken}`, 
            "Content-Type" : "Application/json",
            "Apollo-Require-Preflight" : "true", 
        }
    }
      

    )
}
    //error handling
    
    const getGraphQLErrors = (body: Record <"errors", GraphQLFormattedError[] | undefined>):
    Error | null => { //function returns an error or null
        if (!body) { //if no body 
            return{
                message : 'Unknown error',
                statusCode : 'INTERNAL_SERVER_ERROR'
            }
        }
        if ("errors" in body){ //if there are errors in body
            const errors = body?.errors;
            const messages = errors?.map((error) => error?.message) ?.join(""); //join errors into single error
            const code = errors?.[0]?.extensions?.code; //get the status codes

            return {
                message : messages || JSON.stringify(errors), //return message or string of all the erorrs 
                statusCode : code || 500 //status code or 500
            }
        } return null; //if we dont have any errors, this returns null
    }

//this custom fetch helps to code reusablility 





