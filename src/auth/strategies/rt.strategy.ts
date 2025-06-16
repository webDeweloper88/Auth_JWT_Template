import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AppError } from '@/libs/common/constants/errors'

import { JwtPayload, JwtPayloadWithRt } from '../types'

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'), // Выбрасывает ошибку, если переменная отсутствует
      passReqToCallback: true
    })
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
    const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim()

    if (!refreshToken) {
      throw new ForbiddenException(AppError.refreshTokenInvalid)
    }

    return {
      ...payload,
      refreshToken
    }
  }
}
