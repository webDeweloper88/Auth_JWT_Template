import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
	constructor(
		private prisma:PrismaService
	) {}

	async findAll() {
		return this.prisma.user.findMany(
			{
				select: {
					id: true,
					displayName: true,
					email: true,
					role: true,
					emailVerified: true,
					createdAt: true,
					updatedAt: true,
				},
			}
		);
	}

	async findById(id:string){
		const user=await this.prisma.user.findUnique({where:{id}})
		if(!user)	{
			throw new NotFoundException(`Пользователь с ID ${id} не найден`);
		}	
		return user;

	}

}
