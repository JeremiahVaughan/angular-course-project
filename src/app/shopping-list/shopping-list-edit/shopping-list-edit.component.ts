import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html',
    styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

    @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
    @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
    editShoppingListForm: FormGroup;
    editItemSubscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(
        private shoppingListService: ShoppingListService,
        private store: Store<{ shoppingList: {ingredients: Ingredient[]}}>
    ) {
    }

    ngOnInit() {
        this.editShoppingListForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            amount: new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
        });

        this.editItemSubscription = this.shoppingListService.startedEditing
            .subscribe(
                (index: number) => {
                    this.editMode = true;
                    this.editedItemIndex = index;
                    this.editedItem = this.shoppingListService.getIngredient(index);
                    this.editShoppingListForm.setValue({
                        name: this.editedItem.name,
                        amount: this.editedItem.amount
                    });
                }
            );
    }

    ngOnDestroy(): void {
        this.editItemSubscription.unsubscribe();
    }

    onSubmit() {
        const ingredientName = this.nameInputRef.nativeElement.value;
        const ingredientAmount = this.amountInputRef.nativeElement.value;
        const newIngredient = new Ingredient(ingredientName, ingredientAmount);

        if (this.editMode) {
            //this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
            this.store.dispatch(new ShoppingListActions.UpdateIngredient({
                index: this.editedItemIndex,
                ingredient: newIngredient})
            );
        } else {
            //this.shoppingListService.addIngredient(newIngredient);
            this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
        }
        this.clear();
    }

    onClear() {
        this.clear();
    }

    clear() {
        this.editShoppingListForm.reset();
        this.editMode = false;
    }

    onDelete() {
        //this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
        this.clear();
    }
}
