import graphqlDataProvider, { 
    GraphQLClient,
    liveProvider as graphqlLiveProvider

} from "@refinedev/nestjs-query";
//grapphqlDataProvider is default export 


import {createClient} from 'graphql-ws' //websocket




import {fetchWrapper} from "./fetch-wrapper"
import { graphql } from "graphql";


export const API_BASE_URL = 'https://api.crm.refine.dev'
export const API_URL = 'https://api.crm.refine.dev'


export const WS_URL = 'wss:api.crm.refine.dev/graphql'

/*
Creates a GraphQL client

    The GraphQLClient connects to your GraphQL API at API_URL.

Replaces the default fetch function

    Normally, GraphQLClient uses the browser’s fetch to send requests.

    Here, you tell it: “Don’t use the normal fetch — use my custom fetchWrapper instead.”

Adds error handling

    If fetchWrapper throws an error, it gets caught and turned into a rejected Promise so you can handle it later with .catch() or try/catch.
*/ 


export const client = new GraphQLClient(API_URL, {
    fetch : (url : string , options : RequestInit) => {
        try{

        return fetchWrapper(url, options); //use custom wrapper instead of normal wrapper

        }catch(error){
            return Promise.reject(error as Error); //properly handling errors (because js is async and fetch takes time. Promise fullfiled if fethWrapper returns, othervise its rejected )

        }
    }

})



//websocket connection

export const wsClient = typeof window !== "undefined"
 ?createClient({
    url : WS_URL, //websocket client url
    connectionParams: () => { //callback

        const accessToken = localStorage.getItem("access_token"); //get access token
        
        return {
            headers: {
                Authorization : `Bearer ${accessToken}`, //return the Bearer accesstoken
            }
        }
    }
 }) : undefined //return undifined if browser is not there


 export const dataProvider = graphqlDataProvider(client); //takes client and return the dataProvider to refine to use
 export const liveProvider = wsClient ?  graphqlLiveProvider (wsClient) : undefined;