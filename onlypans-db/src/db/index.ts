import { Pool } from 'pg';

const pool = new Pool();

export default {
  oneOrNone: async (sql: string, params?: any[]) => {
    try {
      const result = await pool.query(sql, params);

      if (result.rowCount !== 1) {
        return null;
      }

      return result.rows[0] as Object;
    } catch (error) {
      console.log('Error: ', error);

      throw error;
    }
  },
  all: async (sql: string, params?: any[]) => {
    try {
      const result = await pool.query(sql, params);

      return result.rows as Object[];
    } catch (error) {
      console.log('Error: ', error);

      throw error;
    }
  }
}