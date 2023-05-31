import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop({ required: true, unique: true })
  _id: number;

  @Prop({ required: true })
  name: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
