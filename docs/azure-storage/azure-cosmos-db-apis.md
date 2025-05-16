---
sidebar_position: 3
---

# Azure Cosmos DB APIs

Azure Cosmos DB supports multiple APIs, allowing developers to interact with their data using familiar tools and languages depending on the data model and existing application requirements.

Here are the main APIs available:

| API Name           | Data Model     | Query Language / Usage           | Primary Use Case / Benefits                                                                           | Notes                                                                          |
|--------------------|----------------|----------------------------------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| **Core (SQL) API** | Document       | SQL query language               | Native API; Ideal for new development or those comfortable querying JSON with SQL syntax.             | Queries documents, *not* a traditional relational SQL database.                |
| **MongoDB API**    | Document       | MongoDB APIs and drivers         | For existing applications using MongoDB APIs; leverages Cosmos DB benefits without code rewrite.      |                                                                                |
| **Cassandra API**  | Column Family  | CQL (Cassandra Query Language)   | For existing applications using Apache Cassandra APIs; run against managed Cosmos DB.                 |                                                                                |
| **Gremlin API**    | Graph          | Gremlin graph traversal language | For existing or new applications modeling highly interconnected data as a graph.                      |                                                                                |
| **Table API**      | Key-Value Pair | Azure Table Storage API          | For existing applications using Azure Table Storage API; gain Cosmos DB benefits (global dist, etc.). | Provides a path to migrate from Azure Table Storage with minimal code changes. |

Choosing the right API often depends on the data model your application requires and whether you need compatibility with existing codebases built for specific database technologies (like MongoDB, Cassandra, or Azure Table Storage).