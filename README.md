# Q1 — Subscriber Usage API

A simple REST API for recording and retrieving subscriber usage data.

## Tech Stack

* Node.js
* Express.js
* In-memory storage

## Project Structure

```text
subscriber-usage/
├── src/
│   ├── app.js
│   ├── routes/
│   │   └── usage.js
│   └── services/
│       └── usageService.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Running the Application

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

The API runs on:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint               | Description                                      |
| ------ | ---------------------- | ------------------------------------------------ |
| GET    | `/health`              | Check API health                                 |
| POST   | `/usage`               | Create a subscriber usage record                 |
| GET    | `/usage`               | Retrieve all usage records                       |
| GET    | `/usage/:subscriberId` | Retrieve usage records for a specific subscriber |

---

## 1. Health Check

### Request

```http
GET /health
```

Example:

```text
http://localhost:3000/health
```

### Response

```json
{
  "status": "ok"
}
```

HTTP status:

```text
200 OK
```

---

## 2. Create Usage Record

### Request

```http
POST /usage
```

### Request Body

```json
{
  "subscriberId": "SUB01",
  "callMinutes": 40,
  "smsCount": 10,
  "dataUsageMB": 1500
}
```

### Response

```json
{
  "subscriberId": "SUB01",
  "callMinutes": 40,
  "smsCount": 10,
  "dataUsageMB": 1500,
  "timestamp": "2026-09-26T02:00:00.000Z"
}
```

The `timestamp` is generated automatically when the usage record is created.

HTTP status:

```text
201 Created
```

---

## 3. Retrieve All Usage Records

### Request

```http
GET /usage
```

Example:

```text
http://localhost:3000/usage
```

### Response

```json
[
  {
    "subscriberId": "SUB01",
    "callMinutes": 40,
    "smsCount": 10,
    "dataUsageMB": 1500,
    "timestamp": "2026-09-26T02:00:00.000Z"
  }
]
```

HTTP status:

```text
200 OK
```

---

## 4. Retrieve Usage by Subscriber

### Request

```http
GET /usage/:subscriberId
```

Example:

```text
http://localhost:3000/usage/SUB01
```

### Response

```json
[
  {
    "subscriberId": "SUB01",
    "callMinutes": 40,
    "smsCount": 10,
    "dataUsageMB": 1500,
    "timestamp": "2026-09-26T02:00:00.000Z"
  }
]
```

HTTP status:

```text
200 OK
```

---

## Validation

The API validates all required usage fields before creating a record.

| Field          | Validation                                  |
| -------------- | ------------------------------------------- |
| `subscriberId` | Must be a non-empty string                  |
| `callMinutes`  | Must be a number greater than or equal to 0 |
| `smsCount`     | Must be a non-negative integer              |
| `dataUsageMB`  | Must be a number greater than or equal to 0 |

Invalid requests return:

```text
400 Bad Request
```

Example invalid request:

```json
{
  "subscriberId": "SUB02",
  "callMinutes": -10,
  "smsCount": 5,
  "dataUsageMB": 100
}
```

Response:

```json
{
  "message": "callMinutes must be a number greater than or equal to 0"
}
```

## Storage

The API uses an in-memory JavaScript array to store usage records.

This is sufficient for the technical test because persistent database storage is not required.

Since the data is stored in memory, all records are cleared when the application restarts.

## Testing

The API was tested using Insomnia.

The testing process includes:

1. Checking API availability using `GET /health`.
2. Creating usage records using `POST /usage`.
3. Retrieving all records using `GET /usage`.
4. Retrieving records for a specific subscriber using `GET /usage/:subscriberId`.
5. Sending invalid payloads to verify request validation and `400 Bad Request` responses.

The API returned the expected HTTP status codes and response structures during testing.
