import mongoose from "mongoose";

export class CreateCourseDto {
    readonly code: string;
    readonly name: string;
    readonly group: string;
    readonly labs: string[];
    readonly professor:  mongoose.Schema.Types.ObjectId;
}
