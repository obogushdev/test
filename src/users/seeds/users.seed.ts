import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { User } from '../entities/user.entity';
import * as bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';

const NUMBER_OF_ITEMS = 10;
const salt = 10;

@Seeder({
    model: User,
    unique: ['id'],
    logging: true,
    disabled: true,
})
export class SeedUser implements OnSeederInit {
    run(): User[] {
        console.log("__SeedUser__")
        const data = []
        // data.push(
        //     {
        //         name: `testUser`,
        //         email: `test@mail.com`,
        //         password: `test`
        //     })
                        
        for (let i = 0; i < NUMBER_OF_ITEMS-1; i++) {
            data.push(
                {
                    name: `${faker.name.firstName()} ${faker.name.lastName()} ${i}`,
                    email: faker.internet.email().toLowerCase(),
                    password: bcrypt.hashSync(faker.internet.password(), salt)
                }
            );
        }
        return data as User[];
    }
}