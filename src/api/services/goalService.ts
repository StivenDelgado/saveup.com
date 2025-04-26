import { HttpService } from "../httpService";

interface Goal {
  id_goal?: number;
  id_user?: number;
  goal_name?: string;
  target_amount?: number;
  current_amount?: number;
  deadline?: string;
}

interface updateGoal{
  id_goal: number;
  new_amount: number;
}
  
interface DeleteGoalResponse {
    success: boolean;
    message?: string;
  }

export class goalService{
    static async getGoals(id: number): Promise<Goal[]> {
      return HttpService.get<Goal[]>(`/goals/getGoals/${id}`);
    }
    
    static async addGoal(goal: Goal): Promise<Goal> {
      return HttpService.post<Goal>("/goals/creategoal", goal);
    }

    static async deleteGoal(id_goal: number): Promise<DeleteGoalResponse> {
      return HttpService.delete<DeleteGoalResponse>(`/goals/deleteGoal/${id_goal}`);
    }

    static async updateAmount(goal: updateGoal): Promise<Goal> {
      return HttpService.put<Goal>("/goals/updateAmount", goal);
    }
}