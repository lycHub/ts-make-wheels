type CommonOptions = { [key: string]: any };

export class Options {
  private defaultOptions: CommonOptions;
  constructor(options: CommonOptions) {
    this.defaultOptions = options;
  }
  
  
  // 合并默认配置
  merge<T>(target: T): T {
    return Object.assign({}, this.defaultOptions, target);
  }
}