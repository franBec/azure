---
sidebar_position: 4
---

# ARM Templates: Multi-tiered Templates

While you can define many resources within a single ARM template, it is considered best practice, especially for complex deployments, to break down your template into smaller, more manageable files. This is where the concept of **multi-tiered** or **nested** ARM templates comes in.

## What is a Multi-tiered/Nested Template?

The idea is to create a **parent template** that orchestrates the deployment by calling one or more **nested templates** (sometimes called child templates).

*   Each nested template typically defines a specific set of related resources or even just a single resource.
*   The parent template defines the overall deployment structure and invokes the nested templates.

## Why Use Nested Templates?

*   **Modularity:** Breaks down large, complex deployments into smaller, reusable modules.
*   **Readability:** Smaller template files are easier to understand and maintain.
*   **Reusability:** Nested templates can be reused across different parent templates or projects.
*   **Organization:** Helps organize your infrastructure code logically.

## Example

Instead of having one large ARM template to deploy a multi-component application (like a Virtual Machine, an App Service, and a SQL Database), you would structure it as follows:

<div>
  <img src={require('@site/static/img/develop-azure-compute-solutions/arm-templates-multi-tiered-template.png').default} alt="arm templates multi tiered template" />
</div>

1.  Create a separate ARM template for the Virtual Machine.
2.  Create a separate ARM template for the App Service.
3.  Create a separate ARM template for the SQL Database.
4.  Create a **parent ARM template** that includes definitions to deploy the VM template, the App Service template, and the SQL Database template in sequence or parallel as needed.

This modular approach improves the manageability and scalability of your infrastructure code.