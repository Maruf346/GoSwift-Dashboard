type OtpRecord = { code: string; expiresAt: number }

const otpStore: Record<string, OtpRecord> = {}

export function sendOtpMock(email: string) {
  return new Promise<{ ok: boolean; expiresIn: number }>((resolve) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const ttl = 120 // seconds
    otpStore[email] = { code, expiresAt: Date.now() + ttl * 1000 }
    // simulate network
    setTimeout(() => resolve({ ok: true, expiresIn: ttl }), 400)
  })
}

export function verifyOtpMock(email: string, code: string) {
  // Development-only: accept any 6-digit code to make local testing easier.
  return new Promise<{ ok: boolean; message?: string }>((resolve) => {
    setTimeout(() => {
      const rec = otpStore[email]
      if (!rec) return resolve({ ok: false, message: 'No OTP sent' })
      if (Date.now() > rec.expiresAt) return resolve({ ok: false, message: 'OTP expired' })
      if (/^\d{6}$/.test(code)) return resolve({ ok: true })
      if (rec.code === code) return resolve({ ok: true })
      resolve({ ok: false, message: 'Invalid OTP' })
    }, 300)
  })
}

export function updatePasswordMock(email: string, newPassword: string) {
  return new Promise<{ ok: boolean }>((resolve) => {
    // In real app, update DB. Here just simulate.
    setTimeout(() => resolve({ ok: true }), 400)
  })
}
