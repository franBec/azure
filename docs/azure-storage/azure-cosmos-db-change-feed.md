---
sidebar_position: 8
---

# Azure Cosmos DB Change Feed

The Azure Cosmos DB Change Feed is a feature that exposes a stream of **events** generated by changes within a Cosmos DB container. It provides a way for applications to listen for and react to inserts, updates, and deletions that happen to items in your data.

<div>
    <img src={require('@site/static/img/azure-storage/azure-cosmos-db-change-feed.png').default} alt="azure cosmos db change feed" />
</div>

## What the Change Feed Exposes

The Change Feed acts like a log of changes for a specific container. It exposes events such as:

*   Creating a new item
*   Updating an existing item
*   Deleting an item (though handling deletions in the change feed requires specific considerations depending on the API)
*   Other resource-specific changes (like container deletion).

Essentially, any modification to the data within the container generates an event in the Change Feed.

## Consuming the Change Feed

Applications can listen to and process the events exposed by the Change Feed to implement various patterns, such as:

*   Triggering actions when data changes.
*   Implementing ETL (Extract, Transform, Load) pipelines.
*   Synchronizing data with a cache or search index.
*   Building materialized views.

There are two primary ways to consume the Change Feed:

1.  **Using the Azure Cosmos DB SDKs:**
    *   You can use the Cosmos DB SDK for your language (e.g., .NET, Java, Node.js, Python) to build your own change feed processor within your application code.
    *   This gives you full control over how you read and process the changes.

2.  **Using Azure Functions (Natively Built-in):**
    *   Azure Functions has a native trigger specifically for the Cosmos DB Change Feed.
    *   This is often the easiest way to consume the change feed in a serverless manner. When changes occur, Azure Functions automatically triggers your function code, passing the changed items as input. You don't need to write code to manage checkpoints or leases.

The Change Feed is a powerful capability that enables reactive programming patterns and data integration scenarios built around changes occurring in your Cosmos DB container.