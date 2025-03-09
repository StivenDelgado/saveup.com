
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/Layout/AppLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const expenseData = [
  { name: 'Ene', amount: 2400 },
  { name: 'Feb', amount: 1398 },
  { name: 'Mar', amount: 9800 },
  { name: 'Abr', amount: 3908 },
  { name: 'May', amount: 4800 },
  { name: 'Jun', amount: 3800 },
];

const incomeData = [
  { name: 'Ene', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 12000 },
  { name: 'Abr', amount: 5780 },
  { name: 'May', amount: 4890 },
  { name: 'Jun', amount: 4300 },
];

const categoryData = [
  { name: 'Vivienda', value: 35 },
  { name: 'Alimentación', value: 25 },
  { name: 'Transporte', value: 15 },
  { name: 'Entretenimiento', value: 10 },
  { name: 'Salud', value: 8 },
  { name: 'Otros', value: 7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6B6B'];

const Analytics = () => {
  const [period, setPeriod] = useState("monthly");

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analíticas</h1>
          <p className="text-muted-foreground">Visualiza y analiza tus finanzas personales</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="expenses">Gastos</TabsTrigger>
            <TabsTrigger value="income">Ingresos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
                  <CardDescription>Último mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$23,500</div>
                  <p className="text-xs text-muted-foreground">+5.4% vs. mes anterior</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                  <CardDescription>Último mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$42,500</div>
                  <p className="text-xs text-muted-foreground">+2.1% vs. mes anterior</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Ahorro</CardTitle>
                  <CardDescription>Último mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$19,000</div>
                  <p className="text-xs text-muted-foreground">+8.2% vs. mes anterior</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Distribución de Gastos</CardTitle>
                  <CardDescription>Por categoría</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Flujo de Efectivo</CardTitle>
                    <CardDescription>Ingresos vs Gastos</CardDescription>
                  </div>
                  <div className="space-x-2">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger 
                        value="monthly" 
                        onClick={() => setPeriod("monthly")}
                        className={period === "monthly" ? "data-[state=active]:bg-moneywise-500" : ""}
                      >
                        Mensual
                      </TabsTrigger>
                      <TabsTrigger 
                        value="yearly" 
                        onClick={() => setPeriod("yearly")}
                        className={period === "yearly" ? "data-[state=active]:bg-moneywise-500" : ""}
                      >
                        Anual
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent className="h-80 pt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={period === "monthly" ? expenseData : expenseData.concat(expenseData)}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="amount" name="Gastos" fill="#f43f5e" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Gastos</CardTitle>
                <CardDescription>
                  Detalle de tus gastos a lo largo del tiempo
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={expenseData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" name="Gastos" fill="#f43f5e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="income" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Ingresos</CardTitle>
                <CardDescription>
                  Detalle de tus ingresos a lo largo del tiempo
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={incomeData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" name="Ingresos" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Analytics;
