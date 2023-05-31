import { Document } from "mongoose";

export interface Professor extends Document {
    readonly _id: number;
    readonly name: string;
}