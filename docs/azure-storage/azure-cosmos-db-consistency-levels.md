---
sidebar_position: 7
---

# Azure Cosmos DB Consistency Levels

Azure Cosmos DB is a globally distributed database system. Due to its distributed nature, where data is placed into different physical partitions, potentially across the globe, we need to consider **consistency**. Consistency defines the trade-off between how quickly a client receives confirmation for a write operation and how up-to-date the data they read is across all replicas.

Essentially, you trade off **Consistency** for **Availability** and **Latency**:

*   **Higher Consistency** (e.g., Strong) means reads are guaranteed to be more up to date, but writes take longer (higher latency) because they must wait for more replication acknowledgements, potentially impacting availability if a replica is temporarily unavailable.
*   **Lower Consistency** (e.g., Eventual) means writes are faster (lower latency) and availability is higher (less waiting), but reads might return older or slightly out-of-order data.

Azure Cosmos DB offers five distinct consistency levels, providing a spectrum of choices:

| Consistency Level     | Description                                                            | Guarantee                                                                                                                                 | Key Aspects / Notes                                                                                                                                                                         |
|-----------------------|------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Strong**            | The most consistent level.                                             | Reads always return the most recent committed version. Data replicated **synchronously** to **all** replicas before write acknowledgment. | Highest write latency, potentially lower availability (replica failure blocks writes). **Exam Note:** Likely tested on AZ-204.                                                              |
| **Bounded Staleness** | Less strict than Strong, but provides bounds on how stale data can be. | Reads are no older than a predefined maximum number of versions OR a predefined time interval.                                            | You define the "bound" (versions or time).                                                                                                                                                  |
| **Session**           | The **default** and most widely used level.                            | Within a *single client session*, reads respect write order and never see stale data. Clients *outside* the session might see stale data. | Offers a good balance (consistency, latency, availability). **Exam Note:** Default, practical, likely tested on AZ-204.                                                                     |
| **Consistent Prefix** | Provides order guarantees, but not recency.                            | Reads are guaranteed to never see out-of-order writes (e.g., never B before A if writes were A, B, C).                                    | Reads *can* still be stale – you might read A and B even if C is written, but you won't see C before A and B.                                                                               |
| **Eventual**          | The least consistent level.                                            | Offers **no guarantees** on the order or recency of reads. Replicas converge *eventually*.                                                | **Best read performance/latency** and highest availability. Writes acknowledged immediately. Suitable for apps tolerant of stale data (social feeds, counts where accuracy isn't critical). |

Understanding the core trade-off and the guarantees provided by **Strong** and **Session** consistency is particularly important for the AZ-204 exam.