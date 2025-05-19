---
sidebar_position: 13
---

# Azure Blob Storage Lifecycle Management

Azure Blob Storage offers different **access tiers** to help you manage the cost of your data based on how frequently it is accessed. You can automate the process of moving data between these tiers or deleting it using **Lifecycle Management policies**.

## Blob Access Tiers

The choice of access tier is a trade-off between storage costs and data access costs:

| Access Tier      | Storage Cost | Access/Usage Cost | Use Case / Access Frequency                                                      | Notes / Characteristics                                                                                             |
|------------------|--------------|-------------------|----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| **Hot Tier**     | Higher       | Lower             | **Frequently accessed** data (active, current website content)                   | Default tier for new GPv2 storage accounts.                                                                         |
| **Cool Tier**    | Lower        | Higher            | **Infrequently accessed** data (backups, less frequent media)                    | Data should be stored for at least 30 days.                                                                         |
| **Archive Tier** | Very Low     | Very High         | **Rarely accessed**, tolerates hours of latency (long-term archives, compliance) | Data should be stored for at least 180 days. Data is **offline**, requires **hydration** to Hot/Cool before access. |

## Lifecycle Management Policies

Lifecycle Management policies allow you to create rules that automate the tiering of blobs (moving them between Hot, Cool, and Archive) or their deletion based on conditions you define. This is crucial for optimizing storage costs over time.

*   **Purpose:** To automatically transition blobs to a less expensive tier or delete them when they are no longer actively used, saving money.
*   **Policies and Rules:** A Lifecycle Management policy consists of one or more rules. Each rule defines:
    *   The scope it applies to (e.g., specific containers or blobs with certain prefixes/tags).
    *   Conditions (e.g., based on blob age since last modification, last access time, creation time).
    *   Actions to take when conditions are met (e.g., `Move to Cool Storage`, `Move to Archive Storage`, `Delete the blob`).

## Configuration

Lifecycle Management policies are configured at the **Storage Account** level under the "Data Management" section in the Azure portal.

*   Policies can be defined using a graphical UI or by directly editing a **JSON** file.
*   While the UI is straightforward for basic rules, defining policies directly in **JSON** is recommended for more complex rules or leveraging documented examples.
*   Azure documentation provides various JSON policy examples for common scenarios like:
    *   Moving "cold" data to cooler tiers.
    *   Tiering based on last access time (requires enabling access time tracking).
    *   Archiving data after initial ingestion.
    *   Expiring/deleting data based on age.
    *   Deleting data based on blob index tags.

Implementing lifecycle management policies is a key part of managing costs and optimizing your storage strategy in Azure Blob Storage.