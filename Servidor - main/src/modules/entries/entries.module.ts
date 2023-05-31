import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EntrySchema } from './schemas/entry.schema';
import { StudentSchema } from '../students/schemas/student.schema';
import { CourseSchema } from '../courses/schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Entry', schema: EntrySchema }
    ]),
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema }
    ])
  ],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}
