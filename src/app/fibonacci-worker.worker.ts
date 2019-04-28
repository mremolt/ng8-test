/// <reference lib="webworker" />
import { fibonacci } from "./functions/fibonacci";

addEventListener("message", ({ data }) => {
  postMessage(fibonacci(data));
});
