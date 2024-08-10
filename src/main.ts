import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '@angular/compiler';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
// if (!environment.BUILD_FUNCTION_CALLED) {
//   environment.Production_Build_date=new Date();
//   console.log(environment.Production_Build_date);
//   environment.BUILD_FUNCTION_CALLED = true;
// }
export const anv_pro=environment.be_url;
console.log(anv_pro);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
