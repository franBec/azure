---
sidebar_position: 14
---

# Azure Functions Triggers and Bindings

Triggers and bindings are key concepts in Azure Functions that allow you to connect your function code to other Azure services and external systems declaratively, reducing the amount of boilerplate code you need to write.

<div>
  <img src={require('@site/static/img/azure-compute-solutions/azure-functions-triggers-and-bindings.png').default} alt="azure functions triggers and bindings" />
</div>

## Triggers

*   A **trigger** is the event that causes a function to run.
*   Every function must have exactly **one** trigger.
*   Triggers define how a function is invoked.
*   Examples of triggers include:
    *   HTTP request (HTTP Trigger)
    *   Message arrival in a Service Bus Queue or Topic (Service Bus Trigger)
    *   Changes in Azure Blob Storage (Blob Trigger)
    *   A schedule (Timer Trigger)
    *   New documents in Azure Cosmos DB (Cosmos DB Trigger)

## Bindings

*   **Bindings** are a declarative way to connect your function to other data sources and services.
*   They provide a simplified way to read data from (`Input Binding`) or write data to (`Output Binding`) Azure resources *without* having to directly use the full Azure SDKs within your function code.
*   Bindings are defined in the function's configuration and linked to function parameters or return values, allowing the Azure Functions runtime to handle the data flow.

Bindings have a `direction`:

*   **Input Bindings (`direction: in`):** Provide data to the function. The runtime collects the data from the service and passes it to your function code (e.g., reading the content of a blob).
*   **Output Bindings (`direction: out`):** Send data from the function to another service. The function writes data to a parameter or uses the return value, and the runtime writes that data to the configured service (e.g., writing data to a Cosmos DB document).

## Examples

*   **Scenario 1:** Service Bus Queue Trigger → Function → Cosmos DB Output Binding + Event Hub Output Binding.
    *   Trigger: Service Bus Queue message arrives.
    *   Output Bindings: Write processed data to Cosmos DB and send a message to Event Hub.
*   **Scenario 2:** Timer Trigger → Function (reads from Blob Storage) → Cosmos DB Output Binding.
    *   Trigger: A scheduled timer event.
    *   Input Binding: Read data from Azure Blob Storage.
    *   Output Binding: Write processed data to Azure Cosmos DB.
*   **Scenario 3:** HTTP Trigger → Function → HTTP Output Binding + Cosmos DB Output Binding.
    *   Trigger: An incoming HTTP request.
    *   Output Bindings: Send an HTTP response back to the client and write data to Cosmos DB.

## Defining Bindings (`function.json`)

Bindings and triggers are typically defined in a configuration file named `function.json` located in the folder for each function. This file uses a JSON format to declare the trigger and bindings.

Key properties in a binding definition within `function.json`:

*   `name`: The name used to access the binding data in your function code (e.g., a variable name).
*   `type`: The type of service being bound to (e.g., `queueTrigger`, `cosmosDB`, `blob`).
*   `direction`: Specifies if it's an `in`, `out`, or `inout` binding (mostly `in` or `out`).
*   `connectionStringSetting`: Specifies the name of an application setting (either in `local.settings.json` or the Function App's cloud configuration) that contains the connection string or secret for the service. This keeps secrets out of the code and `function.json`.

**Example (`function.json` snippet):**

```json
{
  "scriptFile": "__init__.py", // Or index.js, run.csx, etc.
  "bindings": [
    {
      "name": "req", // Access this in code
      "direction": "in",
      "type": "httpTrigger",
      "authLevel": "function"
    },
    {
      "name": "res", // Access this in code to set the HTTP response
      "direction": "out",
      "type": "http"
    },
    {
      "name": "cosmosDoc", // Access this in code to write the document
      "direction": "out",
      "type": "cosmosDB",
      "databaseName": "myDatabase",
      "collectionName": "myCollection",
      "createIfNotExists": true,
      "connectionStringSetting": "myAccount_CosmosDB" // Name of the app setting/local setting
    }
  ]
}
```

*(Note: The `scriptFile` and specific properties like `authLevel`, `databaseName`, `collectionName`, `createIfNotExists` depend on the trigger/binding type and language, but the structure and `name`, `type`, `direction`, `connectionStringSetting` concepts are core).*

## Configuration Files

Two other important configuration files for Function Apps are:

*   **`host.json`:** Global configuration file applied to *all* functions within a Function App. It controls runtime behavior like logging, concurrency, and binding-specific settings (e.g., batch size for queue triggers).
*   **`local.settings.json`:** Used during **local development**. Contains environment-specific settings, most importantly connection strings and API keys referenced by `connectionStringSetting` in `function.json`. This file is typically excluded from source control for security.

## Handling Connection Strings (Local vs. Cloud)

*   **Local Development:** When running a function locally, the runtime looks up the value of `connectionStringSetting` (e.g., "myAccount\_CosmosDB") in the `local.settings.json` file.
*   **Cloud Deployment:** When the function is deployed to a Function App in Azure, the runtime looks up the value of the same `connectionStringSetting` key in the Function App's **Configuration (Application Settings)** in the Azure portal.

This mechanism allows you to use the same `function.json` definition for both local and cloud environments, while securely managing sensitive connection information separately.

Using triggers and bindings simplifies connecting your event-driven functions to various Azure services, making development faster and code more focused on business logic.