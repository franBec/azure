---
sidebar_position: 2
---

# Operations on Azure

Understanding the distinction between Control Plane and Data Plane operations is fundamental when working with Azure, particularly when dealing with resource management tools like ARM templates and Azure security (RBAC).

## Categories

| Aspect                       | Control Plane Operations                                                                  | Data Plane Operations                                                                                          |
|------------------------------|-------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| **Definition**               | Management operations performed *on* Azure resources (managing the resources themselves). | Operations performed *by* a specific Azure service, interacting with data/functionality *within* the resource. |
| **Common Actions**           | CRUD (Create, Read, Update, Delete) on resources.                                         | Interacting with service features or data exposed by the resource.                                             |
| **Examples**                 | Creating a Storage Account, Deleting a VM, Changing Web App size, Configuring NSG rules.  | Reading/Uploading Blob data, Sending Service Bus message, RDP/SSH into a VM, Executing an Azure Function.      |
| **Logging Location**         | Typically logged in the Azure **Activity Log**.                                           | Typically *not* in Azure Activity Log (often in service-specific logs).                                        |
| **RBAC Permission Property** | Defined under the `actions` property in role definitions.                                 | Defined under the `dataActions` property in role definitions.                                                  |

## How to Distinguish Operations

While documentation lists operations under Resource Providers, they might not always clearly label them as Control Plane or Data Plane. Here are two key ways to distinguish them:

1.  **Check RBAC Role Definitions:** This is presented as the most explicit way. View an Azure Built-in Role (like "Blob Reader") or a Custom Role. You will see permissions listed separately under `Actions` (Control Plane) and `Data Actions` (Data Plane). Permissions under `Data Actions` specifically relate to interacting with the data within the service instance.

    <div>
      <img src={require('@site/static/img/develop-azure-compute-solutions/azure-built-in-role.png').default} alt="azure built-in role" />
    </div>

2.  **Consider Azure Activity Log Behavior:** As a general rule of thumb (useful for the exam, though with some exceptions):

    <div>
        <img src={require('@site/static/img/develop-azure-compute-solutions/activity-log.png').default} alt="activity log" />
    </div>
    
    *   If an operation is typically logged in the **Azure Activity Log**, it's likely a **Control Plane** operation.
    *   If an operation is typically **not** logged in the **Azure Activity Log**, it's likely a **Data Plane** operation (e.g., reading a blob).

## Why the Distinction Matters

Knowing the difference is important for:

*   **Understanding ARM Templates:** While not fully detailed in this segment, the structure of ARM templates aligns with defining and configuring resources (Control Plane).
*   **Resource Providers:** Resources in Azure are organized by Resource Providers (e.g., `Microsoft.Compute`, `Microsoft.Storage`). Each provider exposes a set of both Control Plane and Data Plane operations.
*   **Azure RBAC:** Role definitions explicitly separate permissions based on whether they are Control Plane (`actions`) or Data Plane (`dataActions`). This is how you grant someone permission to *manage* a storage account vs. permission to *read data* from it.

Mastering this concept is crucial for managing resources and securing access effectively on Azure.