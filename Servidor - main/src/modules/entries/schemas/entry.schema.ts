import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from 'src/modules/students/schemas/student.schema';
import { Course } from './course.schema';

export type EntryDocument = HydratedDocument<Entry>;

@Schema()
export class Entry {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  course: Course;

  @Prop({ required: true, type: mongoose.Schema.Types.Number, ref: 'Student' })
  student: Student;

  @Prop({ required: true })
  lab: string;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);
