// Type-perf regression guard: tsc must check a 20-rule chain on an open
// object type in under 1 s. Measures tsc's own "Check time" so process
// startup and lib parsing don't count.

import { expect, test } from "bun:test";
import { fileURLToPath } from "node:url";

const tscPath = fileURLToPath(new URL("../node_modules/typescript/lib/tsc.js", import.meta.url));
const fixture = fileURLToPath(new URL("./fixtures/open-object-chain.ts", import.meta.url));

test("20 .with() on an open object type type-check in under 1 s", () => {
  const proc = Bun.spawnSync([
    process.execPath,
    tscPath,
    "--ignoreConfig",
    "--noEmit",
    "--strict",
    "--skipLibCheck",
    "--allowImportingTsExtensions",
    "--moduleResolution",
    "bundler",
    "--module",
    "esnext",
    "--target",
    "esnext",
    "--extendedDiagnostics",
    fixture,
  ]);
  const out = proc.stdout.toString();
  expect(proc.exitCode, out).toBe(0);
  const check = /Check time:\s+([\d.]+)s/.exec(out);
  expect(check, out).not.toBeNull();
  expect(Number(check![1])).toBeLessThan(1);
}, 120_000);
