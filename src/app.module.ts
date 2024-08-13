import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), 
        DatabaseModule, 
        AuthModule, UsersModule, GroupsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
