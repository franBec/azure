---
sidebar_position: 13
---

# Azure Functions

Azure Functions is the **serverless**, **event-driven** compute offering on Azure. It allows you to run small pieces of code (functions) without managing infrastructure.

## What is Serverless?

In the context of Azure Functions (and other serverless services), "serverless" doesn't mean no servers are involved; it means **you don't have to manage the servers**.

*   The platform automatically handles the underlying hardware, operating system patching, scaling, and infrastructure maintenance.
*   You only focus on writing your application code.
*   Unlike Azure App Service where you still select VM specs and pricing tiers tied to compute size, with Functions (especially the Consumption plan), you abstract away the server details completely.
*   Scaling is handled automatically by the platform based on incoming events or load.

## What is Event-Driven?

Azure Functions are designed for **event-driven applications**, meaning your code is triggered and executed in response to specific events.

*   An event can be anything that happens such as:
    *   A file being uploaded to Azure Blob Storage.
    *   A new record being added to a database.
    *   An incoming HTTP request (API call).
    *   A message arriving in a queue.
    *   A timer/schedule trigger.
*   Functions are perfect for executing specific logic or tasks precisely when an event occurs, without requiring continuously running infrastructure.

## Technical Aspects of Serverless

From a more technical perspective, Azure Functions (particularly on the Consumption plan) embodies serverless characteristics:

*   **Consumption-Based Billing:** You typically pay only for the compute time consumed when your function is executing (and potentially for execution count).
*   **No Server Management:** Abstract away all server concerns.
*   **Automatic Scaling:** The platform scales your function instances automatically based on the event load.

## Hosting Plans

Azure Functions offers different hosting plans, affecting billing, features, and scaling behavior:

| Feature              | Consumption Plan                                                             | Premium Plan                                                            | Dedicated (App Service Plan)                                       |
|----------------------|------------------------------------------------------------------------------|-------------------------------------------------------------------------|--------------------------------------------------------------------|
| **Billing**          | Consumption (Pay per execution/time)                                         | Predictable Monthly + small consumption                                 | Based on ASP Size/Scale                                            |
| **Scaling**          | Auto scale out/in (scales to zero when idle)                                 | Auto scale out (minimum pre-warmed instances)                           | Inherits ASP scaling (manual or Autoscale), never scales to zero   |
| **Max Timeout**      | 10 minutes per call                                                          | No Timeout                                                              | No Timeout (subject to ASP settings)                               |
| **VNet Integration** | No (direct for function instances)                                           | Yes                                                                     | Yes (Inherits from ASP)                                            |
| **Cold Starts**      | Yes                                                                          | Significantly Reduced/Eliminated                                        | No                                                                 |
| **Use Cases**        | Intermittent/Event-driven workloads, Cost-Effective, Tolerant of Cold Starts | Short but frequent executions needing low latency, Requires VNet access | Existing/underutilized ASP, Needs Function App in a dedicated VNet |

## Resource Hierarchy

The structure for Azure Functions includes:

<div>
  <img src={require('@site/static/img/azure-compute-solutions/azure-functions-resource-hierarchy.png').default} alt="azure functions resource hierarchy" />
</div>

*   **App Service Plan:** The underlying hosting environment (either managed by Azure for Consumption/Premium, or one you explicitly create and manage for the Dedicated plan). Network and scaling configuration often tie back to the plan.
*   **Function App:** A logical container resource within which you define individual functions. It represents the overall application hosting your functions.
*   **Functions:** The individual pieces of code that events trigger. A single Function App can contain multiple individual functions, often used to group related functions together for organization.

Understanding the various hosting plans and their trade-offs is crucial for choosing the right plan for your serverless workloads on Azure.