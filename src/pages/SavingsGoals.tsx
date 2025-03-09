
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowUpRight, Target, Trash2, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import AppLayout from "@/components/Layout/AppLayout";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const mockGoals = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 10000,
    current: 2750,
    deadline: "2023-12-31",
    color: "blue"
  },
  {
    id: 2,
    name: "New Car",
    target: 25000,
    current: 1500,
    deadline: "2024-06-30",
    color: "green"
  },
  {
    id: 3,
    name: "Vacation",
    target: 3000,
    current: 800,
    deadline: "2023-08-15",
    color: "purple"
  },
  {
    id: 4,
    name: "Home Down Payment",
    target: 50000,
    current: 12500,
    deadline: "2025-01-01",
    color: "orange"
  },
];

const colorOptions = [
  { name: "Blue", value: "blue", class: "bg-moneywise-500" },
  { name: "Green", value: "green", class: "bg-green-500" },
  { name: "Purple", value: "purple", class: "bg-purple-500" },
  { name: "Orange", value: "orange", class: "bg-orange-500" },
  { name: "Pink", value: "pink", class: "bg-pink-500" },
];

const SavingsGoals = () => {
  const [goals, setGoals] = useState(mockGoals);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<null | typeof mockGoals[0]>(null);
  const [depositAmount, setDepositAmount] = useState("");
  
  // New goal state
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    current: "0",
    deadline: "",
    color: "blue"
  });
  
  const handleAddGoal = () => {
    const target = parseFloat(newGoal.target);
    const current = parseFloat(newGoal.current);
    
    if (!newGoal.name || isNaN(target) || target <= 0 || !newGoal.deadline) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (isNaN(current) || current < 0) {
      toast.error("Current amount must be a valid number");
      return;
    }
    
    if (current > target) {
      toast.error("Current amount cannot be greater than target");
      return;
    }
    
    const newEntry = {
      id: goals.length + 1,
      name: newGoal.name,
      target: target,
      current: current,
      deadline: newGoal.deadline,
      color: newGoal.color
    };
    
    setGoals([...goals, newEntry]);
    setAddDialogOpen(false);
    toast.success("Savings goal created successfully");
    
    // Reset form
    setNewGoal({
      name: "",
      target: "",
      current: "0",
      deadline: "",
      color: "blue"
    });
  };
  
  const handleDeposit = () => {
    if (!selectedGoal) return;
    
    const amount = parseFloat(depositAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const updatedGoals = goals.map(goal => {
      if (goal.id === selectedGoal.id) {
        const newAmount = goal.current + amount;
        if (newAmount > goal.target) {
          toast.error("Deposit would exceed the goal target");
          return goal;
        }
        return { ...goal, current: newAmount };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    setDepositDialogOpen(false);
    setDepositAmount("");
    toast.success(`$${amount.toFixed(2)} added to ${selectedGoal.name}`);
  };
  
  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast.success("Goal deleted successfully");
  };
  
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
            <p className="text-muted-foreground">Track your progress towards financial freedom</p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-moneywise-600 hover:bg-moneywise-700">
                <Plus className="mr-2 h-4 w-4" />
                New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Savings Goal</DialogTitle>
                <DialogDescription>
                  Set a new financial goal to work towards
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-name" className="text-right">
                    Goal Name
                  </Label>
                  <Input
                    id="goal-name"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="target-amount" className="text-right">
                    Target Amount
                  </Label>
                  <Input
                    id="target-amount"
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="current-amount" className="text-right">
                    Starting Amount
                  </Label>
                  <Input
                    id="current-amount"
                    type="number"
                    value={newGoal.current}
                    onChange={(e) => setNewGoal({...newGoal, current: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deadline" className="text-right">
                    Target Date
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Color</Label>
                  <div className="col-span-3 flex gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        className={`w-8 h-8 rounded-full ${color.class} ${
                          newGoal.color === color.value ? 'ring-2 ring-offset-2 ring-black' : ''
                        }`}
                        onClick={() => setNewGoal({...newGoal, color: color.value})}
                        aria-label={`Select ${color.name}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddGoal} className="bg-moneywise-600 hover:bg-moneywise-700">
                  Create Goal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add to {selectedGoal?.name}</DialogTitle>
                <DialogDescription>
                  Add money to your savings goal
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="deposit-amount">Amount</Label>
                  <Input
                    id="deposit-amount"
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDepositDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleDeposit} className="bg-moneywise-600 hover:bg-moneywise-700">
                  Add Funds
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => {
            const progress = Math.floor((goal.current / goal.target) * 100);
            const colorClass = 
              goal.color === "blue" ? "bg-moneywise-500" : 
              goal.color === "green" ? "bg-green-500" : 
              goal.color === "purple" ? "bg-purple-500" : 
              goal.color === "orange" ? "bg-orange-500" : 
              "bg-pink-500";
            
            const colorLightClass = 
              goal.color === "blue" ? "bg-moneywise-100" : 
              goal.color === "green" ? "bg-green-100" : 
              goal.color === "purple" ? "bg-purple-100" : 
              goal.color === "orange" ? "bg-orange-100" : 
              "bg-pink-100";
              
            const colorBorderClass = 
              goal.color === "blue" ? "border-moneywise-200" : 
              goal.color === "green" ? "border-green-200" : 
              goal.color === "purple" ? "border-purple-200" : 
              goal.color === "orange" ? "border-orange-200" : 
              "border-pink-200";
              
            const colorTextClass = 
              goal.color === "blue" ? "text-moneywise-700" : 
              goal.color === "green" ? "text-green-700" : 
              goal.color === "purple" ? "text-purple-700" : 
              goal.color === "orange" ? "text-orange-700" : 
              "text-pink-700";
              
            return (
              <Card key={goal.id} className={`hover-scale border ${colorBorderClass}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${colorClass}`} />
                      <CardTitle className="text-lg">{goal.name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedGoal(goal);
                            setDepositDialogOpen(true);
                          }}
                        >
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          Add Funds
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Goal
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteGoal(goal.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Goal
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>
                    Target Date: {new Date(goal.deadline).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`p-4 rounded-lg ${colorLightClass}`}>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Current</p>
                        <p className={`text-2xl font-bold ${colorTextClass}`}>
                          ${goal.current.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Target</p>
                        <p className="text-xl font-medium">
                          ${goal.target.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className={colorTextClass}>Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      ${(goal.target - goal.current).toLocaleString()} left to reach your goal
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      setSelectedGoal(goal);
                      setDepositDialogOpen(true);
                    }}
                  >
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Add Funds
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default SavingsGoals;
