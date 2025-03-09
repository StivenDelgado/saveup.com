
import { useState } from "react";
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

const SmartSavings = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  
  // New transaction state
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amount: "",
    type: "expense",
    category: "",
    date: new Date().toISOString().split('T')[0]
  });
  
  const handleAddTransaction = () => {
    const amount = parseFloat(newTransaction.amount);
    
    if (!newTransaction.name || isNaN(amount) || amount <= 0 || !newTransaction.category) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const newEntry = {
      id: transactions.length + 1,
      name: newTransaction.name,
      amount: amount,
      type: newTransaction.type,
      category: newTransaction.category,
      date: newTransaction.date
    };
    
    setTransactions([newEntry, ...transactions]);
    setAddDialogOpen(false);
    toast.success(`${newTransaction.type === 'income' ? 'Income' : 'Expense'} added successfully`);
    
    // Reset form
    setNewTransaction({
      name: "",
      amount: "",
      type: "expense",
      category: "",
      date: new Date().toISOString().split('T')[0]
    });
  };
  
  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction => 
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Smart Savings</h1>
            <p className="text-muted-foreground">Track your income and expenses</p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-moneywise-600 hover:bg-moneywise-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Transaction</DialogTitle>
                <DialogDescription>
                  Record a new income or expense
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-type" className="text-right">
                    Type
                  </Label>
                  <Select 
                    value={newTransaction.type} 
                    onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Description
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
                    Amount
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
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTransaction} className="bg-moneywise-600 hover:bg-moneywise-700">
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${balance.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Manage your income and expenses
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Income</DropdownMenuItem>
                    <DropdownMenuItem>Expense</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Date range</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                    <DropdownMenuItem>Custom range</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="icon">
                  <FileDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-4 text-sm font-medium">
                  <div>Description</div>
                  <div>Category</div>
                  <div>Date</div>
                  <div className="text-right">Amount</div>
                  <div className="text-right">Type</div>
                </div>
                <div className="divide-y">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <div key={transaction.id} className="grid grid-cols-5 items-center p-4">
                        <div className="font-medium">{transaction.name}</div>
                        <div className="text-muted-foreground">{transaction.category}</div>
                        <div className="text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</div>
                        <div className="text-right font-medium">
                          ${transaction.amount.toFixed(2)}
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            transaction.type === 'income'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type === 'income' ? 'Income' : 'Expense'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No transactions found</p>
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
