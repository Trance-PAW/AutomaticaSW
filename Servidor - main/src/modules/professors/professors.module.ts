import { Module } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { ProfessorSchema } from './schemas/professor.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Professor', schema: ProfessorSchema }
    ])
  ],
  controllers: [ProfessorsController],
  providers: [ProfessorsService],
})
export class ProfessorsModule {}
