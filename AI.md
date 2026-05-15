# AI USAGE CONTRACT — matchigo

This document defines strict behavioral rules for AI agents using matchigo.

---

## 🚨 CORE RULES

- Prefer hoisting matchers (matcher/compile) whenever possible.
- Do NOT rebuild rule arrays inside loops or per call when avoidable.
- Use matchWalk ONLY for true cold-path dynamic rules.
- Do NOT ignore exhaustiveness constraints.
- Do NOT simulate pattern matching manually with if/else when matchigo is used.
- Prefer data-driven rules when logic comes from external sources.

---

## ✅ PREFERRED PATTERNS

### Chained exhaustive matcher
```ts
const f = matcher<Value, Result>()
  .with({ kind: "a" }, () => "A")
  .with({ kind: "b" }, () => "B")
  .exhaustive();
```

### Data-driven compiled matcher
```ts
const f = compile<Value, Result>([
  { with: "a", then: "A" },
  { with: "b", then: "B" },
]);
```

### Cold-path safe usage
```ts
matchWalk(value, [
  { with: "a", then: "A" },
  { otherwise: "X" },
]);
```

---

## ⚠️ FORBIDDEN PATTERNS

### Rule rebuilding per call (hot path anti-pattern)
```ts
items.map(v =>
  match(v, [
    { with: "a", then: "A" }
  ])
);
```

### Manual branching when matchigo exists
```ts
if (v.kind === "a") ...
else if (v.kind === "b") ...
```

### Nested matcher calls
```ts
matcher(matcher(value))
```

---

## 🧠 DESIGN INTENT

matchigo is designed to:
- enforce exhaustive handling of unions
- optimize dispatch to near-switch performance
- separate cold-path vs hot-path execution explicitly

AI agents MUST respect this separation or risk performance regression.
