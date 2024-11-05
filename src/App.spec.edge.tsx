import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskView from './views/tasks/Task';
import dotenv from 'dotenv';
import { InboxTasks, Task, UserData } from './types/types';
import { BrowserRouter } from 'react-router-dom';
import ItemsContext from './components/useItems/useItems';

dotenv.config();

test('Task view edge to edge tests', async () => {
  const dummyTask: Task = {
    id: 'some-task-id',
    title: 'some task',
    creationDate: new Date().toISOString(),
    backgroundColor: 'green',
    activationDate: new Date().toISOString(),
    repiteTask: false,
    points: 10,
  };

  const dummyUserData: UserData = {
    id: 'some-user-id',
    name: 'some-user',
    photoURL: 'some-user-url-photo',
    accessToken: 'i-am-an-access-token-from-some-user',
  };

  const mockInboxTask: InboxTasks = new Map();
  mockInboxTask.set(dummyTask.id, dummyTask);

  const { getByTestId } = render(
    <BrowserRouter>
      <ItemsContext
        loading={false}
        defaultItems={mockInboxTask}
      >
        <TaskView
          userData={dummyUserData}
          loadScheduleTask={10}
          calculateTaskTemp={10}
          refreshTaskInterval={10}
        />
      </ItemsContext>
    </BrowserRouter>,
  );

  expect(getByTestId('button-Login With Google')).toBeDefined();
});
