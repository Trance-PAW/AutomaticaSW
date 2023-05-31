import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Professor } from 'src/modules/professors/schemas/professor.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ _id: false })
export class Course {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  group: string;

  @Prop({ required: false, type: mongoose.Schema.Types.Number, ref: 'Professor' })
  professor: Professor;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
