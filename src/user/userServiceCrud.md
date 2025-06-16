# UserService — Управление пользователями (CRUD + состояния)

### Функции и их назначение

| **Функция**                            | **Назначение**                                   |
| -------------------------------------- | ------------------------------------------------ |
| `findById(id: string)`                 | Найти пользователя по ID                         |
| `findByEmail(email: string)`           | Найти пользователя по email                      |
| `createUser(dto: CreateUserDto)`       | Создать нового пользователя                      |
| `updateProfile(id, dto)`               | Обновить имя, аватар и т.п.                      |
| `updatePassword(id, newHash)`          | Обновить хеш пароля                              |
| `setRefreshTokenHash(id, hash)`        | Сохранить хеш refresh токена                     |
| `removeRefreshTokenHash(id)`           | Удалить хеш refresh токена (logout)              |
| `setEmailVerificationToken(id, token)` | Сохранить токен для email подтверждения          |
| `verifyEmail(token)`                   | Найти пользователя по токену и подтвердить email |
| `updateRole(id, role)`                 | Обновить роль пользователя (user/admin)          |
| `updateStatus(id, status)`             | Изменить статус: ACTIVE, BLOCKED и т.п.          |
| `deleteUser(id)`                       | Удалить пользователя из базы (жёстко)            |

---

# AuthService — Регистрация, логин, токены, logout

### Функции и их назначение

| **Функция**                                     | **Назначение**                                           |
| ----------------------------------------------- | -------------------------------------------------------- |
| `register(dto: RegisterDto)`                    | Создать пользователя, выдать токены                      |
| `login(dto: LoginDto)`                          | Проверить email/пароль, выдать токены                    |
| `logout(userId: string)`                        | Удалить refresh токен из базы                            |
| `refreshTokens(userId: string, rt: string)`     | Проверить refresh токен, выдать новые                    |
| `resendVerificationEmail(userId: string)`       | Повторно отправить токен подтверждения email             |
| `validateUser(email, password)` _(private)_     | Проверить логин/пароль — вернуть пользователя или ошибку |
| `getTokens(userId, email)` _(private)_          | Генерировать пару токенов (через TokenService)           |
| `updateRefreshTokenHash(id, token)` _(private)_ | Хешировать и сохранить refresh токен                     |
| `throwIfUserExists(email)` _(private)_          | Проверить наличие пользователя и кинуть ошибку           |
| `throwIfBlocked(user)` _(private)_              | Проверить, заблокирован ли пользователь                  |
