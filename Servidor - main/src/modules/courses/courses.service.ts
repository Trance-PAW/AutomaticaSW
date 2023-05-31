import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './interfaces/course.interface';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course')
    private readonly courseModel: Model<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = new this.courseModel(createCourseDto);
    return await course.save();
  }

  async createMany(courses: any): Promise<any> {
    // Limpiamos objetos que no esten completos
    let coursesArr = courses.courses as Array<any>;
    for (let i = 0; i < coursesArr.length; i++) {
      const element = coursesArr[i];
      if (
        !element.code ||
        !element.name ||
        !element.group
      ) {
        coursesArr.splice(i, 1);
      }
    }
    // Filtramos duplicados
    coursesArr = coursesArr.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.code === value.code &&
        t.name === value.name &&
        t.group === value.group &&
        t.labs === value.labs &&
        t.professor === value.professor
      ))
    );
    return await this.courseModel.insertMany(coursesArr);
  }

  async findAll(): Promise<Course[]> {
    const courses = await this.courseModel.aggregate([
      {
        $match: {
          name: { $exists: true },
        },
      },
      {
        $lookup: {
          from: 'professors',
          localField: 'professor',
          foreignField: '_id',
          as: 'professor',
        },
      },
      {
        $unwind: {
          path: '$professor',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          code: 1,
          name: 1,
          group: 1,
          professor: 1,
        },
      },
    ]);
    return courses;
  }

  async findAllByLab(lab: string): Promise<Course[]> {
    const courses = await this.courseModel.aggregate([
      {
        $match: {
          $expr: {
            $in: [lab, '$labs'],
          },
        },
      },
      {
        $lookup: {
          from: 'professors',
          localField: 'professor',
          foreignField: '_id',
          as: 'professor',
        },
      },
      {
        $unwind: {
          path: '$professor',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          professor: 1,
        },
      },
    ]);
    return courses;
  }

  async findLabs(): Promise<any> {
    const labs = await this.courseModel.aggregate([
      {
        $match: {
          _id: {
            $exists: true,
          },
        },
      },
      {
        $project: {
          _id: 0,
          labs: 1,
        },
      },
      {
        $unwind: {
          path: '$labs',
        },
      },
      {
        $group: {
          _id: '$labs',
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
        },
      },
    ]);
    return labs;
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id);
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true })
    return course;
  }

  async remove(id: string): Promise<Course> {
    const course = await this.courseModel.findByIdAndDelete(id);
    return course;
  }

  async removeAll(): Promise<any> {
    return await this.courseModel.remove({});
  }
}
