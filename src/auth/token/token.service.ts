import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { AppError } from '@/libs/common/constants/errors'

import { JwtPayload, Tokens } from '../types'

@Injectable()
export class TokenService {
  constructor(
    private jwtServices: JwtService,
    private config: ConfigService
  ) {}

  async generateTokens(paload: JwtPayload): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtServices.signAsync(paload, {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.config.getOrThrow<string>('JWT_ACCESS_TOKEN_EXPIRATION')
      }),
      this.jwtServices.signAsync(paload, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.config.getOrThrow<string>(
          'JWT_REFRESH_TOKEN_EXPIRATION'
        )
      })
    ])

    return {
      access_token,
      refresh_token
    }
  }

  async validateAccessToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtServices.verifyAsync<JwtPayload>(token, {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET')
      })
    } catch (error) {
      throw new Error(AppError.accessTokenInvalid)
    }
  }

  async validateRefreshToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtServices.verifyAsync<JwtPayload>(token, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET')
      })
    } catch (error) {
      throw new Error(AppError.refreshTokenInvalid)
    }
  }
}
