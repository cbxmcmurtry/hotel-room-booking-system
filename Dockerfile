# Use a base image with Java runtime
FROM openjdk:17-jdk-alpine

# Set the working directory inside the Docker image
WORKDIR /app

# Copy the JAR file from the target directory to the working directory in the Docker image
COPY target/D387_sample_code-0.0.2-SNAPSHOT.jar /app/D387_sample_code-0.0.2-SNAPSHOT.jar

# Expose the port the application will run on
EXPOSE 8080

# Command to run the JAR file.
CMD ["java", "-jar", "D387_sample_code-0.0.2-SNAPSHOT.jar"]
