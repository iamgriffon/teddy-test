import { JwtService } from '@nestjs/jwt'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const JWT_EXPIRATION_TIME = 24 * 60 * 60 * 1000

const jwtService = new JwtService({
  signOptions: { expiresIn: JWT_EXPIRATION_TIME },
  secretOrPrivateKey: process.env.JWT_SECRET
})

export function generateJwt(payload: any) {
  return jwtService.sign(payload)
}

export function verifyJwt(token: string) {
  return jwtService.verify(token, {
    secret: process.env.JWT_SECRET,
    ignoreExpiration: false
  })
}

export function decodeJwt(token: string) {
  return jwtService.decode(token)
}

export async function refreshOrRevokeJwt(token: string) {
  try {
    const payload = await jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
      ignoreExpiration: true
    })

    if (payload && payload.exp) {
      const currentTimeSec = Math.floor(Date.now() / 1000)
      const refreshGracePeriod = 7 * 24 * 60 * 60
      if (currentTimeSec > payload.exp + refreshGracePeriod) {
        return null
      }
    }
    const { iat, exp, ...newPayload } = payload as any
    return await jwtService.signAsync(newPayload)
  } catch (error) {
    return null
  }
}
