---
sidebar_position: 11
---

# Azure Blob Storage Metadata

Azure Blob Storage allows you to associate additional information with both **blobs** and **containers** in the form of **metadata**. This metadata can be used by your applications to store and retrieve relevant context without needing to access the blob's content itself.

## Types of Metadata

There are two main types of metadata in Azure Blob Storage:

1.  **System-Defined Metadata:**
    *   Automatically managed by Azure Storage.
    *   Includes properties like `Last-Modified` timestamp, `Public Access Level`, `ETag`, `Content-Type`, `Content-Length`, etc.
    *   These properties are set and updated by the storage service and can be read by users.

2.  **User-Defined Metadata:**
    *   Custom key-value pairs that you explicitly define and set on a blob or container.
    *   Allows you to store application-specific information (e.g., `location="Europe"`, `last_accessed="2023-10-27"`).
    *   Keys and values are simple strings but follow certain naming constraints (e.g., keys are case-insensitive, follow C# identifier rules).

## Using Metadata

Metadata is valuable because it can be used:

*   Within your **application logic** to make decisions based on the context of a blob or container.
*   As part of **storage policies** or automation.

## Accessing Metadata Programmatically

You can retrieve both system-defined and user-defined metadata programmatically using the Azure Storage SDKs. The SDKs expose properties for system metadata and collections (often dictionary-like) for user-defined metadata associated with a blob or container object.

## Setting User-Defined Metadata

User-defined metadata can be set when you upload a blob, create a container, or by updating existing blobs or containers.

*   **Azure Portal:** You can manually add or edit user-defined key-value pairs for both containers and individual blobs through the portal interface.

    <div>
        <img src={require('@site/static/img/azure-storage/azure-blob-storage-metadata-seeting-metadata-azure-portal.png').default} alt="azure blob metadata setting metadata azure portal" />
    </div>

*   **SDKs/APIs:** Programmatic methods in the Azure Storage SDKs allow you to set metadata as part of upload/creation operations or as a separate update operation.

Metadata provides a lightweight and flexible way to manage properties about your unstructured data in Azure Blob Storage, enhancing discoverability and enabling application logic based on these properties.