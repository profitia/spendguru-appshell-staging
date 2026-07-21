# SpendGuru Environment Strategy

## Development

- local
- feature branches
- development database
- no automatic external deployment

## Staging

- `main`
- Render staging service
- staging database
- auto-deploy after approved merge

## Production

- `production`
- separate Render production service
- production database
- promotion from validated `main`

## Promotion Rules

- No direct push to production.
- No force push.
- No database sharing between staging and production.
- No promotion by manually copying code.
- The same commit is promoted from staging to production.