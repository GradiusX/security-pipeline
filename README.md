# Security Pipeline Reusable Workflow v1.1

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
        uses: GradiusX/security-pipeline/.github/workflows/pipeline.yml@v1.1
        with:
            continue-on-error: false
            severity-level: "critical"
```