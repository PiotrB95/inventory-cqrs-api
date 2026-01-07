export interface CommandHandler<C, R = void> {
  execute(command: C): Promise<R>;
}

export class CommandBus {
  private handlers = new Map<string, CommandHandler<any, any>>();

  register<C, R>(name: string, handler: CommandHandler<C, R>) {
    this.handlers.set(name, handler);
  }

  async execute<C, R>(name: string, command: C): Promise<R> {
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(`No handler for command ${name}`);
    }
    return handler.execute(command);
  }
}
