import DashboardNavbar from "@/components/dashboard/Navbar";
import "@/styles/dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <DashboardNavbar />

      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}