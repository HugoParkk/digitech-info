import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class InfoService {
  private readonly DATA_URL: string =
    'https://open.neis.go.kr/hub/mealServiceDietInfo';
  private readonly KEY: string = '7a226d6aaae146cd870ddc0d9307f8a1';
  async getTodayInfo() {
    const date = new Date();
    const YML: number = date.getFullYear() + date.getMonth() + date.getDate();
    const products = await axios.get(this.DATA_URL, {
      params: {
        Key: this.KEY,
        Type: 'json',
        ATPT_OFCDC_SC_CODE: 'B10',
        SD_SCHUL_CODE: '7010572',
        MMEAL_SC_CODE: '2',
        MLSV_YMD: YML,
      },
    });
    console.log(products.data.mealServiceDietInfo[1].row[0]);
    return products.data;
  }
}
