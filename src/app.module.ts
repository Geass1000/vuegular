import { CorreModule } from './core.module';
import { AppComponent } from './app.component';
import * as Vuegular from './core';

@Vuegular.VgModule({
    modules: [ CorreModule ],
    providers: [ AppComponent ],
    bootstrap: [ AppComponent ],
})
export class AppModule {}