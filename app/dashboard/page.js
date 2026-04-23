"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useSession } from "next-auth/react";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard";
import HRDashboard from "@/components/dashboard/HRDashboard";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen bg-slate-950 items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  const user = session?.user;
  const role = user?.role;

  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard user={user} />;
      case "hr":
        return <HRDashboard user={user} />;
      case "employee":
        return <EmployeeDashboard user={user} />;
      default:
        return <EmployeeDashboard user={user} />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}
