import { NewTaskCreatorPort } from 'src/core/port/secondary/factory/NewTaskCreatorPort';
import { NewTaskCreatorAdapter } from './NewTaskCreatorAdapter';

export default [
  {
    provide: NewTaskCreatorPort,
    useClass: NewTaskCreatorAdapter,
  },
];
