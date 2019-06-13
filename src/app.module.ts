import { CorreModule } from './core.module';
import { AppComponent } from './app.component';
import { VueModule } from './core';

@VueModule({
    modules: [ CorreModule ],
    providers: [ AppComponent ],
    components: [ AppComponent ],
})
export class AppModule {}