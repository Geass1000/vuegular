import { HomeComponent } from './home.component';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import * as Vuegular from '../core';

@Vuegular.VgModule({
    modules: [ CoreModule ],
    providers: [ AppService ],
    components: [ HomeComponent, AppComponent ],
    bootstrap: [ AppComponent ],
})
export class AppModule {}