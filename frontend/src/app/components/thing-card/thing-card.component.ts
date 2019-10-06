import { Component, OnInit, Input } from "@angular/core";
import { Thing } from "../../models/thing/thing";
import { StockService } from "../../services/stock/stock.service";
import { Stock } from "../../models/stock/stock";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-thing-card",
  templateUrl: "./thing-card.component.html",
  styleUrls: ["./thing-card.component.scss"]
})
export class ThingCardComponent implements OnInit {
  oof = false;
  unauthorized = false;
  notFound = false;
  loading = true;

  @Input()
  thing: Thing;

  stocks: Stock[];

  inventoryId: number;

  constructor(public ss: StockService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.getInventoryId();
    // await this.setStocks();
  }

  getInventoryId(): void {
    this.inventoryId = this.route.snapshot.params.inventoryId;
  }

  async setStocks(): Promise<void> {
    try {
      this.stocks = await this.ss.getStocks(this.inventoryId, this.thing.uuid);
      this.loading = false;
    } catch (error) {
      this.oof = true;

      console.log(
        "Unknown error in setStocks [ThingCardComponent] while creating"
      );
    }
  }
}
