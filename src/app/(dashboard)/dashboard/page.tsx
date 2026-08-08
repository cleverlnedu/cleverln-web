import DashboardClient from "./DashboardClient";

interface DashboardPageProps {
  searchParams: Promise<{
    verify?: string;
    purchased?: string;
    jobVerify?: string;
    jobPurchased?: string;
    plan?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;

  return (
    <DashboardClient
      verify={params.verify === "true"}
      purchased={params.purchased === "true"}
      jobVerify={params.jobVerify === "true"}
      jobPurchased={params.jobPurchased === "true"}
      plan={params.plan || "standard"}
    />
  );
}