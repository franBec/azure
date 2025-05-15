---
sidebar_position: 7
---

# Azure Container Instance

Azure Container Instances (ACI) is a service that allows you to run Docker containers directly on Azure in a **serverless** manner. You don't need to manage virtual machines or a container orchestration platform like Kubernetes.

## ACI vs. Azure Functions

Both ACI and Azure Functions (which can run containers) offer a serverless way to run containerized code. However, they are designed for different scenarios:

*   **Azure Functions:** Best suited for **short-lived, event-driven tasks**. Your code typically runs for a limited duration in response to a trigger.
*   **Azure Container Instances (ACI):** Designed for **long-running containerized applications or processes**. You can host a full application or a continuous process within an ACI.

## Container Groups

While a single ACI deployment can run just one container, you can also deploy multiple containers together in a **Container Group**.

*   A container group is a logical grouping of containers that share resources like storage, network, and scheduling.
*   Containers within a group are co-located on the same host machine.
*   This concept is very similar to a **Pod in Kubernetes**.
*   Container groups are useful for scenarios where you have sidecar containers, logging agents, or other supporting processes that need to run alongside your main application container.

## State and Persistence

By default, Azure Container Instances are **stateless**. This means any data or state stored within the container's filesystem will be lost when the container stops or restarts.

To persist data or achieve statefulness, you need to use external storage. The most common method discussed is **mounting Azure File Shares**:

*   **Mounting** an Azure File Share makes the file share available as a volume within your container's filesystem.
*   This allows your containerized application to read from and write to a persistent storage location outside the container instance itself.
*   You can also use other external Azure data services like Azure Blob Storage, Azure Cosmos DB, Azure SQL Database, etc., depending on your application's specific data needs.

## Provisioning an ACI

When creating an Azure Container Instance (via the portal, CLI, etc.), you'll typically configure:

*   **Resource Group and Region:** Standard Azure resource deployment requirements.
*   **Container Name:** A name for the instance.
*   **Image Source:** Where the container image is located. Common sources include:
    *   Quickstart images (pre-built public images)
    *   Azure Container Registry (ACR)—your private registry
    *   Docker Hub
    *   Other public or private registries
*   **Image Details:** The specific registry, image name, and tag if using a registry source.
*   **OS Type:** Linux or Windows.
*   **Size:** CPU cores and memory allocated to the instance/group.
*   **Networking:** Exposing ports, VNet integration options (more advanced).

<div>
  <img src={require('@site/static/img/azure-compute-solutions/azure-container-instance-create-container-instance.png').default} alt="azure container instance create container instance" />
</div>

Once configured, Azure pulls the specified image and runs your container(s) in a serverless environment.