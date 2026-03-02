import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('http://localhost:8000/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json()

    if (email === 'test@test.com' && password === 'password') {
      return HttpResponse.json({
        token: 'fake-jwt-token-123',
        user: { id: 1, name: 'Test User', email },
      })
    }

    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  }),

  http.post('http://localhost:8000/api/auth/register', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({
      token: 'fake-jwt-token-456',
      user: { id: 2, name: body.name, email: body.email },
    })
  }),

  http.get('http://localhost:8000/api/auth/me', () => {
    return HttpResponse.json({
      id: 1,
      name: 'Test User',
      email: 'test@test.com',
    })
  }),
]
