import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsRepository } from './repositories/projects.repository';


@Injectable()
export class ProjectsService {

  constructor(private projectsRepository:ProjectsRepository){}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectsRepository.createProjects(createProjectDto)
  }

  async findAll() {
    return await this.projectsRepository.getProjects()
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectsRepository.updateProjects(id,updateProjectDto)
  }

  async findOne(id: string) {
    return await this.projectsRepository.getProjectsById(id)
  }

}
