// Type-perf fixture checked by tests/typeperf.test.ts: 20 `.with()` on an open
// object type. Each rule removes nothing from Rem, so DeepExclude must hand
// back Rem unchanged or tsc check time grows ~4x per rule.

import { P, matcher } from "../../src/index.ts";

interface Ctx {
  method: string;
  parts: string[];
}

export const route = matcher<Ctx, string>()
  .with({ method: "GET", parts: P.tuple("api", "a", P.string) }, () => "0")
  .with({ method: "GET", parts: P.tuple("api", "b", P.string) }, () => "1")
  .with({ method: "GET", parts: P.tuple("api", "c", P.string) }, () => "2")
  .with({ method: "GET", parts: P.tuple("api", "d", P.string) }, () => "3")
  .with({ method: "GET", parts: P.tuple("api", "e", P.string) }, () => "4")
  .with({ method: "POST", parts: P.tuple("api", "f") }, () => "5")
  .with({ method: "POST", parts: P.tuple("api", "g", P.string, "x") }, () => "6")
  .with({ method: "PUT", parts: P.tuple("api", "h", P.string) }, () => "7")
  .with({ method: "GET", parts: P.tuple("api", "i", P.string) }, () => "8")
  .with({ method: "GET", parts: P.tuple("api", "j", P.string) }, () => "9")
  .with({ method: "GET", parts: P.tuple("api", "k", P.string) }, () => "10")
  .with({ method: "GET", parts: P.tuple("api", "l", P.string) }, () => "11")
  .with({ method: "GET", parts: P.tuple("api", "m", P.string) }, () => "12")
  .with({ method: "DELETE", parts: P.tuple("api", "n", P.string) }, () => "13")
  .with({ method: "GET", parts: P.tuple("api", "o", P.string) }, () => "14")
  .with({ method: "GET", parts: P.tuple("api", "p", P.string) }, () => "15")
  .with({ method: "GET", parts: P.tuple("api", "q", P.string) }, () => "16")
  .with({ method: "GET", parts: P.tuple("api", "r", P.string) }, () => "17")
  .with({ method: "GET", parts: P.tuple("api", "s", P.string) }, () => "18")
  .with({ method: "GET", parts: P.tuple("api", "t", P.string) }, () => "19")
  .otherwise(() => "x");
