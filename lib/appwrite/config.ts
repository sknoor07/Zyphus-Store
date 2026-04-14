export const appwriteConfig={
    endPointUrl:process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId:process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId:process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    userTableId:process.env.NEXT_PUBLIC_APPWRITE_USER_TABLE!,
    userFilesTableId:process.env.NEXT_PUBLIC_APPWRITE_USER_FILES!,
    FilesBucket:process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
    secretKey:process.env.NEXT_APPWRITE_SECRET_KEY!,
    
}