import React from 'react';
import { expect } from '@jest/globals';
import { render } from '@testing-library/react';
import TaskView from './Task';
import { BrowserRouter } from 'react-router-dom';
import MetricContext from '../../components/useEvent/useEvent';

describe('Task View', () => {
  test('Should render a login view with singin and login buttons', async () => {
    const { container } = render(
      <MetricContext analytics={undefined}>
        <BrowserRouter>
          <TaskView refreshTaskInterval={900000} />
        </BrowserRouter>
      </MetricContext>,
    );
    expect(container).toMatchSnapshot();
  });
});
