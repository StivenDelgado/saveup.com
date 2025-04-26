import { HttpService } from "../httpService";

export class iaService {
    static async promptIA(prompt: { prompt: string }): Promise<any> {
        return HttpService.post<any>("/api/ia/promptIA", { prompt });
    }
}