import { Logo } from "./logo";
import { SideBarRoutes } from "./sidebar-routes";

export const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      
        {/*Esta es la imagen que tiene el dashboard*/}
      
      <div className="p-6">
        <Logo/> 
      </div>
        
        
        {/*Este renderiza las rutas que tenemos guardados en los SideBarRoutes*/}
        {/*Basicamente lo que se tenga aqui se agrega como una opcion dentro de las pestañas de SideBarRoutes*/}

      
      <div className="flex flex-col w-full">
        <SideBarRoutes/>
      </div>
    </div>
  );
};
