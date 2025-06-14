import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createTestUsers() {
    try {
        // Создаем первого тестового пользователя
        const user1 = await prisma.user.create({
            data: {
                email: 'testuser1@example.com',
                displayName: 'Тестовый Пользователь Один',
                hash: 'hashedpassword1', // В реальном приложении это должен быть безопасно хешированный пароль
                status: 'ACTIVE',
                emailVerified: true
                // Вы можете добавить другие поля по мере необходимости
            }
        })
        console.log('Создан пользователь 1:', user1)

        // Создаем второго тестового пользователя
        const user2 = await prisma.user.create({
            data: {
                email: 'testuser2@example.com',
                displayName: 'Тестовый Пользователь Два',
                hash: 'hashedpassword2', // В реальном приложении это должен быть безопасно хешированный пароль
                status: 'PENDING', // Пример: Пользователь 2 все еще ожидает подтверждения электронной почты
                emailVerificationToken: 'some_verification_token_123'
            }
        })
        console.log('Создан пользователь 2:', user2)
    } catch (error) {
        console.error('Ошибка при создании тестовых пользователей:', error)
    } finally {
        await prisma.$disconnect()
    }
}

createTestUsers()
