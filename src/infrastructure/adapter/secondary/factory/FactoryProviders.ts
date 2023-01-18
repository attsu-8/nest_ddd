import { NewTaskCreatorPort } from 'src/core/port/secondary/task/factory/NewTaskCreatorPort';
import { NewTaskCreatorAdapter } from './NewTaskCreatorAdapter';

export default [
  {
    provide: NewTaskCreatorPort,
    useClass: NewTaskCreatorAdapter,
  },
];
