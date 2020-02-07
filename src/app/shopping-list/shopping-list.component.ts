import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Observable, Subscription} from 'rxjs';
import {LoggingService} from "../logging.service";
import {Store} from "@ngrx/store";
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ ingredients: Ingredient[]}>;
    private ingredientsChangeSubscription: Subscription;

    constructor(
        private shoppingListService: ShoppingListService,
        private loggingService: LoggingService,
        private store: Store<fromShoppingList.AppState>
    ) {
    }

    ngOnInit() {
        this.ingredients = this.store.select('shoppingList')
        // this.ingredients = this.shoppingListService.getIngredients();
        // this.ingredientsChangeSubscription = this.shoppingListService.ingredientsChanged
        //     .subscribe(
        //         (ingredients: Ingredient[]) => {
        //             this.ingredients = ingredients;
        //         }
        //     );
        this.loggingService.printLog('Hello from ShoppingListComponent nginit');
    }

    ngOnDestroy(): void {
        // this.ingredientsChangeSubscription.unsubscribe();
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }
}
