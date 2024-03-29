# Security Pipeline Reusable Workflow

## Example usage

```yaml
name: Security Checker
run-name: Running Security Checker
on:
    workflow_dispatch:
    pull_request:
        branches: [main]
jobs:
    Security-Pipeline:
        uses: GradiusX/security-pipeline/.github/workflows/pipeline.yml@main
        with:
            continue-on-error: false
            severity-level: "critical"
            secrets-exclusion-list: >
                ^\.git/.*
                ^secrets_test.yaml$
            defectdojo-url: ${{ vars.DEFECTDOJO_URL }}
        secrets:
            defectdojo-api-key: ${{ secrets.DEFECTDOJO_API_KEY }}
```