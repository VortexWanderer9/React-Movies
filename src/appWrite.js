import { Client } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const updateSearchCount = async () =>{
   const client = new Client()
   .setEndpoint('https://fra.cloud.appwrite.io/v1')
   .setProject('PROJECT_ID')

   const database = new Databases(client)
    
}