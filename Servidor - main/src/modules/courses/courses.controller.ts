import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: any) {
    return this.coursesService.create(createCourseDto);
  }

  @Post('/file-upload')
  createMany(@Body() courses: any) {
    return this.coursesService.createMany(courses);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('/labs/:lab')
  findAllByLab(@Param('lab') lab: string) {
    return this.coursesService.findAllByLab(lab);
  }

  @Get('/current-labs/list')
  findLabs() {
    return this.coursesService.findLabs();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

  @Delete()
  removeAll() {
    return this.coursesService.removeAll();
  }
}
