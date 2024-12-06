FROM openjdk:17-jdk-slim

WORKDIR /app

COPY gradlew gradlew
COPY gradlew.bat gradlew.bat
COPY build.gradle settings.gradle ./
COPY gradle gradle
COPY src src

EXPOSE 8080

RUN ./gradlew build --no-daemon

CMD ["java", "-jar", "build/libs/backend-0.0.1-SNAPSHOT.jar"]
