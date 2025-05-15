---
sidebar_position: 12
---

# Azure App Service Autoscale

Autoscale is a powerful feature in Azure that allows you to automatically adjust the number of compute instances for your application based on demand or a schedule. While incredibly useful for handling fluctuating loads, it's important to understand what it does and does not solve.

## Understanding Autoscale

*   **What it helps with:** Autoscale is excellent for handling **high traffic volume**. It allows you to spin up additional instances when the existing servers are overloaded with requests (e.g., hitting limits on TCP sockets or concurrent connections). Adding more instances distributes the incoming load.
*   **What it doesn't solve:** Autoscale **does not fix inefficient code or under-spec'd instances**. If your application is resource-intensive and runs slowly on a weak machine, simply adding more weak machines won't necessarily improve performance significantly for individual requests. You need to consider both scaling *out* (adding instances) and scaling *up* (using more powerful instances/tiers).

## Autoscale as an Azure Resource

Autoscale in Azure is actually a separate resource itself, not directly tied to the service it scales. It resides under the `Microsoft.Insights` resource provider.

*   This means the same Autoscale resource can be configured to scale various Azure services, including:
    *   Azure App Service Plans (most common for web apps)
    *   Virtual Machines Scale Sets
    *   API Management
    *   And others that support scaling.

## Autoscale Rules and Conditions

You configure Autoscale by defining rules based on specific conditions. There are two primary types of conditions:

1.  **Scale based on a Metric:**
    *   **How it works:** Decisions are made based on the value of a performance metric collected from the target resource (or even another resource).
    *   **Common Metrics for App Service:** CPU percentage, HTTP queue length, Data In/Out, etc.
    *   **Configuration:** You define a metric, an operator (e.g., `>` or `<`), a threshold value (e.g., 70%), a duration over which the metric is evaluated, and the action to take (e.g., increase instance count by 2).

2.  **Scale to a specific Instance Count (based on Schedule):**
    *   **How it works:** You set a specific number of instances that should be active during defined times or on certain days of the week.
    *   **Use Case:** Ideal for predictable traffic patterns, such as scaling up for peak business hours or known seasonal spikes (like holidays) regardless of current metrics.

<div>
  <img src={require('@site/static/img/develop-azure-compute-solutions/scale-out.png').default} alt="scale out" />
</div>

### Combining Rules

*   You **can** define multiple rules based on different conditions (both metric and schedule-based) within a single Autoscale setting.
*   Multiple conditions are treated with **OR logic**. If *any* of the configured rules trigger, the scale action is taken.

## Key Configuration Aspects

When configuring Autoscale, you'll define:

*   **Resource Group and Name:** Like any Azure resource.
*   **Scale Out/In Settings:** This is where you configure the rules.
*   **Scale Condition Type:** Choose between scaling based on a metric or a specific instance count (schedule).
*   **Metric Source:** While typically the resource you're scaling (e.g., the App Service Plan), it *can* technically be a metric from a different resource, though less common in practice.
    <div>
      <img src={require('@site/static/img/develop-azure-compute-solutions/metric-source.png').default} alt="metric source" />
    </div>
*   **Metric Name:** Select the specific metric to monitor (e.g., CPU Percentage).
    <div>
      <img src={require('@site/static/img/develop-azure-compute-solutions/metric-name.png').default} alt="metric name" />
    </div>
*   **Threshold, Operator, Duration:** Define when the rule triggers (e.g., CPU > 70% for 10 minutes).
*   **Scale Action:** How many instances to add or remove.
*   **Cool-down Time:** A period (e.g., 5–10 minutes) after a scale operation during which no new scale actions are triggered. This prevents rapid, potentially disruptive scaling oscillations while the environment adjusts.

Configuring Autoscale correctly, considering both metrics and potential schedules, alongside appropriate instance sizes, is essential for building resilient and cost-effective applications on App Service that can handle varying loads.