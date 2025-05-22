---
sidebar_position: 3
---

# Azure API Management Policies

One of the most powerful features of Azure API Management (APIM) is its ability to apply **Policies**. Policies are a collection of statements that are executed sequentially on requests or responses passing through the APIM gateway. They allow you to add functionality to your APIs without modifying your backend code.

Policies are applied at different stages of request and response processing:

<div>
  <img src={require('@site/static/img/azure-api-management/azure-api-management-policies-stages.png').default} alt="azure api management policies stages" />
</div>

*   **Inbound Processing:** Policies applied here are executed when the request is received *by the APIM gateway* before it is forwarded to the backend service. This is where policies like authentication, rate limiting, IP filtering, or request transformation are typically applied.
*   **Backend Processing:** Policies applied here are executed *before* the request is sent *from the APIM gateway* to the backend service, or *after* the response is received from the backend but *before* outbound processing.
*   **Outbound Processing:** Policies applied here are executed when the response is received *by the APIM gateway* from the backend, before it is sent back to the client. This is where policies like response transformation or data masking are applied.

## Defining Policies

Policies are typically defined using **XML**. APIM provides a policy editor in the portal with pre-configured policy snippets and graphical assistance to help define and configure policies, avoiding the need to write all the XML manually.

<div>
  <img src={require('@site/static/img/azure-api-management/azure-api-management-policies-definition.png').default} alt="azure api management policies definition" />
</div>

Policies can be applied at different scopes: global (all APIs), per Product, per API, or per specific operation within an API.