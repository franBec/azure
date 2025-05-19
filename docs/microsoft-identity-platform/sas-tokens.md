---
sidebar_position: 4
---

# SAS Tokens

Shared Access Signatures (SAS) are tokens that provide **granular access** to specific Azure services and resources. They are a crucial security mechanism for granting limited permissions to clients without sharing sensitive account keys.

## The Problem with Full Access Keys

Azure services like Storage Accounts have full access keys that grant complete control over the service and all its resources. Sharing these keys with an application or user is risky because:

*   It grants **unlimited permissions** (e.g., delete the entire storage account, read/write anything).
*   Access is typically **granted indefinitely** until the key is regenerated.

This lack of granularity and time limitation makes full keys unsuitable for scenarios where you only want to provide limited, temporary access.

## How SAS Tokens Solve This

SAS tokens address the limitations of full access keys by allowing you to create a string that contains all the information needed to authenticate a request, but with carefully defined constraints:

*   **Granular Permissions:** You can specify exactly *what* actions are allowed (read, write, delete, list) and *which* resources they can be performed on (e.g., a specific blob, a container, a file share, a queue).
*   **Time Limits:** You set a **start time** and an **expiration time** for the SAS token. After the expiration time, the token is no longer valid.
*   **No Credential Sharing:** The client uses the SAS token to authenticate, not the service's full access key.

## Example

For an Azure Storage Account, you can generate a SAS token that grants permissions at different levels:

*   **Service SAS:** Grants access to a resource in a single Azure Storage service (Blob, Queue, Table, File). You define permissions for specific services, resource types (like containers or blobs), and permissions (read, write, delete, list).
*   **Account SAS:** Grants access to resources in *one or more* of the storage services (Blob, File, Queue, Table). It provides broader permissions at the account level but is still constrained by defined permissions and time limits.

When generating a SAS token (e.g., in the Azure portal under the "Shared access signature" blade), you configure:

<div>
  <img src={require('@site/static/img/microsoft-identity-platform/sas-tokens-configuration.png').default} alt="sas tokens configuration" />
</div>

*   **Allowed Services:** Which storage service(s) (Blob, File, Queue, Table).
*   **Allowed Resource Types:** What level within the service (e.g., Container, Object/Blob).
*   **Allowed Permissions:** What operations are permitted (Read, Write, Delete, List, etc.).
*   **Start and Expiry Date/Time:** The validity period of the token.
*   **Allowed IP Addresses (Optional):** Limit the IP addresses from which the token can be used.
*   **Allowed Protocols (Optional):** Limit to HTTPS or HTTP.

The generated SAS token is then appended to the URI of the storage resource the client wants to access. The Azure Storage service validates the token and grants access only if the token is valid and authorizes the requested action.

Using SAS tokens is a secure and controlled way to grant limited access to your Azure Storage resources or other services like Service Bus and Event Hubs, avoiding the need to distribute highly sensitive full access keys.