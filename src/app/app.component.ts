import { Component, OnInit } from "@angular/core";
import { fibonacci } from "./functions/fibonacci";

@Component({
  selector: "app-root",
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <h1>Welcome to {{ title }}!</h1>

      <p>The number is {{ num }}!</p>
      <div class="lds-ring" *ngIf="loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div>
        <input type="text" />
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  public title = "ng8-test";

  public num: number = 0;
  public loading: boolean = false;

  public worker: Worker;

  constructor() {
    this.worker = new Worker("./fibonacci-worker.worker", { type: "module" });
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.loading = true;
    //   this.num = fibonacci(45);
    //   this.loading = false;
    // }, 2000);

    setTimeout(() => {
      this.worker.addEventListener("message", message => {
        console.log("data", message.data);
        this.num = message.data;
        this.loading = false;
      });
      this.worker.postMessage(45);
      this.loading = true;
    });
  }
}
