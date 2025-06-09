import { Module } from "@nestjs/common";
import { CronHelper } from "../helper/CronHelper";

@Module({
    providers: [CronHelper],
    controllers: []
})

export class CronModule{}