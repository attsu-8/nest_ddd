import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CreateTaskUseCasePort } from 'src/core/port/primary/task/useCase/CreateTaskUseCasePort';
import { DeleteTaskUseCasePort } from 'src/core/port/primary/task/useCase/DeleteTaskUseCasePort';
import { GetAllTasksUseCasePort } from 'src/core/port/primary/task/useCase/GetAllTasksUseCasePort';
import { UpdateTaskUseCasePort } from 'src/core/port/primary/task/useCase/UpdateTaskUseCasePort';
import {
  DefaultExceptionPresenter,
  UnexpectedExceptionPresenter,
} from '../exceptionPresenters';

import {
  GetAllTasksResponseDto,
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  UpdateTaskRequestDto,
  UpdateTaskResponseDto,
  DeleteTaskResponseDto,
} from './Task.controller.dtos';

@Controller('tasks')
@UseFilters(DefaultExceptionPresenter, UnexpectedExceptionPresenter)
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCasePort,
    private readonly deleteTaskUseCase: DeleteTaskUseCasePort,
    private readonly getAllTasksUseCase: GetAllTasksUseCasePort,
    private readonly updateTaskUseCase: UpdateTaskUseCasePort,
  ) {}

  @Get()
  async getAll(): Promise<GetAllTasksResponseDto> {
    const tasks = await this.getAllTasksUseCase.handle();

    return new GetAllTasksResponseDto(tasks);
  }

  @Post()
  async createOne(
    @Body() createTaskRequestDto: CreateTaskRequestDto,
  ): Promise<CreateTaskResponseDto> {
    await this.createTaskUseCase.handle({
      name: createTaskRequestDto.name,
    });

    return { statusCode: HttpStatus.OK };
  }

  @Put('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateTaskRequestDto: UpdateTaskRequestDto,
  ): Promise<UpdateTaskResponseDto> {
    await this.updateTaskUseCase.handle({
      id: Number(id),
      name: updateTaskRequestDto.name,
      done: updateTaskRequestDto.done,
    });

    return { statusCode: HttpStatus.OK };
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string): Promise<DeleteTaskResponseDto> {
    await this.deleteTaskUseCase.handle({
      id: Number(id),
    });

    return { statusCode: HttpStatus.OK };
  }
}
