---
sidebar_position: 5
---

# Azure Key Vault

Azure Key Vault is a cloud service that provides a secure store for **secrets**, **keys**, and **certificates**. It's a centralized solution for managing sensitive information that needs to be accessed by your applications and services.

## What Key Vault Stores

Azure Key Vault is designed to store and manage three main types of items:

*   **Secrets:** Small pieces of sensitive data, such as **passwords**, **database connection strings**, API keys, or any other sensitive configuration values your application needs. Secrets are typically stored as key-value pairs.
*   **Keys:** Cryptographic keys, used for operations like encryption and digital signatures. Key Vault supports both hardware security modules (HSMs) and software-backed keys. This can include **public or private keys**.
*   **Certificates:** Digital certificates, which are used to prove the identity of an application or service (e.g., SSL/TLS certificates). Certificates in Key Vault also contain the associated public and private keys.

## Benefits of Using Key Vault

Using a centralized vault service like Azure Key Vault offers several advantages:

*   **Centralized Storage:** Provides a single, centralized location for managing secrets, keys, and certificates used by multiple applications.
*   **Enhanced Security:** Sensitive items are stored in a secure, managed service. Access is protected by **Azure AD RBAC (Role-Based Access Control)**, allowing you to define granular permissions on *who* (users, applications) can access *what* within the vault.
*   **Monitoring and Auditing:** Monitor access and usage of secrets, keys, and certificates for auditing and security purposes. Diagnostic settings can send logs to Log Analytics, Storage, or Event Hubs.
*   **Simplified Administration:** Streamlines tasks like **key rotation**. Key Vault makes it easier to rotate secrets or keys without necessarily requiring changes to your application code, especially when leveraging versioning.

## Security and Access

Accessing items stored in Key Vault is strictly controlled. Simply having the URL or name of a secret, key, or certificate is **not** enough to retrieve its value. There is a mandatory **authentication layer**.

Applications accessing Key Vault must be authenticated and authorized. Common authentication methods include:

1.  **Managed Identities:** The recommended approach for applications running on Azure services (like App Service, VMs, Azure Functions). A managed identity is automatically managed by Azure and granted permissions to access Key Vault via RBAC, simplifying credential management for your application code.
2.  **Service Principals (App Registrations with Tokens):** An application can authenticate using its own identity (a service principal associated with an App Registration). It acquires a token from Azure AD and uses this token to authenticate to Key Vault. This is typically used for applications not running on Azure or scenarios where managed identities aren't suitable.

Access control policies (using RBAC) define *which* identities (users, groups, service principals, managed identities) have permissions to perform specific operations (Get, List, Set, Delete secrets/keys/certificates) on the Key Vault or specific items within it.

## Versioning

Azure Key Vault automatically creates a **new version** of a secret, key, or certificate whenever it is updated.

*   Each version has a unique identifier.
*   Key Vault provides a URL that by default points to the **latest version** of an item.
*   This means you can rotate a secret or key in Key Vault, and your application, if configured to retrieve the item by its name, can pick up the new value without needing to change or redeploy the application code. This greatly simplifies rotation and administration.

## Programmatic Interaction

Applications typically interact with Azure Key Vault using the Azure SDKs. The general steps involve:

1.  Authenticating the application to Azure AD to get credentials or leverage a Managed Identity.
2.  Using the appropriate Key Vault SDK client class (e.g., `SecretClient`, `KeyClient`, `CertificateClient`).
3.  Instantiating the client with the vault URI and the application's credentials.
4.  Calling methods on the client (e.g., `GetSecret()`, `SetSecret()`) using the item's name.

This allows applications to securely retrieve secrets, perform cryptographic operations, and manage certificates without sensitive values being hardcoded in the application's source code or configuration files.

Leveraging Azure Key Vault is essential for building secure and manageable applications in Azure by providing a dedicated, robust service for handling sensitive credentials and keys.