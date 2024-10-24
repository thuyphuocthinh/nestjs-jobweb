import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  // async create(email: string, password: string, name: string) {
  //   const hashPassword = this.hashPassword(password);
  //   const user = await this.userModel.create({email, password: hashPassword, name});
  //   return user;
  // }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = this.hashPassword(createUserDto.password);
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById({_id: new Types.ObjectId(id)}).lean().select("-password");
      if(user) {
        return user;
      }
    } catch (error) {
      return {
        errMessage: error.message,
        statusCode: 404
      };
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      await this.userModel.updateOne({_id: new Types.ObjectId(updateUserDto.id)}, updateUserDto)
      return {
        status: 200,
        message: "Success"
      }
    } catch (error) {
      return {
        status: 400,
        message: "Error"
      };
    }
  }

  async remove(id: string) {
    try {
      await this.userModel.deleteOne({_id: new Types.ObjectId(id)})
      return {
        status: 200,
        message: "Success"
      }
    } catch (error) {
      return {
        status: 400,
        message: "Error"
      };
    }
  }
}
