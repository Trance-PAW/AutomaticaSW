import mongoose from "mongoose";
import { Course } from "../interfaces/course.interface";

export class CreateEntryDto {
    readonly date: Date;
    readonly course:  Course;
    readonly student:  mongoose.Schema.Types.Number;
    readonly lab:  string;
}
