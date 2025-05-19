---
sidebar_position: 12
---

# Azure Blob Storage SDK

To interact with Azure Blob Storage programmatically from your applications, you will use the Azure Storage Software Development Kit (SDK) for your chosen programming language.

The Azure Storage SDK provides libraries and classes designed for managing Azure Storage resources, including Blob Storage.

## Key Classes

While the specific class names and structure might vary slightly between SDKs for different languages, the concept is similar. For example, in the .NET Azure Storage SDK:

| Class                 | Description                                                                                                                                                                      |
|:----------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BlobClient`          | The `BlobClient` allows you to manipulate Azure Storage blobs.                                                                                                                   |
| `BlobClientOptions`   | Provides the client configuration options for connecting to Azure Blob Storage.                                                                                                  |
| `BlobContainerClient` | The `BlobContainerClient` allows you to manipulate Azure Storage containers and their blobs.                                                                                     |
| `BlobServiceClient`   | The `BlobServiceClient` allows you to manipulate Azure Storage service resources and blob containers. The storage account provides the top-level namespace for the Blob service. |
| `BlobUriBuilder`      | The `BlobUriBuilder` class provides a convenient way to modify the contents of a Uri instance to point to different Azure Storage resources like an account, container, or blob. |

Understanding the primary client classes is the starting point for developing applications that work with Azure Blob Storage.