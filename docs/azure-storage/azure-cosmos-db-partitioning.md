---
sidebar_position: 4
---

# Azure Cosmos DB Partitioning

Understanding partitioning is fundamental to designing scalable and performant applications with Azure Cosmos DB.

## Resource Hierarchy

Before discussing partitioning, let's review the resource hierarchy:

<div>
    <img src={require('@site/static/img/azure-storage/azure-cosmos-db-partitioning-resource-hierarchy.png').default} alt="azure cosmos db partitioning resource hierarchy" />
</div>

1.  **Database Account:** The top-level Azure Cosmos DB resource created in your Azure subscription.
2.  **Database:** Created underneath the Database Account.
3.  **Containers:** Created inside a Database. Think of Containers as analogous to tables in traditional SQL databases. This is where your data resides.
4.  **Items:** The individual data entities stored inside a Container. Think of Items as analogous to rows in traditional SQL databases.

## Partitioning

Data within a **Container** in Azure Cosmos DB is logically divided across partitions based on a value within each item called the **partition key**.

<div>
    <img src={require('@site/static/img/azure-storage/azure-cosmos-db-partitioning.png').default} alt="azure cosmos db partitioning" />
</div>

*   **Partition Key:** When you create a container, you specify a property name from your items to be the partition key (e.g., `/city`, `/userId`, `/productId`).
*   **Logical Partitions:** All items with the same partition key value form a **logical partition**. For example, if `/city` is the partition key, all items where `city="Paris"` belong to one logical partition, `city="London"` to another, and so on.
*   **Physical Partitions:** Azure Cosmos DB automatically manages the **physical partitions** (sets of compute and storage) where your data is actually stored. Multiple logical partitions can be mapped to a single physical partition. Azure distributes logical partitions across physical partitions to manage scalability and performance.

## Importance of the Partition Key

Choosing the right partition key is a **major design choice** with a significant impact on your database's performance and scalability:

*   **Efficient Queries:** Queries that filter on the partition key value (e.g., `SELECT * FROM c WHERE c.city = "Paris"`) can be routed directly to the specific physical partition(s) containing that logical partition, resulting in much faster performance. This is known as a "partition-aware query."
*   **Distribution:** A good partition key distributes request volume and data storage evenly across physical partitions, preventing "hot spots" where a single partition is overloaded, which can lead to throttling and reduced performance.

## Unit of Scalability

In Azure Cosmos DB, the **Container** is the **unit of scalability**.

*   You don't scale the entire Database Account or the Database directly.
*   Scaling happens at the Container level by increasing the throughput (measured in Request Units per second or RU/s) or storage.
*   Azure Cosmos DB uses partitioning to scale the container horizontally. When throughput or storage increases, Azure automatically adds more physical partitions and redistributes logical partitions among them.
*   Autoscale features work by automatically adjusting the physical partitions and RU/s based on the load, effectively scaling the container via its partitions.

This partition-based horizontal scaling model is a key reason why NoSQL databases like Cosmos DB are well-suited for handling large-scale, high-throughput workloads.