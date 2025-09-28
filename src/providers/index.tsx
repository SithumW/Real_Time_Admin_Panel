import { GraphQLClient } from "@refinedev/nestjs-query";

export const API_URL = 'https://api.crm.refine.dev'

/*
Creates a GraphQL client

    The GraphQLClient connects to your GraphQL API at API_URL.

Replaces the default fetch function

    Normally, GraphQLClient uses the browser’s fetch to send requests.

    Here, you tell it: “Don’t use the normal fetch — use my custom fetchWrapper instead.”

Adds error handling

    If fetchWrapper throws an error, it gets caught and turned into a rejected Promise so you can handle it later with .catch() or try/catch.
*/ 


export const client = new GraphQLClient(API_URL{
    fetch : (url : string , options : RequestInit) => {
        try{

        return fetchWrapper(url, options); //use custom wrapper instead of normal wrapper

        }catch(error){
            return Promise.reject(error as Error); //properly handling errors (because js is async and fetch takes time. Promise fullfiled if fethWrapper returns, othervise its rejected )

        }
    }

})