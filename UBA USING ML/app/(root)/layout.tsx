import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../_components/AppSidebar";
import Header from "../_components/Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f2f1f1] min-h-screen flex">
      <SidebarProvider>
        <AppSidebar />
        <div >
        <SidebarTrigger className="absolute m-auto" />
        </div>

        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default Layout;
