import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "src/app/services/category/category.service";

import { FlatTreeControl } from "@angular/cdk/tree";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";
import {
  CrumbTrailComponent,
  Icon
} from "../crumb-trail/crumb-trail.component";
import { Inventory } from "src/app/models/inventory/inventory";
import { InventoryService } from "src/app/services/inventory/inventory.service";
import { v4 } from "uuid";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  constructor(
    private cs: CategoryService,
    private is: InventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  name: string;
  inventoryUuid: string;
  inventory: Inventory;

  async ngOnInit() {
    // Get Inventory UUID
    this.inventoryUuid = this.route.snapshot.params.inventoryUuid;

    await this.is.ready;
    this.inventory = this.is.inventories[this.inventoryUuid];

    CrumbTrailComponent.crumbs = [
      {
        icon: Icon.Inventory,
        title: this.inventory.name,
        routerLink: `/inventories`
      },
      {
        icon: Icon.Category,
        title: "Categories"
      }
    ];
  }

  public async createCategory() {
    await this.cs.ready;
    // TODO remove this log
    const randomness = Math.random() * 1000;
    await this.cs.createCategory(
      "child_" + randomness,
      "root",
      this.inventoryUuid
    );
  }

  public async createChild() {
    await this.cs.ready;
    // TODO remove this log
    const randomness = Math.random() * 1000;
    await this.cs.createCategory(
      "child_" + randomness,
      "5b40ca41-2783-4c2d-89b7-41c7c1dc498f",
      this.inventoryUuid
    );
  }

  public logCategories() {
    console.log("This is the categoriesComponent");
    console.log(JSON.stringify(this.cs.categories));
  }
}
