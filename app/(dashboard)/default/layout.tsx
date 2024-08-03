import { Sidebar } from "../_component/side-bar.components/sidebar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode

}) => {
  return (
   
        <div className="h-full">
          <div className="md:flex h-full w-25 flex-col fixed inset-y-0 ">
            <Sidebar />
            
          </div>
          <main className=" ml-[52px] sm:ml-[60px]">
            {children}
          </main>


        </div>
    
  );
}
export default DashboardLayout;