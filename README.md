# Security Pipeline Reusable Workflow

## Example usage

```yaml
name: Security Pipeline
run-name: Running Security Pipeline Checks
on:
  push:
    branches: [main]
jobs:
  Run-Yarn-Audit:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository code
        uses: actions/checkout@v3
      - name: Running Yarn Audit on Repo
        id: yarn_audit
        # False = break pipeline if vulns are found; True = continue irrespectively
        continue-on-error: false
        # Update tag to latest version
        uses: GradiusX/yarn-audit-github-action@v1.5
        with:
          # Report only this level and above (info|low|moderate|high|critical)
          severity-level: 'critical'
```