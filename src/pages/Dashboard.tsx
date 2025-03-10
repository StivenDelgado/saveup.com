
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Target, 
  TrendingUp,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/Layout/AppLayout";

const Dashboard = () => {
  const [savings, setSavings] = useState(2750);
  const [expenses, setExpenses] = useState(1250);
  const [income, setIncome] = useState(4000);
  const [timeframe, setTimeframe] = useState("month");

  const savingsGoal = 10000;
  const savingsPercentage = Math.floor((savings / savingsGoal) * 100);

  // Mock transaction data
  const recentTransactions = [
    { id: 1, name: "Supermercado", amount: -85.23, date: "Hoy", category: "Alimentación" },
    { id: 2, name: "Salario", amount: 2000, date: "Ayer", category: "Ingresos" },
    { id: 3, name: "Factura eléctrica", amount: -124.78, date: "20 Feb, 2023", category: "Servicios" },
    { id: 4, name: "Curso online", amount: -49.99, date: "18 Feb, 2023", category: "Educación" },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Panel</h1>
            <p className="text-muted-foreground">¡Bienvenido de nuevo! Aquí está tu resumen financiero.</p>
          </div>
          <Button className="bg-moneywise-600 hover:bg-moneywise-700">
            <DollarSign className="mr-2 h-4 w-4" />
            Añadir Transacción
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${savings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +${(savings * 0.05).toFixed(2)} desde el último {timeframe === "month" ? "mes" : "año"}
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${income.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +5.2% desde el último {timeframe === "month" ? "mes" : "año"}
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Gastos</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${expenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                -2.1% desde el último {timeframe === "month" ? "mes" : "año"}
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Ahorro</CardTitle>
              <TrendingUp className="h-4 w-4 text-moneywise-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{((income - expenses) / income * 100).toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                +1.5% desde el último {timeframe === "month" ? "mes" : "año"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <Card className="md:col-span-4 hover-scale">
            <CardHeader>
              <CardTitle>Transacciones Recientes</CardTitle>
              <CardDescription>Tu actividad financiera reciente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                      }`}>
                        {transaction.amount > 0 ? (
                          <ArrowUpRight className={`h-5 w-5 text-green-600`} />
                        ) : (
                          <ArrowDownRight className={`h-5 w-5 text-red-600`} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{transaction.name}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        transaction.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.amount > 0 ? "+" : ""}{transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">{transaction.category}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/savings">
                    Ver Todas las Transacciones
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3 hover-scale">
            <CardHeader>
              <CardTitle>Progreso de Metas de Ahorro</CardTitle>
              <CardDescription>Sigue tu camino hacia la libertad financiera</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-moneywise-600" />
                    <p className="text-sm font-medium">Fondo de Emergencia</p>
                  </div>
                  <div className="text-sm font-medium">${savings} / ${savingsGoal}</div>
                </div>
                <Progress value={savingsPercentage} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">{savingsPercentage}% completado</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-moneywise-600" />
                    <p className="text-sm font-medium">Coche Nuevo</p>
                  </div>
                  <div className="text-sm font-medium">$1,500 / $25,000</div>
                </div>
                <Progress value={6} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">6% completado</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-moneywise-600" />
                    <p className="text-sm font-medium">Vacaciones</p>
                  </div>
                  <div className="text-sm font-medium">$800 / $3,000</div>
                </div>
                <Progress value={27} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">27% completado</p>
              </div>
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/goals">
                  Ver Todas las Metas
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
