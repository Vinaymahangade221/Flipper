# ---------- Build stage ----------
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom and sources
COPY pom.xml .
COPY src ./src

# Build the jar
RUN mvn -q -DskipTests clean package

# ---------- Run stage ----------
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Render will set PORT (default 10000)
ENV PORT=10000

# Expose the same port
EXPOSE 10000

# Run Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
