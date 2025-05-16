---
sidebar_position: 1
---

# Azure Cosmos DB

Azure Cosmos DB is a **general purpose**, **NoSQL**, managed database that is **globally distributed**. Let's break down these key characteristics.

## General Purpose

Being "general purpose" means Azure Cosmos DB is flexible enough to handle different forms of data and provides multiple APIs for accessing and querying that data.

*   **Data Forms:** Supports storing data in various models, including:
    *   Key-value pairs
    *   Column family
    *   Documents (often JSON)
    *   Graph database
*   **Multiple APIs:** You can interact with the data using different familiar APIs:
    *   Core (SQL) API
    *   MongoDB API (useful if you have existing MongoDB applications)
    *   Gremlin API (for graph data)
    *   Cassandra API
    *   Azure Table Storage API

This versatility means you can often find a good fit for your data structure and access patterns within Cosmos DB.

## NoSQL Database

Cosmos DB is a NoSQL database, which differs significantly from traditional relational (SQL) databases.

*   **Non-Relational:** Data is not typically stored in rigid tables with predefined schemas and foreign keys linking tables. It's often unstructured or semi-structured (like JSON documents).
*   **Designed for Scale:** Unlike SQL databases, which weren't originally built with the internet-scale demands of millions or billions of users in mind (making horizontal scaling or sharding more complex), NoSQL databases like Cosmos DB are inherently **designed with scale in mind**.
*   **Easier Horizontal Scaling:** It is generally much easier to scale NoSQL databases horizontally (adding more instances) to handle increasing load and data volume.

NoSQL is often considered a "modern database" approach better suited for large-scale, high-performance applications needing flexible schemas.

## Globally Distributed

A powerful feature of Azure Cosmos DB is its ability to be **globally distributed**.

*   **Replication:** You can replicate your Cosmos DB database across multiple Azure regions around the world.
*   **Low Latency:** This distribution allows users to connect to the replica closest to their geographical location, significantly reducing read and write latency and providing a more responsive experience for a global user base.

Being a **managed database** means Azure handles the underlying infrastructure maintenance, patching, and updates for you, allowing you to focus on your application development.

Understanding these characteristics is fundamental to leveraging Azure Cosmos DB effectively for scalable, high-performance, and globally available applications.