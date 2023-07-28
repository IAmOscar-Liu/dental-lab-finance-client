import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Favorites from "./page/Favorites";
import Finance from "./page/Finance";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import ContractManagement from "./page/contractPage/ContractManagement";
import CreateContract from "./page/contractPage/CreateContract";
import SingleContract from "./page/contractPage/SingleContract";
import UpdateContract from "./page/contractPage/UpdateContract";
import CreateDentalLab from "./page/dentalLabPage/CreateDentalLab";
import DentalManagement from "./page/dentalLabPage/DentalManagement";
import SingleDentalLab from "./page/dentalLabPage/SingleDentalLab";
import UpdateDentalLab from "./page/dentalLabPage/UpdateDentalLab";
import CreateEquipment from "./page/equipmentPage/CreateEquipment";
import EquipmentManagement from "./page/equipmentPage/EquipmentManagement";
import SingleEquipment from "./page/equipmentPage/SingleEquipment";
import UpdateEquipment from "./page/equipmentPage/UpdateEquipment";
import CreateStock from "./page/stockPage/CreateStock";
import SingleStock from "./page/stockPage/SingleStock";
import StockManagement from "./page/stockPage/StockManagement";
import UpdateStock from "./page/stockPage/UpdateStock";

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
        path: "equipment-management",
        element: <EquipmentManagement />,
      },
      {
        path: "equipment-management/new",
        element: <CreateEquipment />,
      },
      {
        path: "equipment-management/overview",
        element: <SingleEquipment />,
      },
      {
        path: "equipment-management/overview/:equipmentId",
        element: <SingleEquipment />,
      },
      {
        path: "equipment-management/update",
        element: <UpdateEquipment />,
      },
      {
        path: "equipment-management/update/:equipmentId",
        element: <UpdateEquipment />,
      },
      {
        path: "stock-management",
        element: <StockManagement />,
      },
      {
        path: "stock-management/new",
        element: <CreateStock />,
      },
      {
        path: "stock-management/overview",
        element: <SingleStock />,
      },
      {
        path: "stock-management/overview/:stockId",
        element: <SingleStock />,
      },
      {
        path: "stock-management/update",
        element: <UpdateStock />,
      },
      {
        path: "stock-management/update/:stockId",
        element: <UpdateStock />,
      },
      {
        path: "dental-lab-management",
        element: <DentalManagement />,
      },
      {
        path: "dental-lab-management/new",
        element: <CreateDentalLab />,
      },
      {
        path: "dental-lab-management/overview",
        element: <SingleDentalLab />,
      },
      {
        path: "dental-lab-management/overview/:dentalLabId",
        element: <SingleDentalLab />,
      },
      {
        path: "dental-lab-management/update",
        element: <UpdateDentalLab />,
      },
      {
        path: "dental-lab-management/update/:dentalLabId",
        element: <UpdateDentalLab />,
      },
      {
        path: "contract-management",
        element: <ContractManagement />,
      },
      {
        path: "contract-management/new",
        element: <CreateContract />,
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
        path: "contract-management/update",
        element: <UpdateContract />,
      },
      {
        path: "contract-management/update/:contractType/:contractId",
        element: <UpdateContract />,
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

export default router;
