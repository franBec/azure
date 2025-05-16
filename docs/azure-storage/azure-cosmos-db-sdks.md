---
sidebar_position: 6
---

# Azure Cosmos DB SDKs

While the Azure portal's Data Explorer is useful for basic exploration and configuration, real-world applications interact with Azure Cosmos DB programmatically using Software Development Kits (SDKs).

Azure provides SDKs for popular languages like .NET, Java, Node.js, Python, and others. These SDKs allow your application code to connect to your Cosmos DB account and perform CRUD operations on databases, containers, and items, as well as execute queries.

## Java Spring Boot SDK Example

This example demonstrates interacting with Cosmos DB within a Spring Boot application using the `com.azure::azure-cosmos` Maven/Gradle dependency. The typical flow involves configuring the connection and then getting references to the database and container objects.

1. Add the Dependency

    ```groovy title="build.gradle"
    implementation 'com.azure:azure-cosmos:LATEST_VERSION' // Use the latest stable version
    ```

2. Configure Cosmos DB Connection in application.properties or application.yml

    ```application.properties title="application.properties"
    cosmos.uri=YOUR_COSMOS_DB_ENDPOINT_URI
    cosmos.key=YOUR_COSMOS_DB_PRIMARY_KEY
    cosmos.databaseId=YourDatabaseName
    cosmos.containerId=YourContainerName
    cosmos.partitionKeyPath=/yourPartitionKey // Example: /id or /category
    ```

3. Java Code (e.g., in a Spring @Component or @Service)

    ```java
    package com.example.cosmosdemo; // Replace with your package
    
    import com.azure.cosmos.CosmosClient;
    import com.azure.cosmos.CosmosClientBuilder;
    import com.azure.cosmos.CosmosDatabase;
    import com.azure.cosmos.CosmosContainer;
    import com.azure.cosmos.models.CosmosContainerProperties;
    import com.azure.cosmos.models.ThroughputProperties; // Needed if creating container
    import com.azure.cosmos.CosmosException;
    
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.stereotype.Component; // Or @Service
    import javax.annotation.PostConstruct; // Use jakarta.annotation.PostConstruct for Spring Boot 3+
    import javax.annotation.PreDestroy; // Use jakarta.annotation.PreDestroy for Spring Boot 3+
    
    
    @Component // Or @Service
    public class CosmosDbClientInitializer {
    
        // Inject configuration values from application.properties
        @Value("${cosmos.uri}")
        private String cosmosUri;
    
        @Value("${cosmos.key}")
        private String cosmosKey;
    
        @Value("${cosmos.databaseId}")
        private String databaseId;
    
        @Value("${cosmos.containerId}")
        private String containerId;
    
        @Value("${cosmos.partitionKeyPath}")
        private String partitionKeyPath;
    
        // Declare the CosmosClient instance
        private CosmosClient cosmosClient;
    
        // Declare the Database and Container references
        private CosmosDatabase database;
        private CosmosContainer container;
    
        // @PostConstruct is called by Spring after the bean is created and dependencies are injected
        @PostConstruct
        public void initializeCosmosClient() {
            System.out.println("Initializing Cosmos DB Client...");
            try {
                // Step 3: Create a CosmosClient
                // This is the entry point for all programmatic interaction with your Cosmos DB account.
                // Spring will manage the lifecycle of this component, so we create the client here.
                this.cosmosClient = new CosmosClientBuilder()
                    .endpoint(cosmosUri)
                    .key(cosmosKey)
                    .buildClient();
    
                System.out.println("CosmosClient created.");
    
                // Step 4: Get or Create Database
                // This references or creates the database within the account.
                // We use createDatabaseIfNotExists() for simplicity in the example.
                // In a real app, you might create separately or use getDatabase().
                this.database = cosmosClient.createDatabaseIfNotExists(databaseId).getDatabase();
                System.out.println("Database '" + database.getId() + "' obtained/created.");
    
                // If you know the database exists and just need a reference, you can use:
                // this.database = cosmosClient.getDatabase(databaseId);
    
                // Step 5: Get or Create Container
                // This references or creates a container within the database.
                // createContainerIfNotExists requires the container name and partition key path.
                // You might also specify throughput here if creating the container.
                this.container = database.createContainerIfNotExists(containerId, partitionKeyPath).getContainer();
                System.out.println("Container '" + container.getId() + "' obtained/created.");
    
                // If you know the container exists and just need a reference, you can use:
                // this.container = database.getContainer(containerId);
    
    
                System.out.println("\nBasic Cosmos DB Resource Hierarchy Navigation Complete.");
                System.out.println("Cosmos Client and Container references are available in this component.");
    
                // Now you have the 'container' object, you can perform data operations like:
                // - Create items: container.createItem(...)
                // - Read items: container.readItem(...)
                // - Query items: container.queryItems(...)
                // - Replace items: container.replaceItem(...)
                // - Delete items: container.deleteItem(...)
    
            } catch (CosmosException e) {
                // Handle specific Cosmos DB errors
                System.err.println("Cosmos DB Exception: " + e.getMessage());
                e.printStackTrace();
                // Depending on the app, you might re-throw, log, or attempt retry
            } catch (Exception e) {
                // Handle other potential exceptions
                 System.err.println("An unexpected error occurred: " + e.getMessage());
                 e.printStackTrace();
            }
        }
    
        // @PreDestroy is called by Spring before the bean is destroyed (e.g., app shutdown)
        @PreDestroy
        public void closeCosmosClient() {
            if (this.cosmosClient != null) {
                System.out.println("Closing Cosmos DB Client...");
                this.cosmosClient.close();
                System.out.println("Cosmos DB Client closed.");
            }
        }
    
        // You can provide getter methods to expose the container or database objects
        // to other parts of your Spring application.
        public CosmosContainer getContainer() {
            return container;
        }
    
        public CosmosDatabase getDatabase() {
            return database;
        }
    }
    ```

Once you have a `Container` object, you can then perform operations (like reading, writing, or querying items) against that specific container.

This pattern of creating a client and then referencing database/container objects is standard across many database SDKs, making it familiar to developers.

## Exam Relevance

While the AZ-204 exam is not expected to require writing code knowledge using a particular Cosmos DB SDK, it is important to understand:

*   That **SDKs** are the standard way for applications to interact with Cosmos DB.
*   The concept of instantiating a main **client object** (like the `CosmosClient` in .NET) as the starting point for programmatic access to the database and containers.

Understanding this fundamental approach to programmatic interaction is key for developers building applications that use Azure Cosmos DB.