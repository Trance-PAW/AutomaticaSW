import mongoose, { Document } from "mongoose";
import { Course } from "./course.interface";

export interface Entry extends Document {
    readonly date: Date;
    course:  Course;
    readonly student:  mongoose.Schema.Types.Number;
    readonly lab:  string;
}