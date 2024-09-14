import config from "../config/config.js";
import {Client, ID, Databases, Storage, Query} from "appwrite"

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client 
        .setEndpoint(config.appwriteEndpoint)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost ({title, slug, content, featuredImage, status, userId}){
        try {
          await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            { //Attributes
                title,
                content,
                featuredImage,
                status,
                userId
            }
          )   
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error")
        }
    }

    async updatePost(slug, {title ,content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.error("Apprwrite :: appwrite.congig.js :: updatePost :: error")
        }

    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.error("Appwrite :: appwrite.config.js :: deletePost :: error");
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            
        } catch (error) {
            console.error("Appwrite :: appwrite.config.js :: getPost :: error")
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
            
        } catch (error) {
            console.error("Appwrite :: appwrite.config.js :: getPosts :: error")
            return false;
        }
    }

    //upload files 
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.error("Appwrite :: appwrite.config.js :: uploadFile :: error");
            return false;
        }
    }

    async deleteFile (fileId){
        try {
           await this.storage.deleteFile(
            config.appwriteBucketId,
            fileId
           )
           return true;
            
        } catch (error) {
            console.error("Appwrite :: appwrite.config.js :: deleteFile :: error");
            return false;
        }
    }

    filePreview(fileId){
        try {
            return this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId,
            )
            
        } catch (error) {
            console.error("Appwrite :: appwrite.config.js :: filePreview :: error")
        }

    }
}


const service = new Service;
export default service

