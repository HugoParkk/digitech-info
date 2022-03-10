import { Injectable } from '@nestjs/common';
import axios from 'axios';

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
    const products = await axios.get(this.DATA_URL, {
      params: {
        Key: this.KEY,
        Type: 'json',
        ATPT_OFCDC_SC_CODE: 'B10',
        SD_SCHUL_CODE: '7010572',
        MLSV_YMD: YML,
      },
    });
    let data = products.data.mealServiceDietInfo[1].row[0].DDISH_NM;
    data = data.replaceAll('<br/>', '\n');
    data = data.replaceAll('·', ' ');
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
}
