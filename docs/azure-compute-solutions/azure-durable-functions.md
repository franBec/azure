---
sidebar_position: 16
---

# Azure Durable Functions

Azure Durable Functions is an extension of Azure Functions that allows you to write **stateful functions** in a serverless environment. It enables you to define complex **orchestrations** and **workflows** using code.

## Stateful vs. Stateless Functions

*   **Traditional Azure Functions:** By default, standard Azure Functions are **stateless**. They are designed for short, independent executions. Storing state directly within the function's memory or filesystem is not reliable because instances can change or disappear between executions. Best practice for standard functions needing state is usually to use external storage like Redis Cache or databases.
*   **Azure Durable Functions:** Durable Functions makes it easy to create **stateful** functions. The Durable Functions extension (which is essentially a library) manages the state, reliability, and execution history of your workflow automatically behind the scenes, primarily using **Azure Storage**.

## Workflows as Code

Durable Functions offers a code-first approach to defining workflows, similar in capability to Azure Logic Apps (which uses a GUI-based designer). This allows developers to build complex sequences and orchestrations using familiar programming languages.

## Common Durable Function Patterns

Durable Functions simplifies the implementation of challenging workflow patterns:

1.  **Function Chaining:**
    <div>
      <img src={require('@site/static/img/azure-compute-solutions/azure-durable-functions-function-chaining.png').default} alt="azure durable functions function chaining" />
    </div>
    *   Executes a sequence of functions in a specific order.
    *   The output of one function is passed as the input to the next function in the chain.
    *   Durable Functions manages the state (the output from each function) between the calls.

2.  **Fan Out / Fan In:**
    <div>
      <img src={require('@site/static/img/azure-compute-solutions/azure-durable-functions-fan-out-fan-in.png').default} alt="azure durable functions fan out fan in" />
    </div>
    *   Executes multiple functions in parallel ("fan out").
    *   Waits for all (or a subset) of the parallel function executions to complete.
    *   Aggregates the results from the parallel executions in a single function ("fan in").
    *   This pattern is significantly complex to implement reliably without a framework like Durable Functions.

Other patterns include Async HTTP APIs (long-running operations triggered by HTTP) and Monitor (flexible recurrence).

## Durable Function Components

A Durable Functions application typically consists of several types of functions:

1.  **Orchestration Functions:**
    *   The core of the workflow. These functions define the sequence of steps using imperative code.
    *   They call other Durable Functions (activity, sub-orchestrator, etc.).
    *   **Crucially, orchestration functions must be deterministic.** They should not perform non-deterministic operations like making HTTP calls directly, getting the current date/time, or using random numbers. These operations should be delegated to Activity Functions.

2.  **Activity Functions:**
    *   These are the tasks or actions performed within the workflow.
    *   They contain the majority of the business logic.
    *   Called *by* orchestration functions.
    *   Activity functions can perform external operations (like database calls, HTTP requests, etc.) and return data.

3.  **Starter Functions:**
    *   Triggered by an event (like an HTTP request, queue message, or timer).
    *   Initiate the execution of an orchestration function.
    *   They use a Durable Functions client binding to start the orchestrator and can optionally return status information.

## Execution Flow

The typical flow starts with a **Starter function** receiving an external event. The Starter function then triggers an **Orchestration function**. The Orchestration function defines the workflow steps, often calling **Activity functions** to perform the actual work. The state and execution history of the orchestration are automatically persisted by the Durable Functions extension in **Azure Storage** tables, queues, and blobs.

By abstracting away the complexities of state management and reliable execution, Durable Functions allows developers to focus on the business logic of their workflows.