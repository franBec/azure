---
sidebar_position: 15
---

# Azure Functions Custom Handlers

Azure Functions Custom Handlers allow you to run Azure Functions using languages that are **not natively supported** by offloading the execution process to an external web server that you provide.

## How Custom Handlers Work

<div>
  <img src={require('@site/static/img/azure-compute-solutions/azure-functions-custom-handlers.png').default} alt="azure functions custom handlers" />
</div>

The mechanism for custom handlers involves the Azure Functions host interacting with your custom web server:

1.  The Azure Functions host receives a trigger event and a request payload.
2.  The host **offloads** this request payload (which includes trigger data and input binding data) to your external web server.
3.  Your code, written in the unsupported language (e.g., Go, Rust, Deno, etc.), runs within that external web server.
4.  Your web server processes the request and returns a response payload (which includes output binding data and HTTP responses if applicable) back to the Azure Functions host.
5.  The Functions host receives this response payload and handles the output bindings and overall function execution result.

Essentially, you implement an HTTP endpoint that the Functions host calls for each execution.

## Benefits

The primary benefit of using Custom Handlers is the ability to use a much wider range of programming languages for your serverless functions, extending beyond the officially supported list.

This allows you to leverage existing codebases, use preferred languages, or work with newer language runtimes.

## Configuration

When creating an Azure Function App resource that will use custom handlers, you won't typically select the unsupported language directly in the initial setup dropdowns. The transcript suggests a method where you might initially choose a standard supported stack like `.NET Core`, and then configure the custom handler settings afterward.

The core configuration involves telling the Functions host the command to run your custom web server and the port it listens to on, usually done via Application Settings or environment variables.

By using Custom Handlers, developers can build event-driven applications in virtually any language capable of running a web server and processing HTTP requests.