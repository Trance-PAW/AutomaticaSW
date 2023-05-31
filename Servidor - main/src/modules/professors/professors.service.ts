import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './interfaces/professor.interface';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectModel('Professor')
    private readonly professorModel: Model<Professor>,
  ) {}

  async create(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    const professor = new this.professorModel(createProfessorDto);
    return await professor.save();
  }

  async createMany(professors: any): Promise<any> {
    // Limpiamos objetos que no esten completos
    let professorsArr = professors.professors as Array<any>;
    for (let i = 0; i < professorsArr.length; i++) {
      const element = professorsArr[i];
      if (!element._id || !element.name) {
        professorsArr.splice(i, 1);
      }
    }
    // Filtramos duplicados
    professorsArr = professorsArr.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t._id === value._id && t.name === value.name
      ))
    );
    return await this.professorModel.insertMany(professorsArr);
  }

  async findAll(): Promise<Professor[]> {
    const professors = await this.professorModel.find();
    return professors;
  }

  async findOne(id: string): Promise<Professor> {
    const professor = await this.professorModel.findById(id);
    return professor;
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    const professor = await this.professorModel.findByIdAndUpdate(id, updateProfessorDto, { new: true });
    return professor;
  }

  async remove(id: string): Promise<Professor> {
    const professor = await this.professorModel.findByIdAndDelete(id);
    return professor;
  }

  async removeAll(): Promise<any> {
    return await this.professorModel.remove({});
  }
}
