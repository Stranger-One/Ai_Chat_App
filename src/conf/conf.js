const conf = {
    geminiApiKey: String(import.meta.env.VITE_GEMINI_API_KEY),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    endPoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export {conf}