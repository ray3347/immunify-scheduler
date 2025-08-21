import { Module } from "@nestjs/common";
import { CronHelper } from "../helper/CronHelper";
import { CronServices } from "../services/CronServices";

@Module({
    providers: [CronHelper],
    controllers: [CronServices]
})

export class CronModule{}