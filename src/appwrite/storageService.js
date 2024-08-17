import { Client, Databases, ID, Storage } from "appwrite";
import { conf } from "../conf/conf";

export class StorageService {
    client = new Client()
    database;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.endPoint)
            .setProject(conf.projectId)
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    // async uploadFile(file){
    //     console.log("upload", file)
    //     try {
    //         const result = await this.bucket.createFile(
    //             conf.bucketId,
    //             ID.unique(),
    //             file
    //         )
    //         console.log("file uploaded successfully", result)
    //         return result;
    //     } catch (error) {
    //         console.log("Appwrite :: uploadFile :: error", error);
    //         return false
    //     }
    // }
    async createDocument(email, chats) {
        try {
            const result = await this.database.createDocument(
                conf.databaseId,
                conf.collectionId,
                ID.unique(),
                {
                    email,
                    chats
                }
            )
            if (result) {
                console.log("create Document"); 
                return result
            }
        } catch (error) {
            console.log("Appwrite :: createDocument :: error", error);

        }
    }

    async updateDocument(email, chats, documentId) {
        try {
            const result = await this.database.updateDocument(
                conf.databaseId,
                conf.collectionId,
                documentId,
                {
                    email,
                    chats
                }
            )
            if (result) {
                console.log("Document updated");
            }
            return result
        } catch (error) {
            console.log("Appwrite :: updateDocument :: error", error);

        }
    }

    async getDocument(documentId){
        try {
            return await this.database.getDocument(
                conf.databaseId,
                conf.collectionId,
                documentId
            )
        } catch (error) {
            console.log("Appwrite :: getDocument :: error", error);
            
        }
    }

    async listDocument(){
        try {
            return await this.database.listDocuments(
                conf.databaseId,
                conf.collectionId
            )
        } catch (error) {
            console.log("Appwrite :: listDocuments :: error", error);
            
        }
    }
}

const storageService = new StorageService()
export default storageService