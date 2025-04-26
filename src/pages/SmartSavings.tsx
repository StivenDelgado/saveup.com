
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Filter, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  ChevronDown,
  FileDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import AppLayout from "@/components/Layout/AppLayout";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { savingService } from "@/api/services/savingService";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

// Mock data
const mockTransactions = [
  { 
    id: 1, 
    name: "Salary Deposit", 
    amount: 2000, 
    type: "income", 
    category: "Salary", 
    date: "2023-02-25" 
  },
  { 
    id: 2, 
    name: "Rent Payment", 
    amount: 850, 
    type: "expense", 
    category: "Housing", 
    date: "2023-02-24" 
  },
  { 
    id: 3, 
    name: "Grocery Shopping", 
    amount: 120.45, 
    type: "expense", 
    category: "Food", 
    date: "2023-02-22" 
  },
  { 
    id: 4, 
    name: "Freelance Work", 
    amount: 350, 
    type: "income", 
    category: "Freelance", 
    date: "2023-02-20" 
  },
  { 
    id: 5, 
    name: "Electric Bill", 
    amount: 75.30, 
    type: "expense", 
    category: "Utilities", 
    date: "2023-02-18" 
  },
  { 
    id: 6, 
    name: "Internet Subscription", 
    amount: 49.99, 
    type: "expense", 
    category: "Utilities", 
    date: "2023-02-15" 
  },
  { 
    id: 7, 
    name: "Restaurant Dinner", 
    amount: 62.50, 
    type: "expense", 
    category: "Dining", 
    date: "2023-02-12" 
  },
  { 
    id: 8, 
    name: "Uber Rides", 
    amount: 35.75, 
    type: "expense", 
    category: "Transportation", 
    date: "2023-02-10" 
  }
];


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const SmartSavings = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [myTransactions, setMyTransactions] = useState([]);
  const tokenCoded = Cookies.get("accessToken");
  const accessToken = jwtDecode(tokenCoded) as { id: number , email: string};
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [idfinance, setIdfinance] = useState(0);

  const fetchTransactions = async () => {
    try {
      const transactions = await savingService.getTransactions(accessToken.id)
      setMyTransactions([
        ...transactions.finance.expenses,
        ...transactions.finance.incomes
      ]);
      setIdfinance(transactions.finance.id_finance);
      const combined = [
        ...transactions.finance.expenses,
        ...transactions.finance.incomes
      ]
      updateStats(combined)
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);
  
  // New transaction state
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amount: "",
    icon: "",
    type:""
  });
  
  const handleAddTransaction = async () => {
    const amount = parseFloat(newTransaction.amount);
    console.log(idfinance)

    
    const newIncome = {
      id_finance:idfinance,
      income_name: newTransaction.name,
      amount: amount,
      icon: newTransaction.icon,
    };

    const newExpense = {
      id_finance:idfinance,
      expense_name: newTransaction.name,
      amount: amount,
      icon: newTransaction.icon,
    };

    let res : any;

    if (newTransaction.type === 'income') {
      res = await savingService.createIncome(newIncome)
    } else {
      res = await savingService.createExpense(newExpense)
    }
    
    fetchTransactions()
    
    setAddDialogOpen(false);
     toast.success(`${newTransaction.type === 'Ingreso' ? 'Ingreso' : 'Gasto'} agregado`);
    
    // Reset form
    setNewTransaction({
      name: "",
      amount: "",
      icon: "",
      type: ""
    });
  };
  //LISTO
  const searchTransactions = (query: string)=> {
    if(!query) {
      fetchTransactions();
      setSearchQuery(query)
      return;
    }
    const filteredTransactions = myTransactions.filter(transaction => 
      transaction.income_name?.toLowerCase().includes(query.toLowerCase()) ||
      transaction.expense_name?.toLowerCase().includes(query.toLowerCase())
    );
    setMyTransactions([...filteredTransactions]);
    setSearchQuery(query)
  }
  //LISTO
  const updateStats = (transactions: { isExpense: boolean; amount: number | string }[]) => {
    const totalIncome = transactions
      .filter(t => !t.isExpense)
      .reduce((sum, t) => sum + parseFloat(t.amount as string), 0);
    
    const totalExpenses = transactions
      .filter(t => t.isExpense)
      .reduce((sum, t) => sum + parseFloat(t.amount as string), 0);
  
    setTotalIncome(totalIncome);
    setTotalExpenses(totalExpenses);
    setBalance(totalIncome - totalExpenses);
  };
  
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ahorro Inteligente</h1>
            <p className="text-muted-foreground">Monitorea tus ingresos y gastos</p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-moneywise-600 hover:bg-moneywise-700">
                <Plus className="mr-2 h-4 w-4" />
                Añadir Transacción
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Añadir Transacción</DialogTitle>
                <DialogDescription>
                  Registra un nuevo ingreso o gasto
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-type" className="text-right">
                    Tipo
                  </Label>
                  <Select 
                    value={newTransaction.type} 
                    onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione opcion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Ingreso</SelectItem>
                      <SelectItem value="expense">Gasto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Descripción
                  </Label>
                  <Input
                    id="name"
                    value={newTransaction.name}
                    onChange={(e) => setNewTransaction({...newTransaction, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Monto
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Icono
                  </Label>
                  <Input
                    id="icon"
                    value={newTransaction.icon}
                    onChange={(e) => setNewTransaction({...newTransaction, icon: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddTransaction} className="bg-moneywise-600 hover:bg-moneywise-700">
                  Guardar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Ingresos</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalIncome}</div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Gastos</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${totalExpenses}</div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${balance}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Transacciones</CardTitle>
                <CardDescription>
                  Gestiona tus ingresos y gastos
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar transacciones..."
                    className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => searchTransactions(e.target.value)}
                  />
                </div>  
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-4 text-sm font-medium">
                  <div>Descripción</div>
                  <div>Icono</div>
                  <div>Fecha</div>
                  <div className="text-right">Monto</div>
                  <div className="text-right">Tipo</div>
                </div>
                <div className="divide-y">
                  {myTransactions.length > 0 ? (
                    myTransactions.map((transaction) => (
                      <div key={transaction.id_expense || transaction.id_income} className="grid grid-cols-5 items-center p-4">
                        <div className="font-medium">{transaction.expense_name || transaction.income_name}</div>
                        <div className="text-muted-foreground">{transaction.icon}</div>
                        <div className="text-muted-foreground">
                          {new Date(transaction.expense_date || transaction.income_date).toLocaleDateString("es-CO", {
                            timeZone: "America/Bogota",
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                          })}
                        </div>
                        <div className="text-right font-medium">
                          ${transaction.amount}
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            !transaction.isExpense
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.isExpense ? 'Gasto' : 'Ingreso'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">Transacciones no encontradas</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SmartSavings;
