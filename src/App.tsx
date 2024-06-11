import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotFound from './pages/notFound/NotFound';
import Home from './pages/home/Home';
import MeterReadingsContainer from './pages/meterReadings/MeterReadingsContainer';
import NewMeterReading from './pages/newMeterReadings/NewMeterReading';
import Root from './root';
import { UserStateProvider } from './contexts/user/user.provider';
import { routes } from './utils/routes';


const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: routes.site.home,
        element: <Home />
      },
      {
        path: routes.site.meterReadings(':accountId'),
        element: <MeterReadingsContainer />
      },
      {
        path: routes.site.newMeterReading(':accountId'),
        element: <NewMeterReading />
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  
]);


async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
 
  const { worker } = await import('./mocks/browser')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}
 
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <UserStateProvider>
        <RouterProvider router={router} />
      </UserStateProvider>
    </React.StrictMode>,
  );
})
