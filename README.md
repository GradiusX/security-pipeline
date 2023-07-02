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
        uses: GradiusX/security-pipeline/.github/workflows/pipeline.yml@dev
        with:
            continue-on-error: false
            severity-level: "critical"
            trufflehog-exclusion-list: >
                ^\.git/.*
            defectdojo-url: ${{ vars.DEFECTDOJO_URL }}
        secrets:
            defectdojo-api-key: ${{ secrets.DEFECTDOJO_API_KEY }}
```