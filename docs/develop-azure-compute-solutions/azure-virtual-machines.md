---
sidebar_position: 1
---

# Azure Virtual Machines

When provisioning Azure Virtual Machines (VMs), especially when considering them for hosting applications (although often not the recommended approach for modern cloud development), several design considerations are crucial.

## Key Design Considerations

Before creating a VM, consider the workload requirements based on three main factors:

1.  **CPU:** For process-intensive tasks, choose a **compute-optimized** VM size. These have a higher ratio of CPU to memory.
2.  **Memory:** For workloads that require significant memory, such as databases, choose a **memory-optimized** VM size.
3.  **IOPS (Input/Output Operations Per Second):** This is a unit of measurement for the performance of the underlying storage (SSD/HDD). Consider your application's storage read/write needs when selecting the VM series and attached disk types.

## Ensuring High Availability (HA)

As a developer, it's important to understand the options for ensuring the high availability of applications running on VMs. Azure provides several ways to achieve this for VMs:

| Azure HA/DR Option            | Description                                                                                                                      | Protection Scope                                                                                                                                              |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Availability Sets**         | Distributes VMs across different physical server racks *within the same data center*. Uses Fault Domains & Update Groups.        | Failures affecting a single rack (power, network). Provides **HA *within a single data center***.                                                             |
| **Availability Zones**        | Replicates VMs across physically separate data centers *within the same Azure region*. Each zone has independent infrastructure. | Failures affecting an entire data center within the region. Provides **HA within a region** but *not* across regions (no protection for region-wide failure). |
| **Azure Site Recovery (ASR)** | A separate Azure service that enables replication of VMs to a *different Azure region* (using Recovery Services Vaults).         | **Region-wide disasters**. Provides **disaster recovery** capabilities (failover to a secondary region).                                                      |

## Availability Options During VM Provisioning

When creating a VM in the Azure portal (or via ARM templates/IaC), you select the desired availability option:

*   **No infrastructure redundancy required:** No built-in HA protection for this specific VM instance.
*   **Availability Set:** Places the VM into a selected (or new) Availability Set.
*   **Availability Zone:** Pins the VM to a specific Availability Zone within the selected region.
*   **Virtual Machine Scale Set:** Creates a group of identical VMs (often behind a load balancer) which inherently provides HA and auto-scaling capabilities.

<div>
  <img src={require('@site/static/img/develop-azure-compute-solutions/azure-virtual-machines-availability-options.png').default} alt="azure virtual machines availability options" />
</div>

Understanding these options is key to designing resilient compute solutions on Azure.