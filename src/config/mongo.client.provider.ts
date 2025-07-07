import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongoClient } from 'mongodb';


export const MongoClientProvider: Provider = {
    provide: 'MONGO_CLIENT',
    useFactory: async (ConfigService: ConfigService) : Promise<MongoClient> => {
        const uri = ConfigService.get<string>('MONGO_DATABASE');
        const client = new MongoClient(uri);
        await client.connect();
        return client;
    },
    inject: [ConfigService]
}