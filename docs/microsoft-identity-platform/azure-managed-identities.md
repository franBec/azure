---
sidebar_position: 7
---

# Azure Managed Identities

Azure Managed Identities provide an identity for your Azure services in Azure Active Directory (Azure AD, now Microsoft Entra ID). They allow your services to authenticate to other Azure services that support Azure AD authentication **without needing to manage credentials (secrets, connection strings, SAS tokens)** in your code or configuration.

## The Problem Without Managed Identities

In a world without Managed Identities, applications needing to access Azure resources would typically authenticate using secrets:

*   **Connection Strings/SAS Tokens:** Applications store and use connection strings or SAS tokens (which contain secrets) to access services like Azure Storage or Service Bus. These secrets need to be managed and rotated.
*   **Service Principals with Client Secrets:** An application can register in Azure AD, get a Service Principal, and use a client secret to acquire an access token from Azure AD. This token is then used to access resources. While better than direct secrets in some ways, you still have to manage the client secret.

The common thread is that managing secrets in application code or configuration introduces risks and administrative overhead.

## How Managed Identities Solve This

Managed Identities eliminate the need for developers to manage credentials.

*   **Concept:** An Azure resource (like a Virtual Machine, App Service, Azure Function, etc.) is given an identity in Azure AD that is automatically managed by Azure.
*   **Under the Hood:** When you enable a Managed Identity, Azure automatically creates and manages a **Service Principal** for that specific resource in Azure AD. Azure handles the underlying credential rotation for this Service Principal.
*   **Secret-less Authentication:** Your application code running on the resource can get Azure AD tokens for accessing other resources **without** using any secrets.

## Steps to Use a Managed Identity

The high-level process for enabling and using a Managed Identity is:

1.  **Enable Managed Identity:** Configure the Azure resource (e.g., enable Managed Identity on a VM or App Service). Azure registers a Service Principal in Azure AD.
2.  **Assign Permissions:** Grant the Managed Identity's Service Principal the necessary permissions (using Azure RBAC) on the target Azure resource it needs to access (e.g., grant "Reader" permissions on a Storage Account).
3.  **Obtain a Token:** From within the code running on the Azure resource, call a special, well-known local endpoint (often using the Azure Instance Metadata Service or a dedicated SDK library) to request an Azure AD access token for the target resource. This step does not require any secrets.
4.  **Use the Token:** Use the acquired Azure AD access token when making calls to the target Azure resource (e.g., using a Storage SDK that supports token authentication).

## Types of Managed Identities

There are two types of Managed Identities:

1.  **System-Assigned Managed Identity:**
    *   **Relationship:** Has a **one-to-one** relationship with the Azure resource it is enabled on.
    *   **Lifecycle:** Its lifecycle is tied directly to the resource. When the Azure resource is deleted, the associated system-assigned managed identity is also automatically deleted in Azure AD.
    *   **Creation:** Enabled directly on the resource's identity settings.

2.  **User-Assigned Managed Identity:**
    *   **Relationship:** A standalone Azure resource that can have a **one-to-many** relationship, meaning it can be assigned to multiple Azure resources.
    *   **Lifecycle:** Its lifecycle is independent of the Azure resources it is assigned to. You create and delete the user-assigned identity separately.
    *   **Use Case:** Useful for scenarios where multiple resources need to share the same identity and permissions (e.g., a group of VMs in a Scale Set all need access to the same Storage Account). You create one user-assigned identity and assign it to all the VMs, rather than enabling and managing individual system-assigned identities for each VM.

Managed Identities are best practice for securing service-to-service communication within Azure, reducing the security risk and administrative burden associated with managing secrets.