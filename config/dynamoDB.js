import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const REGION = process.env.AWS_REGION || "eu-central-1"; // Set your AWS region
// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const client = new DynamoDBClient({
     region: REGION,
        // credentials: {
        //     accessKeyId: AWS_ACCESS_KEY_ID,
        //     secretAccessKey: AWS_SECRET_ACCESS_KEY,
        // },
    })
const docClient = DynamoDBDocumentClient.from(client)
const TABLE_NAME = process.env.TABLE_NAME || "progressreports"; // Set your DynamoDB table name

//get all items
export const getAllItems = async () => {
    try {
        const params = {
            TableName: TABLE_NAME,
        };
        const data = await docClient.send(new ScanCommand(params));
        return data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw new Error("Could not fetch items");
    }
};

//update item
export const updateItem = async (id, createdAt, report, message) => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id: id,
                createdAt: createdAt,
            },
            UpdateExpression: "set report = :report, message = :message",
            ExpressionAttributeValues: {
                ":report": report,
                ":message": message,
            },
        };

        await docClient.send(new UpdateCommand(params));
        console.log("Item updated successfully");
    } catch (error) {
        console.error("Error updating item:", error);
        throw new Error("Could not update item");
    }
};