---
sidebar_position: 6
---

# Azure Container Registry

Azure Container Registry (ACR) is a managed Docker registry service for storing and managing your private container images. For the AZ-204 exam, you should focus on understanding its pricing tiers and storage capabilities.

## Pricing Tiers

ACR offers several pricing tiers, each providing different levels of storage and performance (image throughput). Image throughput refers to the rate at which container images can be pulled from the registry, which is important when deploying images to services like Azure Kubernetes Service (AKS) or Azure Container Instances (ACI).

1.  **Basic:**
    *   Limited included storage and image throughput.
    *   Meant primarily for **developer workloads** and learning.
    *   **Not recommended for production.**

2.  **Standard:**
    *   Provides more storage and significantly higher image throughput compared to Basic.
    *   Suitable for **production workloads**.

3.  **Premium:**
    *   Includes all features of the Standard tier.
    *   Adds advanced features crucial for larger-scale and geographically distributed applications:
        *   **Geo-replication:** Replicates your registry images across multiple Azure regions, improving pull performance for globally distributed deployments and providing disaster recovery capabilities for your images.
        *   **Private Link Support:** Allows secure access to your registry over a private endpoint within your virtual network (discussed later).

## Storage Capabilities

Regardless of the tier, ACR provides core storage features:

*   **Encryption at Rest:** All images and artifacts stored in ACR are encrypted at rest by default.
*   **Geo-replication:** Available and configured in the **Premium** tier as mentioned above.
*   **Storage Limit:** The maximum storage limit for a single Azure Container Registry is **5 Terabytes (TB)** across all tiers.

Understanding these tiers and capabilities will help you choose the right ACR configuration for different development and production scenarios.