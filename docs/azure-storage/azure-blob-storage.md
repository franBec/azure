---
sidebar_position: 9
---

# Azure Blob Storage

Azure Blob Storage is Microsoft's object storage solution for the cloud. It is designed for storing vast amounts of **unstructured data**.

## What is a Blob?

A "blob" is simply a piece of unstructured data. This can include various types of files such as:

*   PDFs
*   Log files
*   Images
*   Videos
*   Audio files
*   Application backup files
*   And more.

## Blobs vs. Azure Files

A common question is when to use Azure Blob Storage versus Azure Files, as both can store files. The key distinction lies in the access method and intended use cases:

*   **Azure Files:** Best used for **legacy applications** or scenarios that require accessing files using standard **file system APIs**. Azure Files provides shared storage accessible via the SMB (Server Message Block) protocol, allowing multiple VMs or on-premises machines to mount the same file share concurrently, just like a traditional network share.
*   **Azure Blob Storage:** Generally **cheaper** for storing large amounts of unstructured data. It's accessed via HTTP/HTTPS using REST APIs or SDKs, not traditional file system APIs or SMB.

**Recommendation:** For application storage purposes, your best choice is typically Azure Blob Storage **unless** you specifically need:

1.  Compatibility with applications leveraging traditional **file system APIs** (use Azure Files).
2.  The ability to **share files across different nodes** using the **SMB protocol** (use Azure Files).

Otherwise, leveraging the cost-effectiveness and scalability of Blob Storage is generally preferred for unstructured data within cloud-native applications.

## Storage Account Types

| Storage account type        | Supported storage services                  | Usage                                                                                                                                                                                                                           |
|:----------------------------|:--------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Standard general-purpose v2 | Blob, Queue, and Table storage, Azure Files | Standard storage account type for blobs, file shares, queues, and tables. Recommended for most scenarios using Azure Storage. If you want support for NFS file shares in Azure Files, use the premium file shares account type. |
| Premium block blobs         | Blob storage                                | Premium storage account type for block blobs and append blobs. Recommended for scenarios with high transactions rates, or scenarios that use smaller objects or require consistently low storage latency.                       |
| Premium page blobs          | Page blobs only                             | Premium storage account type for page blobs only.                                                                                                                                                                               |
| Premium file shares         | Azure Files                                 | Premium storage account type for file shares only.                                                                                                                                                                              |

## Resource Hierarchy

The resource hierarchy for Azure Blob Storage is straightforward:

1.  **Storage Account:** The top-level Azure resource you create in your subscription. It acts as a container for all your Azure Storage data services (blobs, files, queues, tables).
2.  **Container:** Created inside a Storage Account. Containers provide a grouping mechanism for your blobs. Think of them as similar to folders or directories, but they cannot be nested indefinitely in the same way. Access control can be set at the container level.
3.  **Blob:** The individual file or piece of unstructured data stored inside a Container.

So, you have a Storage Account, inside which you create one or more Containers, and inside each Container, you store your Blobs (files like logs, images, PDFs, etc.).

Understanding this hierarchy and the distinction between Blob Storage and Azure Files is important when designing your application's data storage solution on Azure.