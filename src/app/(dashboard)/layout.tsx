import DashboardNavbar from "@/components/dashboard/Navbar";
import MotionPreferences from "@/components/dashboard/MotionPreferences";
import "@/styles/dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionPreferences>
      <div className="dashboard">
        <DashboardNavbar />

        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </MotionPreferences>
  );
}
