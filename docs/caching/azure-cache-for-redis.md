---
sidebar_position: 2
---

# Azure Cache for Redis

**Azure Cache for Redis** is a **managed** in-memory data store service based on the popular open-source Redis software. It is offered as a **Platform as a Service (PaaS)** on Azure.

## What it Offers

As a managed PaaS offering, Azure handles the underlying infrastructure for you:

*   You don't need to manage virtual machines.
*   Azure takes care of patching, security updates, and hardware maintenance.
*   You use the Redis instance without worrying about the complexities of hosting and managing the Redis server infrastructure yourself.

## Pricing Tiers

Azure Cache for Redis offers various pricing tiers with different features and performance characteristics. The transcript mentions several key tiers:

| Tier             | Description/Key Features                                                                                                                                                                                                                                                                                               |
|:-----------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Basic            | Runs on a single virtual machine. Suitable for development, testing, and non-critical workloads.                                                                                                                                                                                                                       |
| Standard         | Runs on two virtual machines in a replicated configuration to provide **high availability** and an automatic failover mechanism.                                                                                                                                                                                       |
| Premium          | Designed for high performance and includes additional features such as:<br/>- Lower latency<br/>- Higher throughput<br/>- **Geo-replication** (replicate your cache across different Azure regions)<br/>- Support for Private Link (secure access via a VNet private endpoint)<br/>- Enhanced data persistence options |
| Enterprise       | Powered by Redis Enterprise software (from Redis Labs). Offers more advanced capabilities (like RedisSearch, RedisBloom, etc.) and higher performance/scalability options.                                                                                                                                             |
| Enterprise Flash | A cost-effective option within the Enterprise tier that uses a combination of RAM and non-volatile memory (flash) for storage.                                                                                                                                                                                         |

## Key Features

Azure Cache for Redis provides several important features out-of-the-box:

*   **Managed Service:** Reduces operational overhead as Azure handles maintenance.
*   **High Availability:** Provided in Standard and higher tiers via replicated instances and automatic failover.
*   **Automatic Failover:** Built-in mechanism within HA tiers (Standard+) to ensure continuity if a node fails.
*   **Geo-replication:** (Premium and Enterprise tiers) Allows replicating cache data across different Azure regions for disaster recovery or globally distributed applications.
*   **Security:** Integration with Private Endpoint (Private Link) and Firewall rules allows restricting network access to the cache instance.
*   **Monitoring:** Built-in monitoring capabilities (via Azure Monitor Insights) allow you to track cache performance, usage, and create alerts.
*   **Scalability:** Scale up (change to a higher tier for more capacity/performance) or scale out (increase shards in Premium/Enterprise) via the portal.

## Exam Focus

You are generally not expected to have deep knowledge of core Redis concepts or how to interact with Redis programmatically from code for this exam.

For the AZ-204 exam, the focus is on understanding:

*   **What Azure Cache for Redis is:** A managed Redis service on Azure (PaaS).
*   **Why you would use it:** For caching to improve application performance and reduce backend load.
*   **Key features and capabilities:** High Availability, Automatic Failover, Geo-replication (Premium+), Security options (Private Link/Firewall), Monitoring.
*   **The different pricing tiers** and the key differences they offer (especially in terms of HA and advanced features).

Leveraging Azure Cache for Redis allows developers to easily integrate high-performance caching into their Azure applications without the burden of managing the underlying infrastructure.