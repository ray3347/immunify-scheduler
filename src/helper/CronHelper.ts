import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

const axios = require('axios');

@Injectable()
export class CronHelper {
  private readonly logger = new Logger(CronHelper.name);

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async appointmentReminder() {
    const notif = await axios.post(
      'http://localhost:7000/user/notification/appointment/reminder',
      null,
      {
        headers: {
          Authorization: 'Bearer QlVfQUxWSU5BX05PXzE=',
        },
      },
    );
    this.logger.debug(notif.data.data);
    console.log(notif.data.data);
  }
}
