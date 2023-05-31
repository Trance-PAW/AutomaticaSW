import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './interfaces/student.interface';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student')
    private readonly studentModel: Model<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = new this.studentModel(createStudentDto);
    return await student.save();
  }

  async createMany(students: any): Promise<any> {
    // Limpiamos objetos que no esten completos
    let studentsArr = students.students as Array<any>;
    for (let i = 0; i < studentsArr.length; i++) {
      const element = studentsArr[i];
      if (!element._id || !element.name) {
        studentsArr.splice(i, 1);
      }
    }
    // Filtramos duplicados
    studentsArr = studentsArr.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t._id === value._id && t.name === value.name
      ))
    );
    return await this.studentModel.insertMany(studentsArr);
  }

  async findAll(): Promise<Student[]> {
    const students = await this.studentModel.find();
    return students;
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id);
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true });
    return student;
  }

  async remove(id: string): Promise<Student> {
    const student = await this.studentModel.findByIdAndDelete(id);
    return student;
  }

  async removeAll(): Promise<any> {
    return await this.studentModel.remove({});
  }
}
