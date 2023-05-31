import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { async, EMPTY } from 'rxjs';
import { Student } from '../students/interfaces/student.interface';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './interfaces/entry.interface';

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel('Entry')
    private readonly entryModel: Model<Entry>,
    @InjectModel('Student')
    private readonly studentModel: Model<Student>,
  ) {}

  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    const entry = new this.entryModel(createEntryDto);
    return await this.studentModel
      .findById(entry.student)
      .exec()
      .then(async (res) => {
        if (res) {
          return (await entry.save()).populate('student');
        }
        throw new BadRequestException('Student not registered');
      })
      .catch((err) => {
        return err;
      });
  }

  async findAll(): Promise<Entry[]> {
    const entries = await this.entryModel.find();
    return entries;
  }

  async findOne(id: string): Promise<Entry> {
    const entry = await this.entryModel.findById(id);
    return entry;
  }

  async generateStudentReport(reportData: any): Promise<any> {
    // Revisamos que campos fueron ingresados en blanco
    if (!reportData.lab || reportData.lab == 'undefined') reportData.lab = { $exists: true };
    if (!reportData.student || reportData.student == 'undefined') {
      reportData.student = { $exists: true };
    } else {
      reportData.student = Number(reportData.student);
    }
    if (!reportData.courseCode || reportData.courseCode == 'undefined') reportData.courseCode = { $exists: true };
    if (!reportData.courseGroup || reportData.courseGroup == 'undefined') reportData.courseGroup = { $exists: true };

    const report = await this.entryModel.aggregate([
      {
        $match: {
          $and: [
            {
              lab: reportData.lab,
            },
            {
              student: reportData.student,
            },
            {
              'course.code': reportData.courseCode,
            },
            {
              'course.group': reportData.courseGroup,
            },
            {
              date: {
                $gte: new Date(reportData.startDate),
                $lte: new Date(reportData.endDate),
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'students',
          localField: 'student',
          foreignField: '_id',
          as: 'student',
        },
      },
      {
        $unwind: {
          path: '$student',
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%Y-%m-%d, %H:%M:%S',
              date: '$date',
            },
          },
          lab: 1,
          course: 1,
          student: 1,
        },
      },
    ]);
    return report;
  }

  async generateProfessorReport(reportData: any): Promise<any> {
    // Revisamos que campos fueron ingresados en blanco
    if (!reportData.lab || reportData.lab == 'undefined') reportData.lab = { $exists: true };
    if (!reportData.professor || reportData.professor == 'undefined') {
      reportData.professor = { $exists: true };
    } else {
      reportData.professor = Number(reportData.professor);
    }
    if (!reportData.courseCode || reportData.courseCode == 'undefined') reportData.courseCode = { $exists: true };
    if (!reportData.courseGroup || reportData.courseGroup == 'undefined') reportData.courseGroup = { $exists: true };

    const report = await this.entryModel.aggregate([
      {
        $match: {
          $and: [
            {
              lab: reportData.lab,
            },
            {
              'course.code': reportData.courseCode,
            },
            {
              'course.group': reportData.courseGroup,
            },
            {
              date: {
                $gte: new Date(reportData.startDate),
                $lte: new Date(reportData.endDate),
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'professors',
          localField: 'course.professor',
          foreignField: '_id',
          as: 'professor',
        },
      },
      {
        $unwind: {
          path: '$professor',
        },
      },
      {
        $match: {
          'professor._id': reportData.professor,
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$date',
            },
          },
          lab: 1,
          course: 1,
          professor: 1,
        },
      },
      {
        $group: {
          _id: {
            date: '$date',
            professor: '$professor',
          },
          date: {
            $first: '$date',
          },
          lab: {
            $first: '$lab',
          },
          course: {
            $first: '$course',
          },
          professor: {
            $first: '$professor',
          },
        },
      },
    ]);
    return report;
  }

  async update(id: string, updateEntryDto: UpdateEntryDto): Promise<Entry> {
    const entry = await this.entryModel.findByIdAndUpdate(id, updateEntryDto, { new: true })
    return entry;
  }

  async remove(id: string): Promise<Entry> {
    const entry = await this.entryModel.findByIdAndDelete(id);
    return entry;
  }
}
