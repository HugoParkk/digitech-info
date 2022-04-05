import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class InfoService {
  weekDay = [
    ' 일 \n\n',
    ' 월 \n\n',
    ' 화 \n\n',
    ' 수 \n\n',
    ' 목 \n\n',
    ' 금 \n\n',
    ' 토 \n\n',
  ];

  logger: Logger;
  constructor() {
    this.logger = new Logger();
  }

  private readonly DATA_URL: string =
    'https://open.neis.go.kr/hub/mealServiceDietInfo';
  private readonly KEY: string = '7a226d6aaae146cd870ddc0d9307f8a1';

  async getTodayInfo() {
    let counter = 0;
    const date = new Date();
    const YML = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(
      -2,
    )}${('0' + date.getDate()).slice(-2)}`;
    const week: number = date.getDay();

    let data;

    try {
      const products = await axios.get(this.DATA_URL, {
        params: {
          Key: this.KEY,
          Type: 'json',
          ATPT_OFCDC_SC_CODE: 'B10',
          SD_SCHUL_CODE: '7010572',
          MLSV_YMD: YML,
        },
      });
      data = products.data.mealServiceDietInfo[1].row[0].DDISH_NM;
    } catch (error) {
      return '오늘 급식은 없습니다';
    }
    data = data.replaceAll('<br/>', '\n');
    data = data.replaceAll('·', '');
    data = data.replaceAll('.', '');
    for (let i = 0; i < 10; i++) {
      data = data.replaceAll(`${i}`, '');
    }
    data =
      date.getFullYear() +
      '.' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '.' +
      ('0' + date.getDate()).slice(-2) +
      this.weekDay[week] +
      data;
    console.log(data);
    this.logger.log(`getTodayInfo is triggered ${++counter}times`);
    return data;
  }

  async postTodayInfo() {
    const info = await this.getTodayInfo();
    const data = {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: info,
            },
          },
        ],
      },
    };
    return data;
  }

  async getTomorrowInfo() {
    let counter = 0;
    const date = new Date();
    const YML = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(
      -2,
    )}${('0' + (date.getDate() + 1)).slice(-2)}`;
    const week: number = date.getDay() + 1 > 6 ? 0 : date.getDay() + 1;

    let data;

    try {
      const products = await axios.get(this.DATA_URL, {
        params: {
          Key: this.KEY,
          Type: 'json',
          ATPT_OFCDC_SC_CODE: 'B10',
          SD_SCHUL_CODE: '7010572',
          MLSV_YMD: YML,
        },
      });
      data = products.data.mealServiceDietInfo[1].row[0].DDISH_NM;
    } catch (error) {
      return '내일 급식은 없습니다';
    }

    data = data.replaceAll('<br/>', '\n');
    data = data.replaceAll('·', '');
    data = data.replaceAll('.', '');
    for (let i = 0; i < 10; i++) {
      data = data.replaceAll(`${i}`, '');
    }
    data =
      date.getFullYear() +
      '.' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '.' +
      ('0' + (date.getDate() + 1)).slice(-2) +
      this.weekDay[week] +
      data;
    console.log(data);
    this.logger.log(`getTomorrowInfo is triggered ${++counter}times`);
    return data;
  }

  async postTomorrowInfo() {
    const info = await this.getTomorrowInfo();
    const data = {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: info,
            },
          },
        ],
      },
    };
    return data;
  }
}
