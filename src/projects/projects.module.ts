import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsRepository } from './repositories';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService,ProjectsRepository],
  exports:[ProjectsService,ProjectsRepository]
})
export class ProjectsModule {}
