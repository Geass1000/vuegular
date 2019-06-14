import { VgApp } from './core/vg.app';
import { AppComponent } from './example/app.component';
import { DIContainer } from './core/di/di-container';
import { AppModule } from './example/app.module';

VgApp.getInstance().bootstrapModule(AppModule);