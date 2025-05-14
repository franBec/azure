---
sidebar_position: 8
---

# Azure App Service

Azure App Service is a platform that allows you to host web applications, REST APIs, and mobile backends. It was one of the first services created on Azure, previously known as Cloud Services.

## When to Use App Service

App Service is particularly useful for:

*   Hosting traditional, classic, and N-tiered web applications.
*   Applications that are *not* using a microservices architecture (it's often recommended to start with App Service before moving to microservices if needed).

It's significantly more recommended than hosting web applications directly on Infrastructure-as-a-Service (IaaS) Virtual Machines, which is generally not considered a good idea for typical web workloads, due to the overhead of managing the underlying OS and infrastructure.

App Service provides benefits like developer productivity, scalability, and the ability to handle high load out-of-the-box.

## Key Features

Azure App Service includes several built-in features beneficial for developers:

*   **Built-in Autoscale:** Configure automatic scaling rules to add or remove instances of your application based on metrics like CPU percentage.
*   **Deployment Slots:** Create separate environments (like staging, production, test) to deploy and test application versions before swapping them into production.
*   **Continuous Deployment (CD):** Provides seamless integration with source control repositories (such as GitHub, Bitbucket, Azure DevOps) for automated deployments whenever code changes are pushed. This offers out-of-the-box CD with minimal effort.
*   **Container Support:** Ability to host containerized applications (Docker images) directly on App Service, in addition to traditional code deployments.

These features make Azure App Service a powerful and efficient platform for hosting web-based workloads on Azure.