## Build
# Use the official Go image for the development stage
FROM golang:latest as development

# Set the working directory
WORKDIR /app

# Copy the Go source code
COPY . .

# Install dependencies
RUN go get -d -v ./...

# Build the Go server
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Use the official Alpine image for the production stage
FROM alpine:latest as production

# Set the working directory
WORKDIR /root/

# Copy the binary from the development stage
COPY --from=development /app/main .

# Run the binary
CMD ["./main"]
