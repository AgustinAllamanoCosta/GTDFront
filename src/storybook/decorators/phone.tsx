import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../../contexts/appContext';

export const PhoneContext = (Story: any) => (
  <BrowserRouter>
    <AppContext>
      <Story />
    </AppContext>
  </BrowserRouter>
);
