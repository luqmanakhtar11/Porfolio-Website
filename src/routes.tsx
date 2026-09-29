import { createBrowserRouter } from 'react-router';
import Root from './layouts/Root';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import Resume from './pages/Resume';
import CdmCashProCaseStudy from './pages/CdmCashProCaseStudy';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'work/:slug', Component: CaseStudy },
      { path: 'resume', Component: Resume },
      { path: 'work/cdm-cashpro', Component: CdmCashProCaseStudy },
      { path: 'admin', Component: Admin },
      { path: '*', Component: NotFound },
    ],
  },
]);
