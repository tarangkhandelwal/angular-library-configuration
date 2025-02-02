import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  LibConfigurationProvider,
  LibToConfigureConfiguration,
  LibToConfigureModule,
} from 'lib-to-configure';
import { AppComponent } from './app.component';

@Injectable({ providedIn: 'root' })
export class ConfigurationStore {
  private internalConfig: LibToConfigureConfiguration = { some: 'Fallback' };

  setConfig(config: LibToConfigureConfiguration) {
    this.internalConfig = config;
  }

  getConfig() {
    return this.internalConfig;
  }
}

export function initApp(configurationStore: ConfigurationStore, configProvider: LibConfigurationProvider) {
  return () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        configurationStore.setConfig({ some: 'Fabian' });
        console.log(configProvider, 'config provider inside app initializer');
        resolve();
      }, 2000);
    });
  };
}

@Injectable()
export class ConfigFromApp implements LibConfigurationProvider {
  constructor(private configStore: ConfigurationStore) {}

  get config(): LibToConfigureConfiguration {
    return this.configStore.getConfig();
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    LibToConfigureModule.forRoot({
        provide: LibConfigurationProvider,
        useClass: ConfigFromApp,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [ConfigurationStore, LibConfigurationProvider],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
