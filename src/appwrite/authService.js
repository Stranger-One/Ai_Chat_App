import { Account, Client, ID } from "appwrite";
import { conf } from "../conf/conf";

export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client
        .setEndpoint(conf.endPoint)
        .setProject(conf.projectId)
        this.account = new Account(this.client)
    }

    async createAccount({email, name, password}){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name,
            )
            // login and redirect to "/"
            if(userAccount){
                console.log("account created");
                return this.login({email, password})
            }
        } catch (error) {
            console.log("Appwrite :: create account :: error", error)
        }
    }

    async login({email, password}){
        try {
            const response = await this.account.createEmailPasswordSession(email, password)
            response && console.log("Login successfully");
            return response
        } catch (error) {
            console.log("Appwrite :: login :: error", error)
        }
    }

    async getCurUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite :: getCurUser :: error", error)
            return null
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite :: logout :: error", error)
        }
    }

}

const authService = new AuthService()

export default authService