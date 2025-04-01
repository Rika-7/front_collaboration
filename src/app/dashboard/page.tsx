import Header from "../../components/common/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import {
  Download,
  DollarSign,
  Users,
  CreditCard,
  Activity,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { BarChart } from "../../components/dashboard/bar-chart";
// Ensure the correct path to the DatePickerWithRange component
import { DatePickerWithRange } from "../../components/dashboard/date-range-picker";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="マイページ" />
      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">ダッシュボード</h1>
          <div className="flex items-center gap-4">
            <DatePickerWithRange />
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              ダウンロード
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="analytics">分析</TabsTrigger>
            <TabsTrigger value="reports">レポート</TabsTrigger>
            <TabsTrigger value="notifications">通知</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">総収益</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">150万円</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+20.1%</span> 先月比
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    登録者数
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+180.1%</span> 先月比
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">契約</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+19%</span> 先月比
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    現在アクティブ
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+201</span> 1時間前比
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>契約</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>最近の契約</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    今月は5件の契約がありました。
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg" alt="Avatar" />
                        <AvatarFallback>理</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          理学部
                        </p>
                        <p className="text-sm text-muted-foreground">
                          田中教授
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+20万円</div>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg" alt="Avatar" />
                        <AvatarFallback>工</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          工学部
                        </p>
                        <p className="text-sm text-muted-foreground">
                          佐藤教授
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+100万円</div>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg" alt="Avatar" />
                        <AvatarFallback>医</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          医学部
                        </p>
                        <p className="text-sm text-muted-foreground">
                          鈴木教授
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+20万円</div>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg" alt="Avatar" />
                        <AvatarFallback>文</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          文学部
                        </p>
                        <p className="text-sm text-muted-foreground">
                          高橋教授
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+50万円</div>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg" alt="Avatar" />
                        <AvatarFallback>経</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          経済学部
                        </p>
                        <p className="text-sm text-muted-foreground">
                          伊藤教授
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+39万円</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
