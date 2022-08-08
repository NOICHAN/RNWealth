import axios from 'axios';

export class Api {
  static async getAllAccount(config) {
    try {
      const { data } = await axios.get('account', config);
      return data;
    } catch (error) {
      throw new Error(`[api][getAllAccount] error : ${error.message}`);
    }
  }

  static async getAllIncomeItem(config) {
    try {
      const { data } = await axios.get('income-item', config);
      return data;
    } catch (error) {
      throw new Error(`[api][getAllIncomeItem] error : ${error.message}`);
    }
  }

  static async getAllExpenditureItem(config) {
    try {
      const { data } = await axios.get('expenditure-item', config);
      return data;
    } catch (error) {
      throw new Error(`[api][getAllExpenditureItem] error : ${error.message}`);
    }
  }

  static async getBalanceSheet(config) {
    try {
      const { data } = await axios.get('balance-sheet', config);
      return data;
    } catch (error) {
      throw new Error(`[api][getBalanceSheet] error : ${error.message}`);
    }
  }
}

export default { Api };
