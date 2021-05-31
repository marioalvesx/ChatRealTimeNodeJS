import { Request, Response }  from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {
    async create (request: Request, response: Response) {
        const { chat, username } = request.body;   // recebe os dados sendo requisitados no método de criação;

        const settingsService = new SettingsService(); 
        // Comunica-se com a camada de Service com a classe para setar um serviço

        try {
            const settings = await settingsService.create({ chat, username });
            // Comunica-se com a camada de Service que cria e salva no BD o novo registro

            return response.json(settings); // retorna o novo registro criado
        }catch(err) {
            return response.status(400).json({
                message: err.message,
            });
        }
    }

    async findByUsername(request: Request, response: Response){
        const { username } = request.params;

        const settingsService = new SettingsService();

        const settings = await settingsService.findByUsername(username);

        return response.json(settings);
    }

    async update(request: Request, response: Response){
        const { username } = request.params;
        const { chat } = request.body;

        const settingsService = new SettingsService();

        const settings = await settingsService.update(username, chat);

        return response.json(settings);
    }

}

export { SettingsController }