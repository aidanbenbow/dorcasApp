import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

class DynamoDBService {
    constructor() {
        this.client = new DynamoDBClient({
            region: process.env.AWS_REGION || "eu-central-1", // Set your AWS region
            // credentials: {
            //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            // },
        });
        this.docClient = DynamoDBDocumentClient.from(this.client);
        this.TABLE_NAME = process.env.TABLE_NAME || "progressreports"; // Set your DynamoDB table name
    }

    async getAllItems() {
        try {
            const params = {
                TableName: this.TABLE_NAME,
                FilterExpression: "attribute_not_exists(used) OR used = :false", 
                ExpressionAttributeValues: {
                    ":false": false,
                },
            };
            const data = await this.docClient.send(new ScanCommand(params));
            return data;
        } catch (error) {
            console.error("Error fetching items:", error);
            throw new Error("Could not fetch items")
        }
    }

  

    async updateItem(id, createdAt, report, message) {
        try {
            const params = {
                TableName: this.TABLE_NAME,
                Key: {
                    id: id,
                    createdAt: createdAt,
                },
                UpdateExpression: "set report = :report, message = :message, used = :used",
                ExpressionAttributeValues: {
                    ":report": report,
                    ":message": message,
                    ":used": true,
                },
            };

            await this.docClient.send(new UpdateCommand(params));
            console.log("Item updated successfully");
        } catch (error) {
            console.error("Error updating item:", error);
            throw new Error("Could not update item");
        }
    }
}

export default new DynamoDBService();

// const REGION = process.env.AWS_REGION || "eu-central-1"; // Set your AWS region
// // const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// // const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// const client = new DynamoDBClient({
//      region: REGION,
//         // credentials: {
//         //     accessKeyId: AWS_ACCESS_KEY_ID,
//         //     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//         // },
//     })
// const docClient = DynamoDBDocumentClient.from(client)
// const TABLE_NAME = process.env.TABLE_NAME || "progressreports"; // Set your DynamoDB table name

// //get all items
// export const getAllItems = async () => {
//     try {
//         const params = {
//             TableName: TABLE_NAME,
//             FilterExpression: "attribute_not_exists(used) OR used = :false",
//             ExpressionAttributeValues: {
//                 ":false": false,
//             },
//         };
//         const data = await docClient.send(new ScanCommand(params));
//         return data;
//     } catch (error) {
//         console.error("Error fetching items:", error);
//         throw new Error("Could not fetch items");
//     }
// };

// //update item
// export const updateItem = async (id, createdAt, report, message) => {
//     try {
//         const params = {
//             TableName: TABLE_NAME,
//             Key: {
//                 id: id,
//                 createdAt: createdAt,
//             },
//             UpdateExpression: "set report = :report, message = :message, used = :used",
//             ExpressionAttributeValues: {
//                 ":report": report,
//                 ":message": message,
//                 ":used": true,
//             },
//         };

//         await docClient.send(new UpdateCommand(params));
//         console.log("Item updated successfully");
//     } catch (error) {
//         console.error("Error updating item:", error);
//         throw new Error("Could not update item");
//     }
// };