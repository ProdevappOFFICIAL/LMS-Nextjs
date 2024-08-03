import { DataProvider } from "../db/DataProvider";

const DashLayout = ({
  children
}: {
  children: React.ReactNode

}) => {
  return (
   
   <DataProvider>
     {children}
   
 </DataProvider>

          

    
  );
}
export default DashLayout;