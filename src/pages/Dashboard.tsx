
import { useEffect, useState } from "react";
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
import { goalService } from "@/api/services/goalService";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { savingService } from "@/api/services/savingService";


const Dashboard = () => {
  const [savings, setSavings] = useState(2750);
  const [expenses, setExpenses] = useState(1250);
  const [income, setIncome] = useState(4000);
  const [timeframe, setTimeframe] = useState("month");
  const [goals, setGoals] = useState([]);
  const [myTransactions, setMyTransactions] = useState([]);
  
  const savingsGoal = 10000;
  const savingsPercentage = Math.floor((savings / savingsGoal) * 100);

  const tokenCoded = Cookies.get("accessToken");
  const accessToken = jwtDecode(tokenCoded) as { id: number , email: string};

  // Mock transaction data
  const recentTransactions = [
    { id: 1, name: "Supermercado", amount: -85.23, date: "Hoy", category: "Alimentación" },
    { id: 2, name: "Salario", amount: 2000, date: "Ayer", category: "Ingresos" },
    { id: 3, name: "Factura eléctrica", amount: -124.78, date: "20 Feb, 2023", category: "Servicios" },
    { id: 4, name: "Curso online", amount: -49.99, date: "18 Feb, 2023", category: "Educación" },
  ];

  const colorOptions = [
    { name: "Blue", value: "blue", class: "bg-moneywise-500" },
    { name: "Green", value: "green", class: "bg-green-500" },
    { name: "Purple", value: "purple", class: "bg-purple-500" },
    { name: "Orange", value: "orange", class: "bg-orange-500" },
    { name: "Pink", value: "pink", class: "bg-pink-500" },
  ];
  const fetchGoals = async () => {
      try {
        const metas = await goalService.getGoals(accessToken.id);
        setGoals(
          metas.goals.map((goal: any, index: number) => ({
            id: goal.id_goal,
            goal_name: goal.goal_name,
            current: parseFloat(goal.current_amount),
            target: parseFloat(goal.target_amount),
            deadline: goal.deadline,
            color: colorOptions[index % colorOptions.length].value
          }))
        );
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
  };

  const fetchTransactions = async () => {
    try {
      const transactions = await savingService.getTransactions(accessToken.id)
      setMyTransactions([
        ...transactions.finance.expenses,
        ...transactions.finance.incomes
      ]);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  
  useEffect(() => {
    fetchGoals();
    fetchTransactions();
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Panel</h1>
            <p className="text-muted-foreground">¡Bienvenido de nuevo! Aquí está tu resumen financiero.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <Card className="md:col-span-4 hover-scale">
            <CardHeader>
              <CardTitle>Transacciones Recientes</CardTitle>
              <CardDescription>Tu actividad financiera reciente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTransactions.map((transaction) => (
                  <div key={transaction.id_expense || transaction.id_income} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        !transaction.isExpense ? "bg-green-100" : "bg-red-100"
                      }`}>
                        {transaction.isExpense ? (
                          <ArrowUpRight className={`h-5 w-5 text-red-600`} />
                        ) : (
                          <ArrowDownRight className={`h-5 w-5 text-green-600`} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{transaction.income_name || transaction.expense_name}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        transaction.isExpense ?  "text-red-600" : "text-green-600"
                      }`}>
                        {transaction.isExpense ? "-" : "+"}{transaction.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">{transaction.icon}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/smart-savings">
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

              {goals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-moneywise-600" />
                      <p className="text-sm font-medium">{goal.goal_name}</p>
                    </div>
                    <div className="text-sm font-medium">${goal.current} / ${goal.target}</div>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  <p className="text-xs text-right text-muted-foreground">{((goal.current / goal.target) * 100).toFixed(1)}% completado</p>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/savings-goals">
                  Ver Todas las Metas
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="md:col-span-3 hover-scale">
            <CardHeader>
              <CardTitle>Asesor IA</CardTitle>
              <CardDescription>¿No sabes que hacer para tener alternativas mas eficacez para tus metas de ahorro? Echa un vistazo a nuestro asesor impulsado por inteligencia articial para que puedas tener una idea de donde partir 😊.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/chatbot">
                  Echar un vistazo
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="md:col-span-3 hover-scale">
            <CardHeader>
              <CardTitle>Analíticas</CardTitle>
              <CardDescription>Ponte juicio que poximamente llega Analítica, una sección en donde analizaremos tu gasto mes a mes para darte un plan de ahorro personalizado.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/analytics">
                  Echar un vistazo
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
function jwt_decode(token: string) {
  throw new Error("Function not implemented.");
}

