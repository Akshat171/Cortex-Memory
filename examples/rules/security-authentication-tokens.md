# Authentication Token Structure

**Category:** security

## Rule

All authentication tokens in this project MUST use JWT with RS256 (RSA) signing algorithm. Never use HS256 (HMAC) for production tokens.

Required claims:
- `user_id` - Unique user identifier
- `roles` - Array of user roles
- `exp` - Expiration timestamp (max 24 hours)
- `iat` - Issued at timestamp

Optional claims:
- `email` - User email address
- `org_id` - Organization identifier

## Examples

**Good:**
```typescript
const token = jwt.sign(
  {
    user_id: user.id,
    roles: user.roles,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    iat: Math.floor(Date.now() / 1000)
  },
  privateKey,
  { algorithm: 'RS256' }
);
```

**Bad:**
```typescript
// ❌ Never use HS256
const token = jwt.sign(payload, secret, { algorithm: 'HS256' });

// ❌ Missing required claims
const token = jwt.sign({ user_id: user.id }, privateKey);

// ❌ Expiration too long
const token = jwt.sign(
  { ...payload, exp: Date.now() + (7 * 24 * 60 * 60) },
  privateKey
);
```

## Why This Matters

- RS256 provides better security with public/private key pairs
- Standardized claims ensure consistency across services
- 24-hour expiration limits exposure if tokens are compromised

---
*Created: 2024-01-10T09:00:00Z*
*Updated: 2024-01-15T10:30:00Z*
