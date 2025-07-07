import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongoClientProvider } from "./mongo.client.provider";

@Module({
    imports:[ConfigModule],
    providers: [MongoClientProvider],
    exports: ['MONGO_CLIENT'],
})

export class MongoClientModule {}
