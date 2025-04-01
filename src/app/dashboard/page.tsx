import Header from "@/components/common/Header";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="ダッシュボード" />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">ダッシュボード</h1>
      </main>
    </div>
  );
}
