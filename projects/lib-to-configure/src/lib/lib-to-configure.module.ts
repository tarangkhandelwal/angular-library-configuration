import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import {
  DefaultLibConfiguration,
  LibConfiguration,
  LibConfigurationProvider,
} from './config';
import { LibToConfigureComponent } from './lib-to-configure.component';

@NgModule({
  declarations: [LibToConfigureComponent],
  imports: [CommonModule],
  exports: [LibToConfigureComponent],
})
export class LibToConfigureModule {
  static forRoot(
    libModuleConfiguration: Provider
  ): ModuleWithProviders<LibToConfigureModule> {
    return {
      ngModule: LibToConfigureModule,
      providers: [
        libModuleConfiguration
      ],
    };
  }

  // static forRoot(
  //   libConfiguration: LibToConfigureConfiguration
  // ): ModuleWithProviders {
  //   return {
  //     ngModule: LibToConfigureModule,
  //     providers: [
  //       {
  //         provide: LibToConfigureConfiguration,
  //         useValue: libConfiguration
  //       }
  //     ]
  //   };
  // }
}
