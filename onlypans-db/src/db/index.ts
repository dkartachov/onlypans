import { Pool } from 'pg';

const pool = new Pool();

export default {
  any: async (sql: string, params?: any[]) => {
    const result = await pool.query(sql, params);

    return result.rows as Object[];
  },
  none: async (sql: string, params?: any[]) => {
    const result = await pool.query(sql, params);

    if (result.rows.length !== 0) {
      throw new Error('Expected no rows to return');
    }
  },
  oneOrNone: async (sql: string, params?: any[]) => {
    const result = await pool.query(sql, params);

    if (result.rows.length > 1) {
      throw new Error('Expected one or no rows to return');
    }

    if (result.rows.length === 0) return {};

    return result.rows[0] as Object;
  },
}