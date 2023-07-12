import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import "./index.css";
import ContractManagement from "./page/contractPage/ContractManagement";
import Favorites from "./page/Favorites";
import Finance from "./page/Finance";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import CreateDentalLab from "./page/dentalLabPage/CreateDentalLab";
import DentalManagement from "./page/dentalLabPage/DentalManagement";
import { store } from "./redux/store";
import SingleDentalLab from "./page/dentalLabPage/SingleDentalLab";
import UpdateDentalLab from "./page/dentalLabPage/UpdateDentalLab";
import SingleContract from "./page/contractPage/SingleContract";
import EquipmentManagement from "./page/equipmentPage/EquipmentManagement";
import SingleEquipment from "./page/equipmentPage/SingleEquipment";
import CreateEquipment from "./page/equipmentPage/CreateEquipment";
import UpdateEquipment from "./page/equipmentPage/UpdateEquipment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "/equipment-management",
        element: <EquipmentManagement />,
      },
      {
        path: "/equipment-management/new",
        element: <CreateEquipment />,
      },
      {
        path: "/equipment-management/overview",
        element: <SingleEquipment />,
      },
      {
        path: "/equipment-management/overview/:equipmentId",
        element: <SingleEquipment />,
      },
      {
        path: "/equipment-management/update",
        element: <UpdateEquipment />,
      },
      {
        path: "/equipment-management/update/:equipmentId",
        element: <UpdateEquipment />,
      },
      {
        path: "/dental-lab-management",
        element: <DentalManagement />,
      },
      {
        path: "/dental-lab-management/new",
        element: <CreateDentalLab />,
      },
      {
        path: "dental-lab-management/overview",
        element: <SingleDentalLab />,
      },
      {
        path: "dental-lab-management/overview/:dentalId",
        element: <SingleDentalLab />,
      },
      {
        path: "/dental-lab-management/update",
        element: <UpdateDentalLab />,
      },
      {
        path: "/dental-lab-management/update/:dentalId",
        element: <UpdateDentalLab />,
      },
      {
        path: "/contract-management",
        element: <ContractManagement />,
      },
      {
        path: "contract-management/overview",
        element: <SingleContract />,
      },
      {
        path: "contract-management/overview/:contractType/:contractId",
        element: <SingleContract />,
      },
      {
        path: "finance",
        element: <Finance />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
