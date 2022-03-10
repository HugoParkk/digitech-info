import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class InfoService {
  private readonly DATA_URL: string =
    'https://open.neis.go.kr/hub/mealServiceDietInfo';
  private readonly KEY: string = '7a226d6aaae146cd870ddc0d9307f8a1';

  async getTodayInfo() {
    const date = new Date();
    const YML = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(
      -2,
    )}${('0' + date.getDate()).slice(-2)}`;

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
    data = data.replaceAll('·', ' ');
    data = data.replaceAll('.', '');
    for (let i = 0; i < 10; i++) {
      data = data.replaceAll(`${i}`, '');
    }

    console.log(data);
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
    const date = new Date();
    const YML = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(
      -2,
    )}${('0' + (date.getDate() + 1)).slice(-2)}`;

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
      console.log(products.data, 'tomorrow---');
      data = products.data.mealServiceDietInfo[1].row[0].DDISH_NM;
    } catch (error) {
      return '오늘 급식은 없습니다';
    }

    data = data.replaceAll('<br/>', '\n');
    data = data.replaceAll('·', ' ');
    data = data.replaceAll('.', '');
    for (let i = 0; i < 10; i++) {
      data = data.replaceAll(`${i}`, '');
    }
    return data;
  }

  async postTInfo() {
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
}
