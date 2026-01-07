export interface QueryHandler<Q, R> {
  execute(query: Q): Promise<R>;
}

export class QueryBus {
  private handlers = new Map<string, QueryHandler<any, any>>();

  register<Q, R>(name: string, handler: QueryHandler<Q, R>) {
    this.handlers.set(name, handler);
  }

  async execute<Q, R>(name: string, query: Q): Promise<R> {
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(`No handler for query ${name}`);
    }
    return handler.execute(query);
  }
}
