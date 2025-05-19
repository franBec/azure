---
sidebar_position: 3
---

# Azure AD App Registration

A common requirement is to protect your custom Web APIs (e.g., Payment APIs, Orders APIs) hosted on Azure (like on an App Service). You want to ensure that only authenticated and authorized clients can access these APIs, typically by requiring them to present a valid token.

While simple methods like API Subscription Keys exist, integrating with an Identity Provider like **Microsoft Entra ID (formerly Azure Active Directory)** or **Azure AD B2C** provides a more robust, standards-based approach using tokens (OAuth 2.0 Access Tokens).

## Azure AD vs. Azure AD B2C

It's helpful to understand the distinction between these two services for choosing the right identity provider:

*   **Microsoft Entra ID (Azure AD):** Primarily designed for **organizational identities** (employees, partners, internal business users). Used for collaboration and accessing company resources.
*   **Azure AD B2C:** Designed for **consumer identities** (customers, public users). Used for public-facing applications where you want users to sign up and sign in using local accounts or social identities (like Google, Facebook, etc.).

The process for protecting a custom API and requiring tokens is very similar in both services.

## App Registrations and Permissions

To protect a custom Web API and enable clients to access it using tokens from Azure AD/B2C, you need to configure both the API itself (as a resource) and the client application (as a consumer) within the identity provider. This is done using **App Registrations**.

The key steps involve registering your API and your client application and defining the relationship between them:

1.  **Register the Web API (Resource Application):**

    <div>
      <img src={require('@site/static/img/microsoft-identity-platform/azure-ad-app-registration.png').default} alt="azure ad app registration" />
    </div>
    
    *   Register your custom Web API (e.g., "Payment and Order APIs") as an application in Azure AD/B2C App Registrations. This represents your API as a protected resource that clients can request access to.

2.  **Expose an API and Define Scopes:**

    <div>
      <img src={require('@site/static/img/microsoft-identity-platform/azure-ad-app-registration-expose-api.png').default} alt="azure ad registration expose api" />
    </div>

    *   Within the Web API's App Registration, you need to **Expose an API**. This is where you define the permissions (called **scopes**) that your API offers.
    *   For example, you might define a scope called `Payments.Read`, `Orders.Write`, or a simple `hello` scope. These scopes represent the specific actions or data a client can be granted permission to access within your API.

3.  **Register the Client Application:**

    <div>
      <img src={require('@site/static/img/microsoft-identity-platform/azure-ad-app-registration-client-application.png').default} alt="azure ad registration client application" />
    </div>

    *   Register the client application (e.g., a Single-Page Application, Mobile App, Desktop App, or another Web App/API) that will call your protected API.
    *   Crucially, configure the **Redirect URIs** for the client application. These are the URLs where the identity provider will send the user back after successful authentication and authorization, typically including the access token or a code to get it.

4.  **Grant API Permissions:**

    <div>
      <img src={require('@site/static/img/microsoft-identity-platform/azure-add-app-registration-api-permissions.png').default} alt="azure ad registration api permissions" />
    </div>

    *   Within the **Client Application's** App Registration, you need to specify which APIs it needs permission to call.
    *   You go to the "API permissions" section and **Add a permission**, selecting "APIs my organization uses" (or "My APIs") to find the Web API (Resource Application) you registered in step 1.
    *   You then select the specific **delegated permissions** (scopes) that the client application is allowed to request on behalf of a signed-in user (e.g., the `hello` scope exposed in step 2). This step grants the *client application* the *ability to ask* the user for consent to call the API with those permissions.

## Token Flow

After setting up the App Registrations and permissions:

```mermaid
sequenceDiagram
    participant User
    participant "Client Application"
    participant "Azure AD/B2C"
    participant "Protected Web API"

    "Client Application"->>User: 1. Initiate Login Flow<br/>(Redirect Browser)
    activate "Client Application"
    deactivate "Client Application" # Browser handles the redirect

    User->>"Azure AD/B2C": 1. Access Login Endpoint
    activate "Azure AD/B2C"

    User->>"Azure AD/B2C": 2. Authenticate with Credentials

    Note over "Azure AD/B2C": 3. Authenticates User<br/>(Optionally prompts for consent)

    opt User Consent Required (Step 3)
        "Azure AD/B2C"->>User: Prompt for Permissions Consent
        User->>"Azure AD/B2C": Grant Consent
    end

    Note over "Azure AD/B2C": Issues Access Token (Step 4)

    "Azure AD/B2C"-->>"Client Application": 4. Return Access Token<br/>(via Redirect URI)
    deactivate "Azure AD/B2C"
    activate "Client Application" # Client now has the token

    "Client Application"->>"Protected Web API": 5. Call API<br/>(Include Access Token in Header)
    deactivate "Client Application" # Client waits for API response
    activate "Protected Web API"

    Note over "Protected Web API": 6. Validates Access Token<br/>(Issuer, Signature, Scopes, etc.)

    alt 7. If Token Valid and Authorized
        "Protected Web API"-->>"Client Application": Return API Response (Success)
    else If Token Invalid or Unauthorized
         "Protected Web API"-->>"Client Application": Return 401 Unauthorized / 403 Forbidden
    end
    deactivate "Protected Web API"
    activate "Client Application"

    "Client Application"->>User: Present Result
    deactivate "Client Application"
```

1.  The client application initiates a login flow, redirecting the user to the Azure AD/B2C login endpoint.
2.  The user authenticates directly with Azure AD/B2C using their credentials.
3.  Azure AD/B2C authenticates the user and, if required, prompts the user to consent to the permissions (scopes) the client application is requesting (e.g., permission to call the "Payment and Order APIs" with the `hello` scope).
4.  If the user consents, Azure AD/B2C issues an **Access Token** to the client application (often via a redirect to the configured Redirect URI). This token contains information about the user and the granted permissions.
5.  When the client application calls your protected Web API, it includes this Access Token in the request headers (commonly in the `Authorization: Bearer <token>` header).
6.  Your Web API's code (using libraries or built-in authentication middleware in frameworks) validates the incoming Access Token. It checks that the token is valid, issued by the expected identity provider, and contains the necessary scopes (`hello` in the example).
7.  If the token is valid and contains the required permissions, the API allows the request to proceed. Otherwise, it returns an "Unauthorized" (401) response.

This entire process secures your API, ensuring that only requests accompanied by a valid, properly scoped token from a registered client are processed.