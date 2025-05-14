---
sidebar_position: 5
---

# ARM Templates: Deployment Mode

When deploying an Azure ARM template, you must consider the **deployment mode**. This mode determines how Azure Resource Manager handles resources already present in the target scope (usually a Resource Group or Subscription) that are *not* defined in your template.

There are two main deployment modes:

## 1. Incremental Mode

*   **Default Behavior:** This is the **default** deployment mode for ARM templates.
*   **Action:** When you deploy a template in Incremental mode, Azure compares the resources defined in your template with the existing resources in the target scope.
    *   Resources defined in the template are created if they don't exist or updated if they do.
    *   **Resources that are *not* defined in your template but already exist in the target scope are **left unchanged**.**
*   **Example:** If you have a Resource Group containing a Virtual Machine and a SQL Database, and you deploy an ARM template that *only* defines a Storage Account to that same Resource Group in Incremental mode, the Storage Account will be created, but the Virtual Machine and SQL Database will remain exactly as they were.

## 2. Complete Mode

*   **Action:** When you deploy a template in Complete mode, Azure compares the resources defined in your template with the existing resources in the target scope.
    *   Resources defined in the template are created if they don't exist or updated if they do.
    *   **Any resources that are *not* defined in your template but are present in the target scope are **deleted**.**
*   **Use Case:** This mode is typically used when you want your ARM template to represent the **single source of truth** for *all* resources that should exist in that specific scope.
*   **How to Use:** You must **explicitly specify** the deployment mode as 'Complete' during the deployment (e.g., using parameters in the deployment command like `--mode Complete` in Azure CLI).
*   **Warning:** Use Extreme Caution! Deploying in Complete mode can be destructive. As the transcript warns, it can "literally delete every single thing" in your Resource Group (that isn't in the template). Always double-check your template and the target scope before deploying in Complete mode.

Understanding these two modes is critical to controlling the outcome of your ARM template deployments and avoiding unintended modifications or deletions of resources.