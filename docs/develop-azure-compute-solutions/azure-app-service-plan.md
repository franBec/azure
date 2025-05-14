---
sidebar_position: 9
---

# Azure App Service Plan

Azure App Services (your web applications, APIs, etc.) are hosted within an **Azure App Service Plan**. The App Service Plan defines the underlying compute resources and characteristics that your App Services will use.

## What an App Service Plan Represents

An App Service Plan is essentially the underlying server farm or hosting environment for your applications. It consists of:

*   **Worker Nodes (VMs):** The virtual machines where your application code actually runs.
*   **Front Ends (Load Balancers):** Distribute incoming traffic to the worker nodes.
*   **File Servers:** Provide storage for application content.
*   Another supporting infrastructure.

This environment is often a **multi-tenant** environment, meaning the underlying infrastructure (like load balancers, file servers) is shared among multiple Azure customers for cost efficiency. However, the degree of sharing varies significantly by the pricing tier.

## What an App Service Plan Defines

The App Service Plan determines several critical aspects of your hosting environment:

*   **Region:** The geographic location where the plan and the apps hosted within it reside.
*   **Number of Instances:** How many worker nodes are available to run your application (this can be scaled manually or automatically).
*   **Pricing Tier:** This is the most important factor, defining the available features, performance, and the level of isolation (shared vs. dedicated vs. isolated compute).

## Pricing Tiers

Azure App Service offers various pricing tiers categorized for different workloads (Dev/Test, Production, Isolated). These tiers dictate the cost, features, and the nature of the underlying compute:

1.  **Shared Compute (Dev/Test):**
    *   Applications run on the same Azure VM instance as other customers' apps.
    *   Most underlying resources (VMs, network, storage) are shared.
    *   **Not recommended for production workloads.**

2.  **Dedicated Compute (Dev/Test & Production):**
    *   Your applications run on dedicated VMs allocated specifically for you.
    *   Network and some other resources are still shared (multi-tenant at a higher level).
    *   Includes different levels:
        *   **Basic:** Dedicated VMs, but **does not support Autoscale**. Categorized for Dev/Test.
        *   **Standard:** Dedicated VMs, supports **Autoscale**, but **does not support Private Endpoints**. Categorized for Production.
        *   **Premium:** Dedicated VMs, supports **Autoscale** and **Private Endpoints**, offers stronger VM specs. Categorized for Production.
    *   Higher tiers generally offer more powerful VMs and allow for a greater number of instances.

3.  **Isolated (Isolated Workloads):**
    *   Provides a fully **dedicated Virtual Network** and dedicated compute resources.
    *   This is a **single-tenant** environment, completely isolated from other customers.
    *   Offers the highest level of isolation, security, and scale.

## Relationship with App Services

*   A single App Service Plan can host **multiple Azure App Service applications**.
*   All apps hosted within the same plan share the resources allocated by that plan (region, instances, tier, scaling settings).
*   If you scale up (change tier) or scale out (add instances) the App Service Plan, *all* applications within that plan benefit from those changes.

Understanding the App Service Plan and its various tiers is crucial for selecting the appropriate hosting environment for your web applications based on their requirements for performance, scale, features, and isolation.