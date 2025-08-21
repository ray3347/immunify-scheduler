import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { CronHelper } from '../helper/CronHelper';

@Controller('cron')
export class CronServices {
  constructor(private readonly helper: CronHelper) {}

  @Get('check-in')
  async checkIn(@Res() response) {
    try {
      const data = await this.helper.checkInBinaInovasiGlobal();

      return response.status(HttpStatus.OK).json({
        data: data,
      });
    } catch (ex) {
      return response.status(ex.status).json(ex.response);
    }
  }

  @Get('check-out')
  async checkOut(@Res() response) {
    try {
      const data = await this.helper.checkOutBinaInovasiGlobal();

      return response.status(HttpStatus.OK).json({
        data: data,
      });
    } catch (ex) {
      return response.status(ex.status).json(ex.response);
    }
  }
}
