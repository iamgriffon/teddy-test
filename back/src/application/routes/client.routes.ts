import { ClientController } from "@/application/controllers/client.controller";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ClientController],
})
export class ClientRoutes {}