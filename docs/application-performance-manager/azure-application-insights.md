---
sidebar_position: 1
---

# Azure Application Insights

Azure Application Insights is a comprehensive Application Performance Management (APM) service for developers and DevOps professionals. It's part of **Azure Monitor** and is used to monitor your live applications, automatically detect performance anomalies, and help you understand what users actually do with your app.

## How Data is Collected

Telemetry data from your application is collected and sent to your Application Insights resource in Azure Monitor using a few primary methods:

1.  **Application Insights SDK (Libraries):** You install a small library (SDK) within your application code. This SDK is responsible for collecting telemetry data and sending it securely (usually over Port 443) to Azure Monitor. This is the standard method for custom application code.
2.  **Agents/Auto-instrumentation:** For certain environments (like JVM, .NET applications), you can install an agent on the host server that monitors your application without requiring code changes.
3.  **Built-in for Azure App Service:** Azure App Service has a pre-built agent that can be easily enabled with a click of a button in the portal, providing code-free instrumentation for many scenarios.

## Telemetry Types

Application Insights collects various types of telemetry data to give you insights into your application's behavior and performance:

*   **Requests:** Information about HTTP requests received by your web application (response time, success rate, status code, etc.).
*   **Dependency Calls:** Data about calls your application makes to external services like databases, REST APIs, Azure Storage, etc. (duration, success/failure).
*   **Exceptions:** Details about unhandled exceptions or errors occurring in your application code.
*   **Performance Traces:** Trace logs emitted by your application code (e.g., using logging frameworks) to provide context about specific operations.
*   **Custom Events & Metrics:** Telemetry that you explicitly log from your application code to track specific business events or metric values relevant to your application.

## Azure Monitor

Collecting all this telemetry into a centralized location like Azure Monitor (which Application Insights uses) provides two major benefits:

1.  **Search and Analysis:**
    *   You can query and make sense of the vast amount of collected data.
    *   Azure Monitor uses the **Kusto Query Language (KQL)** for querying log data.
    *   Application Insights provides an "Analytics" or "Logs" blade where you can write custom KQL queries.
    *   Many **pre-built queries** are available out-of-the-box to quickly answer common questions about performance, failures, and usage.
2.  **Action and Alerting:**
    *   You can create **alerts** based on the collected data.
    *   Alerts trigger when specific conditions or thresholds are met (e.g., failure rate exceeds 5%, average response time is above 1 second).
    *   This allows you to be proactively notified of potential issues.

## Linking Data to Your Resource

To ensure the telemetry from your application goes to the correct Application Insights resource in Azure, you need to configure your SDK or agent with an identifier from that resource.

*   **Instrumentation Key:** A unique GUID assigned to each Application Insights resource. It's historically used by SDKs to route telemetry.
*   **Connection String:** A newer and often preferred method that provides more flexibility and security.

This identifier is sensitive and should be treated as a secret (e.g., stored in Azure Key Vault or App Configuration) because anyone with the key/string could send telemetry to your resource.

## Key Features in the Portal

The Azure portal provides rich visualizations and tools for exploring your Application Insights data:

*   **Overview Dashboard:** Provides a summary of key metrics (requests, response time, failure rate).
    <div>
      <img src={require('@site/static/img/application-performance-manager/application-performance-manager-overview-dashboard.png').default} alt="application performance manager overview dashboard" />
    </div>

*   **Application Map:** Visualizes the architecture of your application and its dependencies, showing performance and failure rates for each component.
    <div>
      <img src={require('@site/static/img/application-performance-manager/application-performance-manager-application-map.png').default} alt="application performance manager application map" />
    </div>

*   **Failures:** Allows drilling into exception details, dependency failures, and request failures to diagnose root causes.
    <div>
      <img src={require('@site/static/img/application-performance-manager/application-performance-manager-failures.png').default} alt="application performance manager failures" />
    </div>

*   **Performance:** Shows the slowest requests and dependencies, helping identify bottlenecks.
    <div>
      <img src={require('@site/static/img/application-performance-manager/application-performance-manager-performance.png').default} alt="application performance manager performance" />
    </div>

*   **Logs (Analytics):** Where you write and run KQL queries.
    <div>
      <img src={require('@site/static/img/application-performance-manager/application-performance-manager-logs.png').default} alt="application performance manager logs" />
    </div>

*   **Availability:** Configure and view results of availability tests.
    <div>
      <img src={require('@site/static/img/application-performance-manager/application-performance-manager-availability.png').default} alt="application performance manager availability" />
    </div>

## Availability Tests

<div>
  <img src={require('@site/static/img/application-performance-manager/application-performance-manager-availability-test.png').default} alt="application performance manager availability test" />
</div>

*   **Purpose:** To check the **availability and responsiveness** of your application's endpoints from various locations around the world.
*   **Mechanism:** Application Insights sends automated **URL ping tests** (HTTP requests) to your configured application endpoints (e.g., your homepage or a dedicated `/health` endpoint).
*   **Configuration:** You specify the URL to test, the test frequency (e.g., every 5 minutes), and the test locations (from where in the world the pings originate).
*   **Success Criteria:** Define what constitutes a successful test (e.g., receiving an HTTP 200 OK status code within a certain timeout, optionally checking for specific content in the response).
*   **Alerting:** You can configure alerts to be notified immediately if tests fail from one or more locations, indicating potential availability issues.

Availability tests are a crucial way to proactively monitor the external health of your application from the end-user's perspective.