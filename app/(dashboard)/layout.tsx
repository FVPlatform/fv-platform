import Navbar from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <div className="h-full">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50"style={{ backgroundColor: '#255a5e' }}>
                <Navbar />
            </div>
            <div className="hidden md:flex h-flux w-56 flex-col fixed inset-y-0 z-50"style={{ backgroundColor: '#a0d5d9' }}>
                <Sidebar />
            </div>
            <main className="md:pl-56 pt-[80px] h-full">
                {children}
            </main>
        </div>
     );
}
 
export default DashboardLayout;