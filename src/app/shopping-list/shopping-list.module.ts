import {NgModule} from "@angular/core";
import {ShoppingListRoutingModule} from "./shopping-list.routing.module";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingListEditComponent} from "./shopping-list-edit/shopping-list-edit.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {LoggingService} from "../logging.service";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        ShoppingListRoutingModule,
        ReactiveFormsModule
    ]
    //providers: [LoggingService]
})
export class ShoppingListModule{}
