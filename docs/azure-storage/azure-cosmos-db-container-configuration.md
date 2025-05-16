---
sidebar_position: 5
---

# Azure Cosmos DB Container Configuration

Interacting with Azure Cosmos DB resources can be done through various means, including the Azure portal's Data Explorer or programmatically using the Azure SDKs (which is the typical approach for applications). When setting up a container, several key configurations are made that impact performance and cost.

## Data Explorer

The Azure portal provides a **Data Explorer** for your Cosmos DB account.

<div>
    <img src={require('@site/static/img/azure-storage/azure-cosmos-db-container-configuration-data-explorer.png').default} alt="azure cosmos db container configuration data explorer" />
</div>

Here you can visualize the hierarchy:

*   **Database Account**
    *   Databases
        *   Containers (analogous to tables)
            *   Items (analogous to rows)

You can perform basic operations like creating new databases, containers, and items directly within the Data Explorer, although programmatic access is standard for applications.

## Creating and Configuring a Container

When creating a new container, either through the portal or SDKs, two crucial configuration choices are made:

<div>
    <img src={require('@site/static/img/azure-storage/azure-cosmos-db-container-configuration-new-container.png').default} alt="azure cosmos db container configuration new container" />
</div>

1.  **Partition Key:**
    *   You must define a property within your items to serve as the **partition key** (e.g., `/address`).
    *   This choice is **significant** as it dictates how data is distributed across physical partitions and heavily influences query performance.
    *   Efficient queries often filter on the partition key to target specific partitions.

2.  **Throughput (Request Units per Second - RU/s):**
    *   Cosmos DB performance is measured in **Request Units per Second (RU/s)**. An RU is a normalized measure of database operations cost (reads, writes, queries, etc.).
    *   When creating a container, you configure its provisioned throughput in RU/s. You have two main options:
        *   **Manual Scale:** You specify a fixed amount of RU/s that is always available for the container. You are billed for this amount regardless of actual usage.
        *   **Autoscale:** You specify a *maximum* RU/s. Azure Cosmos DB automatically scales the throughput up or down within a range (e.g., from 10% of the maximum up to the maximum) based on the traffic load. You are billed based on the highest RU/s scaled up to within the hour.

Choosing Autoscale can significantly **save money** compared to Manual Scale if your database experiences variable or infrequent access, as you only pay for the throughput scaled up to, rather than a constant provisioned amount.

After defining the partition key and throughput settings, the container is created and ready to store items. While the portal allows for manual creation of items, applications typically insert, read, update, and delete items using the specific Cosmos DB SDK for their chosen API.

The proper selection of a partition key and the configuration of throughput (Manual or Autoscale) are critical design decisions that directly impact the scalability, performance, and cost-effectiveness of your Azure Cosmos DB solution.