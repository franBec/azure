---
sidebar_position: 11
---

# Azure App Service Deployment

Getting your application code onto an Azure App Service instance can be done through several methods. The choice often depends on your development workflow and environment.

## Deployment Methods

There are two main approaches for deploying your code to Azure App Service:

1.  **Automated Deployment (Recommended):**
    *   **How it works:** Integrates directly with a source control repository. When changes are pushed or merged to a configured branch, the code is automatically built and deployed to your App Service.
    *   **Integrations:** Offers out-of-the-box integration with popular services like GitHub, Azure DevOps, Bitbucket, etc.
    *   **Benefits:** Provides Continuous Deployment (CD), ensures consistency, reduces manual steps, and is the **recommended method for production environments**.
    *   **Configuration:** Typically set up via the "Deployment Center" in the App Service blade in the Azure portal.

    <div>
      <img src={require('@site/static/img/azure-compute-solutions/azure-app-service-deployment-deployment-center.png').default} alt="azure app service deployment center" />
    </div>

2.  **Manual Deployment:**
    *   **How it works:** You manually trigger the deployment process.
    *   **Methods:** Several options are available:
        *   **Azure CLI:** Use commands like `az webapp up` or `az webapp deployment source config-zip`.
        *   **Zip Deploy:** Use the Kudu API endpoint (`/api/zipdeploy`) to upload a zip file containing your application code.
        *   **FTP/FTPS:** Upload files directly to the App Service's content share. (Less recommended for production).
        *   **Visual Studio / VS Code:** Use built-in publishing tools or Azure extensions (like the Azure extension for VS Code) for a convenient manual deployment experience.
    *   **Use Cases:** Useful for initial deployments, testing, or simpler workflows where automated CD isn't required or set up.

## Deployment Slots

A key feature for robust App Service deployments, especially in production, is the use of **Deployment Slots**.

<div>
  <img src={require('@site/static/img/azure-compute-solutions/azure-app-service-deployment-slots.png').default} alt="azure app service deployment slots" />
</div>

*   **Hierarchy:** Deployment slots exist *under* an Azure App Service resource. The hierarchy is: App Service Plan → App Service Resource → **Deployment Slots**.
*   **Purpose:** They provide separate environments where different versions of your application can be deployed and tested independently.
*   **Unit of Deployment:** Critically, the **deployment slot** is the unit of deployment in App Service, not the App Service resource itself. You deploy your application code *into* a specific slot.
*   **Default Slot:** Every App Service automatically gets a "production" slot.
*   **Adding Slots:** You can add additional slots (e.g., `staging`, `test`, `UAT`, `v2`) via the portal or deployment tools. Each slot has its own hostname.

### Key Use Cases for Deployment Slots

1.  **Zero-Downtime Deployment (Staging Swap):** This is the most common and recommended use case.
    *   **Process:**
        *   Deploy your new application version to a non-production slot (e.g., the `staging` slot).
        *   Test the application thoroughly in the `staging` slot environment using its specific URL.
        *   Once testing is complete and successful, perform a **slot swap** between the `staging` slot and the `production` slot.
    *   **Swap Mechanism:** A swap is primarily a routing change at the load balancer level. Azure gracefully redirects traffic from the old production slot to the new slot (which is now the production slot) with minimal to zero downtime for end-users.
    *   **Benefits:** Eliminates downtime during deployments, allows for pre-production testing in an environment identical to production, and provides an instant **rollback** capability (swap back if issues are found in the newly swapped production version).

2.  **A/B Testing:**
    *   You can route a percentage of incoming production traffic to a specific slot. This allows you to test a new feature or application version with a subset of users before rolling it out fully.

Deployment slots are fundamental to implementing safe, reliable, and zero-downtime deployments for your web applications on Azure App Service.