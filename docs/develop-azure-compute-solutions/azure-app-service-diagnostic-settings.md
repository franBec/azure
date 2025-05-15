---
sidebar_position: 10
---

# Azure App Service Diagnostic Settings

Azure App Service, like most Azure resources, generates various logs and metrics. However, you don't have direct access to these unless you configure **Diagnostic Settings** to export them to a specific destination. Diagnostic Settings allow you to route these *resource-specific logs* for analysis, storage, or streaming.

## Destinations for Logs

You can configure Diagnostic Settings to send App Service logs and metrics to one or more of the following destinations:

1.  **Azure Log Analytics:** Best suited for interactive **querying** of logs, creating **alerts** based on log data, and building dashboards for monitoring.
2.  **Azure Storage Account:** Primarily used for **archival** and long-term retention of logs. It's a cost-effective way to store large volumes of historical log data.
3.  **Azure Event Hubs:** Designed for **streaming** logs to other applications or systems for further processing, analysis, or integration (e.g., sending logs to a third-party SIEM system like Splunk).

## Azure App Service Specific Logs

Within the Diagnostic Settings for an Azure App Service resource, you can select different categories of logs to export. Common categories include:

*   **Application Logging:** Log messages generated directly by your application code (requires enabling application logging within the App Service configuration).
*   **Web Server Logging:** Raw HTTP request data processed by the underlying web server (IIS on Windows, Nginx/Apache on Linux).
*   **Detailed Error Logging:** Provides more specific information about HTTP errors encountered by your application.
*   **Failed Request Tracing:** Detailed tracing of failed requests, useful for diagnosing issues.
*   **Deployment Logging:** Logs related to the process of deploying your application to the App Service.

## Configuration
You configure Diagnostic Settings for an App Service within its blade in the Azure portal. You add a diagnostic setting, choose which categories of logs you want to collect, and then specify one or more of the supported destinations (Log Analytics, Storage Account, Event Hubs).

<div>
  <img src={require('@site/static/img/develop-azure-compute-solutions/azure-app-service-diagnostic-settings-diagnostic-setting.png').default} alt="azure app service diagnostic settings diagnostic setting" />
</div>

Configuring Diagnostic Settings is crucial for gaining visibility into the behavior, performance, and issues within your Azure App Services, enabling effective monitoring and troubleshooting.