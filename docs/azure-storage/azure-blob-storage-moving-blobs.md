---
sidebar_position: 10
---

# Azure Blob Storage Moving Blobs

While there isn't a single "move" operation for blobs in Azure Storage (e.g., moving a blob between containers within the same storage account, or between different storage accounts), you can achieve the equivalent by performing a **copy** operation followed by a **delete** operation on the original blob.

Azure provides several mechanisms to facilitate these copy operations:

| Method                                 | Description                                                                      | Key Features / Behavior                                                                              | Use Case / Effort                                                                                             |
|----------------------------------------|----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Azure CLI (`az storage blob copy`)** | Command-line interface command to initiate blob copy operations.                 | **Asynchronous** (command returns immediately, copy runs in background). Can track progress, cancel. | Relatively easy to use via command line.                                                                      |
| **AzCopy Utility**                     | Dedicated command-line utility for copying data to/from Azure Storage.           | More advanced capabilities. **Resumable Transfers**, Performance Tuning.                             | Excellent for bulk data transfers or scenarios requiring robustness and control. Runs on local machine or VM. |
| **.NET Storage Library (SDK)**         | Use Azure Storage SDKs (like .NET) to initiate copy operations programmatically. | Provides APIs to integrate blob copy logic directly into application code.                           | Requires writing code. Integrate into custom applications.                                                    |
