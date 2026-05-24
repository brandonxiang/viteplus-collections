import dayjs from 'dayjs';
import knex, { Knex } from 'knex';
import { config } from '../config/index.js';

export const KnexInstance = knex({
  client: 'mysql',
  connection: config.database,
});

export default class BasicModel<T extends Record<string, any>> {
  private builder: Knex.QueryBuilder;
  protected knex = KnexInstance;

  constructor(table: string) {
    this.builder = this.knex<T>(table);
  }

  get queryBuilder() {
    return this.builder.clone();
  }

  async query(condition: Partial<T>): Promise<T[]> {
    return this.queryBuilder.where(condition).orderBy('id', 'desc').select('*');
  }

  async queryAll(): Promise<T[]> {
    return this.queryBuilder.select('*').orderBy('id', 'desc');
  }

  async insert(entity: Partial<T>) {
    return this.queryBuilder.insert({
      ...entity,
      create_time: Math.floor(dayjs().unix()),
    });
  }

  async insertBatch(entityList: Partial<T>[]) {
    return this.queryBuilder.insert(
      entityList.map((item) => ({
        ...item,
        create_time: Math.floor(dayjs().unix()),
      })),
    );
  }

  async delete(condition: Partial<T>) {
    return this.queryBuilder.where(condition).delete();
  }

  async update(condition: Partial<T>, entity: Partial<T>) {
    return this.queryBuilder.where(condition).update({
      ...entity,
      update_time: Math.floor(dayjs().unix()),
    });
  }
}
