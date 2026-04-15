"use server"

import { Query } from "appwrite";
import { createAdminClient } from "../appwrite/appwrite"
import { appwriteConfig } from "../appwrite/config";
import { ID } from "appwrite";
import { parseStringify } from "@/utils/utils";
import { cookies } from "next/headers";

type userdetails={
    fullName:string,
    email:string,
}

const getUserByEmail = async(email:string)=>{
    const {tablesDB}= await createAdminClient();

    const result = await tablesDB.listRows(
        appwriteConfig.databaseId,
        appwriteConfig.userTableId,
        [Query.equal("email", email)]
    );

    return result.rows.length>0?result.rows[0]:null;
}
const handleError= (error:unknown,message:string)=>{
    console.log(error,message);
    throw new Error(message);
}

export const sendEmailOTP = async(email:string)=>{
    const {account}= await createAdminClient();
    try{
        const session =await account.createEmailToken(ID.unique(),email);
        return session.userId;
    }catch(error){
        handleError(error,"Failed to send OTP");
    }
}

export const createAccount = async({userDetails}: {userDetails: userdetails})=>{
    const existingUser=await  getUserByEmail(userDetails.email);
    const accountId= await sendEmailOTP(userDetails.email)

    if(!accountId) throw new Error("Failed to send an OTP");
    if(!existingUser){
        const {tablesDB} = await createAdminClient();
        const user= await tablesDB.createRow(
            appwriteConfig.databaseId,
            appwriteConfig.userTableId,
            ID.unique(),
            {
                fullName:userDetails.fullName,
                email:userDetails.email,
                avatar:"https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                accountId,
            },
        );
    } 
    return parseStringify({accountId})
}

export const verifySecret= async({accountId,password}:{accountId:string,password:string})=>{
    try{
    const {account}= await createAdminClient();
    const session = await account.createSession(accountId,password);
    (await cookies()).set("appwrite-session-zyphus-store",session.secret,{httpOnly:true,secure:true,sameSite:"strict",path:"/"});

    return parseStringify({sessionId:session.$id});
}catch(error){
        handleError(error,"Failed to verify secret");
    }
}
    
