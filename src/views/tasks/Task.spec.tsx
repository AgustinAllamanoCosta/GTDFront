import React from 'react';
import { expect } from '@jest/globals';
import { render } from '@testing-library/react';
import TaskView from './Task';
import { BrowserRouter } from 'react-router-dom';
import MetricContext from '../../components/useEvent/useEvent';
import { configuration } from '../../config/appConfig';
import { Configuration } from '../../types/types';

describe('Task View', () => {
  test('Should render a login view with singin and login buttons', async () => {
    const { container } = render(
      <MetricContext
        analytics={undefined}
        configuration={{ environment: 'NOT E2E' } as Configuration}
      >
        <BrowserRouter>
          <TaskView refreshTaskInterval={900000} />
        </BrowserRouter>
      </MetricContext>,
    );
    expect(container).toMatchSnapshot();
  });
});
