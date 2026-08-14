# Session 01 — Checklist (ES6 refresher)

## Purpose

- Make sure students have the modern JavaScript skills required for the course. No finished app code here — small, self-contained exercises only.

What to implement / practice

1. const / let and basic scoping
   - Short code snippets showing values that are reassigned vs constant.
   - Acceptance: explain in a comment why const is used for values not reassigned.

2. Arrow functions, concise bodies and object-literal returns
   - Build small utilities (formatTitle, isHighRated) as functions called from the browser console or a tiny Node script.
   - Acceptance: each function can be invoked and returns the expected primitive (string/boolean/array).

3. Template literals and multi-line templates
   - Create examples that interpolate variables and conditionally include parts.
   - Acceptance: copy output into console and confirm formatting.

4. Destructuring (objects and arrays)
   - Practice extracting properties and nested values.
   - Acceptance: no runtime errors when extracting missing properties (use defaults where relevant).

5. Spread / Rest and shallow copying
   - Use spread to copy arrays/objects and build new ones.
   - Acceptance: original arrays/objects remain unchanged after using spread to build a modified copy.

6. Array methods (map, filter, find, some, sort)
   - Small exercises that transform an array of movie-like objects.
   - Acceptance: functions return expected lengths and values.
