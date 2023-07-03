import { createRoot } from "react-dom/client";
import RouterAPP from "./RouterAPP";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <RouterAPP/>
);
