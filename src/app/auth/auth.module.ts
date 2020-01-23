import {NgModule} from "@angular/core";
import {AuthRoutingModule} from "./auth.routing.module";
import {AuthComponent} from "./auth.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        AuthRoutingModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
    ]
})
export class AuthModule {

}
