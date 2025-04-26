import { HttpService } from "../httpService";

interface Finance{
    finance:{
        id_finance: number;
        current_salary: number;
        incomes:[]
        expenses:[]
    }
}

interface incomeDTO{
    id_finance: number;
    income_name: string;
    amount: number;
    icon: string;
}

interface expenseDTO{
    id_finance: number;
    expense_name: string;
    amount: number;
    icon: string;
}

export class savingService{
    static async getTransactions(id: number): Promise<Finance[]> {
        return HttpService.get<Finance[]>(`/finance/getFinances/${id}`);
    }

    static async createIncome(income: incomeDTO): Promise<any> {
        return HttpService.post<Finance>(`/income/createIncome`, income);
    }

    static async createExpense(expense: expenseDTO): Promise<any> {
        return HttpService.post<Finance>(`/expense/createExpense`, expense);
    }
}
;
