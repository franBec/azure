---
sidebar_position: 2
---

# Azure Cosmos DB Data Model Families

As a **general-purpose** database, Azure Cosmos DB supports storing data using several different data models. This flexibility is one of its key strengths, allowing you to choose the model that best suits your application's data structure and access patterns.

<div>
    <img src={require('@site/static/img/azure-storage/azure-cosmos-db-data-model-families.png').default} alt="azure cosmos db data model families" />
</div>

The primary data model families supported by Cosmos DB are:

| Data Model Family          | Description / Structure                                                              | Primary API(s) / Language(s)        | Key Characteristics / Use Cases                                                              |
|----------------------------|--------------------------------------------------------------------------------------|-------------------------------------|----------------------------------------------------------------------------------------------|
| **Document Database**      | Data stored in **documents** (typically **BSON/JSON**).                              | **Core (SQL) API**, **MongoDB API** | Flexible, semi-structured data.                                                              |
| **Key-Value Store**        | Data stored as **key-value pairs**. Each item has a unique key and value.            | **Azure Table API**                 | Fast lookups based on the key. (Similar to Redis, Azure Table Storage).                      |
| **Column Family Database** | Organized into rows and dynamic "column families." Schema-flexible.                  | **Cassandra API**, CQL              | High write throughput, managing large data with varying/evolving schemas.                    |
| **Graph Database**         | Data represented as a network of **nodes** (entities) and **relationships** (edges). | **Gremlin API**, Gremlin language   | Modeling/querying data with complex, interconnected relationships (social, recommendations). |

The availability of these distinct data model families (accessible via different APIs) within a single globally distributed database service makes Azure Cosmos DB highly adaptable to a wide variety of modern application requirements.