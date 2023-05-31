import { Document } from "mongoose";

export interface Student extends Document {
    readonly _id: number;
    readonly name: string;
}