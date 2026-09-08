# JSON Contract Inspector

Inspect a JSON value and report its top-level fields and primitive value types.

This is an OverKill Hill FoundRy source package for a software capability. It is a reviewable structural draft, not proof of behavior or permission to publish.

## Run the starter

See [app/README.md](app/README.md) for the dependency-free browser instructions.

## Audience

OverKill Hill builders

## Inputs

A JSON value entered in the browser starter.

## Outputs

A JSON report of validJson and top-level field types.

## Acceptance

Valid objects report field types; arrays and primitives report their shape; malformed JSON reports validJson false; hostile text cannot inject markup.
