"use server"
import { Client, Account, Databases, Storage, Avatars, TablesDB } from "appwrite";
import { appwriteConfig } from "./config";
import { cookies } from "next/headers";

export const createSessionClient= async()=>{
    const client = new Client()
    .setEndpoint(appwriteConfig.endPointUrl)
    .setProject(appwriteConfig.projectId);

    const session= ((await cookies()).get("appwrite-session-zyphus-store"));
    if(!session || !session.value) throw new Error("No Session Found")
        client.setSession(session.value);

    const account = new Account(client);
    const databases = new Databases(client);

    return {account,databases}
}

// export const createAdminClient= async()=>{
//     const client = new Client()
//     .setEndpoint(appwriteConfig.endPointUrl)
//     .setProject(appwriteConfig.projectId)
//     .setDevKey(appwriteConfig.secretKey);

//     const account = new Account(client);
//     const databases = new Databases(client);
//     const getStorage= new Storage(client);
//     const getAvatars= new Avatars(client);
//     const tablesDB = new TablesDB(client); 

//     return {account,databases,getStorage,getAvatars,tablesDB}
// }

export async function createAdminClient(){
    const client = new Client()
    .setEndpoint(appwriteConfig.endPointUrl)
    .setProject(appwriteConfig.projectId)
    .setDevKey(appwriteConfig.secretKey);

    const account = new Account(client);
    const databases = new Databases(client);
    const getStorage= new Storage(client);
    const getAvatars= new Avatars(client);
    const tablesDB = new TablesDB(client); 

    return {account,databases,getStorage,getAvatars,tablesDB}
}