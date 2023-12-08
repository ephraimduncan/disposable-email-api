## Is-Disposable-Email API

This API allows you to check if an email address is from a disposable email service.

> https://is-disposable-email.ephraimduncan68.workers.dev/

### Development

#### Clone the repository

```
git clone https://github.com/dephraiim/disposable-email-api.git
cd disposable-email-api
pnpm install
pnpm run dev
```

#### Deploy to Cloudflare Workers

```
pnpm run deploy
```

### Usage

#### GET /

This endpoint returns information about the API.

**Response:**

```json
{
  "name": "is-disposable-email",
  "version": "1.0.0"
}
```

#### POST /

This endpoint checks if an email address is disposable.

**Request Body:**

```json
{
  "email": "your_email_address@example.com"
}
```

**Response:**

```json
{
  "email": "your_email_address@example.com",
  "isDisposable": true|false,
  "isAllowedList": true|false,
  "status": "success",
  "message": "Email is from a disposable email service",
  "timestamp": "2023-12-08T20:42:00.000Z"
}
```

**Response Codes:**

- 200: The request was successful.
- 400: The request was invalid.
- 500: An internal server error occurred.

### Example Usage

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "test@example.com"}' https://is-disposable-email.ephraimduncan68.workers.dev/
```
