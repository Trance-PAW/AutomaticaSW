import mongoose, { Document } from "mongoose";

export interface Course extends Document {
    readonly code: string;
    readonly name: string;
    readonly group: string;
    readonly professor:  mongoose.Schema.Types.ObjectId;
}