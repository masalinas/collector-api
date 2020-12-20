import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler, AnyObject} from '@loopback/repository';

import config from './collector.datasource.config.json';

function updateConfig(dsConfig: AnyObject) {
  if (process.env.KUBERNETES_SERVICE_HOST) {
    dsConfig.host = process.env.MONGODB_SERVICE_HOST;
    dsConfig.port = +process.env.MONGODB_SERVICE_PORT!;
  }

  return dsConfig;
}

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CollectorDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'collector';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.collector', {optional: true})
    dsConfig: object = config,
  ) {
    super(updateConfig(dsConfig));
  }
}
