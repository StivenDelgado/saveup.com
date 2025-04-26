
import { useEffect, useState } from "react";
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
import { goalService } from "@/api/services/goalService";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
// Mock data
// const mockGoals = [
//   {
//     id_goal: 1,
//     goal_name: "carro",
//     current_amount: 10000,
//     target_amount: 25000,
//     deadline: "2024-06-30",
//   },
//   {
//     id_goal: 2,
//     goal_name: "casa",
//     current_amount: 10000,
//     target_amount: 25000,
//     deadline: "2024-06-30",
//   }
// ];


const colorOptions = [
  { name: "Blue", value: "blue", class: "bg-moneywise-500" },
  { name: "Green", value: "green", class: "bg-green-500" },
  { name: "Purple", value: "purple", class: "bg-purple-500" },
  { name: "Orange", value: "orange", class: "bg-orange-500" },
  { name: "Pink", value: "pink", class: "bg-pink-500" },
];

const SavingsGoals = () => {
  const [goals, setGoals] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState({});
  const [depositAmount, setDepositAmount] = useState("");
  const urlParams = new URLSearchParams(window.location.search);

  const tokenCoded = Cookies.get("accessToken");
  const accessToken = jwtDecode(tokenCoded) as { id: number , email: string};

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

  useEffect(() => {
    fetchGoals();
  }, []);
  
  // New goal state
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    current: "0",
    deadline: "",
    color: "blue"
  });
  
  const handleAddGoal = async () => {
    const target = parseFloat(newGoal.target);
    const current = parseFloat(newGoal.current);
    
    if (!newGoal.name || isNaN(target) || target <= 0 || !newGoal.deadline) {
      toast.error("Porfavor rellena todos los campos");
      return;
    }
    
    if (isNaN(current) || current < 0) {
      toast.error("Porfavor ingresa un monto válido");
      return;
    }
    
    if (current > target) {
      toast.error("El monto inicial no puede ser mayor al monto meta");
      return;
    }
    
    const newEntry = {
      id_user: accessToken.id,
      goal_name: newGoal.name,
      target_amount: target,
      current_amount: current,
      deadline: newGoal.deadline,
    };
    console.log(newEntry)
    const res = await goalService.addGoal(newEntry);
    // fetchGoals();

    setAddDialogOpen(false);
    console.log(res)
    toast.success("Meta creada exitosamente");
    fetchGoals();
    
    // Reset form
    setNewGoal({
      name: "",
      target: "",
      current: "",
      deadline: "",
      color: "blue"
    });
  };
  
  const handleDeposit = async () => {
    if (!selectedGoal?.id || !depositAmount) return;
  
    const amount = parseFloat(depositAmount);
  
    if (isNaN(amount) || amount <= 0) {
      toast.error("Porfavor ingresa un monto válido");
      return;
    }
  
    try {
      const res = await goalService.updateAmount({
        id_goal: selectedGoal.id,
        new_amount: amount
      });
  
      if (res.success) {
        toast.success("Fondos agregados exitosamente");
        fetchGoals();
      } else {
        toast.error("Error al agregar fondos");
      }
  
      setDepositDialogOpen(false);
      setDepositAmount("");
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al procesar la solicitud");
    }
  };
  
  const handleDeleteGoal = async (id: number) => {
    const res = await goalService.deleteGoal(id);
    if (!res.success) {
      toast.error("Error al borrar la meta");
      return;
    }
    toast.success("Meta eliminada exitosamente");
    fetchGoals();
  };
  
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Metas de ahorro</h1>
            <p className="text-muted-foreground">Rastrea tu progreso hacia la libertad financiera</p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-moneywise-600 hover:bg-moneywise-700">
                <Plus className="mr-2 h-4 w-4" />
                Nueva meta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear meta de ahorro</DialogTitle>
                <DialogDescription>
                  Establece un nuevo objetivo financiero para perseguir
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-name" className="text-right">
                    Nombre de la meta
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
                    Monto objetivo
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
                    Monto inicial
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
                    Fecha objetivo
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
                  {/* OPCION PARA MAS A FUTURO PONER COLOR A LOS AHORROS */}
                  {/* <Label className="text-right">Color</Label> */}
                  {/* <div className="col-span-3 flex gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        className={`w-8 h-8 rounded-full ${color.class} ${
                          newGoal.color === color.value ? 'ring-2 ring-offset-2 ring-black' : ''
                        }`}
                        onClick={() => setNewGoal({...newGoal, color: color.value})}
                        aria-label={`Seleccionar ${color.name}`}
                      />
                    ))}
                  </div> */}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddGoal} className="bg-moneywise-600 hover:bg-moneywise-700">
                  Crear meta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar fondos</DialogTitle>
                <DialogDescription>
                  Agrega dinero a tu meta de ahorro
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="deposit-amount">Cantidad</Label>
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
                      <CardTitle className="text-lg">{goal.goal_name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Acciones</span>
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
                          Agregar fondos
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteGoal(goal.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar meta
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>
                    Fecha objetivo: {new Date(goal.deadline).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`p-4 rounded-lg ${colorLightClass}`}>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Actual</p>
                        <p className={`text-2xl font-bold ${colorTextClass}`}>
                          ${goal.current.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Meta</p>
                        <p className="text-xl font-medium">
                          ${goal.target.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className={colorTextClass}>Progreso</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      ${(goal.target - goal.current).toLocaleString()} Faltante(s) para lograr tu meta
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
                    Agregar fondos
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
