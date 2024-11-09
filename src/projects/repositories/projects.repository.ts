import { MongoDatabase } from "@nest-agency-banking-api/database";
import { Document, InsertOneResult, ObjectId } from "mongodb";
import { CreateProjectDto } from "../dto/create-project.dto";

import { Injectable } from "@nestjs/common";
import { Project } from "../entities/project.entity";


@Injectable()
export class ProjectsRepository {
  private database: MongoDatabase;

  constructor() {
    this.database = MongoDatabase.getInstance();
  }

  async createProjects(project: CreateProjectDto ): Promise<InsertOneResult<Document>> {
    return (await this.collection()).insertOne(project);
  }


  async getProjectsById(id: string) {
    return (await this.collection()).findOne({
      _id: new ObjectId(id),
    }) as unknown as Project;
  }

  async getProject(filter: QueryFilter) {
    if ('_id' in filter) filter._id = new ObjectId(filter._id);

    return (await this.collection()).findOne(filter) as unknown as Project;
  }

  async getProjects(query?: QueryOptions): Promise<Document[]> {
    return (await this.collection()).find(query?.filter ?? {})
      .project(query?.projection ?? {})
      .sort(query?.sort ?? '_id', query?.way ?? -1)
      .skip(query?.offset ?? 0)
      .limit(query?.limit ?? 50)
      .toArray();
  }

  async updateProjects(id: string, data: Document) {
    const _id = new ObjectId(id);

    await (await this.collection()).updateOne(
      { _id },
      { $set: { ...data, 'date.updated': new Date().valueOf() } },
    );

    return (await this.collection()).find().toArray();

  }

  async deleteProjects(id: string) {
    return (await this.collection()).deleteOne({ _id: new ObjectId(id) });
  }

  private async collection() {
    return (await this.database.getDatabase()).collection('projects');
  }
}