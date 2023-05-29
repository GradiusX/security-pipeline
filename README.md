# Security Pipeline Reusable Workflow!

## Example usage

```yaml
name: Security Checker
run-name: Running Security Checker
on:
  push:
    branches: [main]
jobs:
  Security-Pipeline:
    uses: GradiusX/security-pipeline/.github/workflows/pipeline.yml@main
    with:
      # true = do not break pipeline; false = break pipeline
      continue-on-error: false
      # Report only this level and above (info|low|moderate|high|critical)
      severity-level: "critical"
```