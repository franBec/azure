---
sidebar_position: 2
---

# Azure API Management Products and Subscriptions

Azure API Management uses the concepts of **Products** and **Subscriptions** to control access to your APIs and manage their usage.

## Products

*   **What they are:** A **Product** in API Management is essentially a container used to **group one or more APIs** together.
*   **Purpose:** Grouping APIs into products allows you to define consistent configuration, policies, and access control for the entire group.
*   **Benefits:** You can apply policies (like rate limits, authentication requirements) and manage subscriptions at the product level, rather than configuring each API individually.

For example, you might have a "Basic Product" that includes a limited set of APIs and a "Premium Product" that includes all APIs with higher usage quotas.

## Subscriptions

*   **What they are:** A **Subscription** represents an account for a specific consumer (developer, application, or user) that has been granted permission to use one or more Products. Consumers **subscribe** to a Product.
*   **How they work:** When a consumer subscribes to a product, they are typically issued a **Subscription Key**. This key must be included in the HTTP requests when calling any API that is part of that product. API Management validates the subscription key before allowing the request to proceed to the backend.
*   **Benefits:** Subscriptions provide a way to:
    *   Control who can access your APIs.
    *   Track API usage per subscriber.
    *   Apply product-level policies (like quotas or throttling) to individual subscribers.

API Management allows you to manage these subscribers and their associated keys, granting or revoking access as needed.

## Access Control (Admin, Developer, Guest)

Within an API Management instance, different roles can be defined, and access control policies can be applied to determine who can manage or access components like products and APIs:

*   **Administrators:** Typically the users who manage the API Management service itself (configure settings, deploy APIs, manage users/groups).
*   **Developers:** Users who might be responsible for adding/configuring backend APIs within APIM.
*   **Guests (Consumers):** The external users or client applications that interact with your published APIs by using subscription keys obtained through a product subscription.

You can define policies to restrict access to certain APIs or products based on these user roles (e.g., making an API only visible or accessible to authenticated Administrators or Developers, while Guests access published products).

By combining APIs into Products and managing access through Subscriptions, Azure API Management provides a flexible and powerful system for publishing and governing your API ecosystem.