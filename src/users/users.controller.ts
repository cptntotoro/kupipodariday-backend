import {Body, Controller, Get, Header, HttpCode, Param, Patch, Post, Put, Redirect, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import {UserProfileResponseDto} from "./dto/user-profile-response.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Get('me')
  getCurrentUser(): UserProfileResponseDto {
    return this.userService.getCurrentUser();
  }

  @Patch('me')
  updateCurrentUser(@Body() updateUserDto: UpdateUserDto): UserProfileResponseDto {
    // Валидировать тело

    const name = updateUserDto?.name;
    return;

  }

  @Get('me/wishes')
  getCurrentUserWishes(): string {
    return this.appService.getHello();
    // [
    //   {
    //     "id": 0,
    //     "createdAt": "2025-08-14T11:48:48.602Z",
    //     "updatedAt": "2025-08-14T11:48:48.602Z",
    //     "name": "string",
    //     "link": "string",
    //     "image": "string",
    //     "price": 1,
    //     "raised": 1,
    //     "copied": 0,
    //     "description": "string",
    //     "owner": {
    //       "id": 5,
    //       "username": "user",
    //       "about": "Пока ничего не рассказал о себе",
    //       "avatar": "https://i.pravatar.cc/300",
    //       "createdAt": "2025-08-14T11:48:48.602Z",
    //       "updatedAt": "2025-08-14T11:48:48.602Z"
    //     },
    //     "offers": [
    //       {
    //         "id": 0,
    //         "createdAt": "2025-08-14T11:48:48.602Z",
    //         "updatedAt": "2025-08-14T11:48:48.602Z",
    //         "item": "string",
    //         "amount": 0,
    //         "hidden": true,
    //         "user": {
    //           "id": 5,
    //           "username": "user",
    //           "about": "Пока ничего не рассказал о себе",
    //           "avatar": "https://i.pravatar.cc/300",
    //           "email": "user@yandex.ru",
    //           "createdAt": "2025-08-14T11:48:48.602Z",
    //           "updatedAt": "2025-08-14T11:48:48.602Z",
    //           "wishes": [
    //             "string"
    //           ],
    //           "offers": [
    //             "string"
    //           ],
    //           "wishlists": [
    //             {
    //               "id": 0,
    //               "createdAt": "2025-08-14T11:48:48.602Z",
    //               "updatedAt": "2025-08-14T11:48:48.602Z",
    //               "name": "string",
    //               "image": "string",
    //               "owner": {
    //                 "id": 5,
    //                 "username": "user",
    //                 "about": "Пока ничего не рассказал о себе",
    //                 "avatar": "https://i.pravatar.cc/300",
    //                 "createdAt": "2025-08-14T11:48:48.602Z",
    //                 "updatedAt": "2025-08-14T11:48:48.602Z"
    //               },
    //               "items": [
    //                 {
    //                   "id": 0,
    //                   "createdAt": "2025-08-14T11:48:48.602Z",
    //                   "updatedAt": "2025-08-14T11:48:48.602Z",
    //                   "name": "string",
    //                   "link": "string",
    //                   "image": "string",
    //                   "price": 1,
    //                   "raised": 1,
    //                   "copied": 0,
    //                   "description": "string"
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       }
    //     ]
    //   }
    // ]
  }

  @Get(':username')
  getUserByUsername(@Param('username') username: string): string {
    return this.appService.getHello();
    // {
    //   "id": 5,
    //   "username": "user",
    //   "about": "Пока ничего не рассказал о себе",
    //   "avatar": "https://i.pravatar.cc/300",
    //   "createdAt": "2025-08-14T11:51:11.788Z",
    //   "updatedAt": "2025-08-14T11:51:11.788Z"
    // }
  }

  @Get(':username/wishes')
  getUserWishesByUsername(@Param('username') username: string): string {
    return this.appService.getHello();
    // [
    //   {
    //     "id": 0,
    //     "createdAt": "2025-08-14T11:52:11.879Z",
    //     "updatedAt": "2025-08-14T11:52:11.879Z",
    //     "name": "string",
    //     "link": "string",
    //     "image": "string",
    //     "price": 1,
    //     "raised": 1,
    //     "copied": 0,
    //     "description": "string",
    //     "offers": [
    //       {
    //         "id": 0,
    //         "createdAt": "2025-08-14T11:52:11.879Z",
    //         "updatedAt": "2025-08-14T11:52:11.879Z",
    //         "item": "string",
    //         "amount": 0,
    //         "hidden": true,
    //         "user": {
    //           "id": 5,
    //           "username": "user",
    //           "about": "Пока ничего не рассказал о себе",
    //           "avatar": "https://i.pravatar.cc/300",
    //           "email": "user@yandex.ru",
    //           "createdAt": "2025-08-14T11:52:11.879Z",
    //           "updatedAt": "2025-08-14T11:52:11.879Z",
    //           "wishes": [
    //             "string"
    //           ],
    //           "offers": [
    //             "string"
    //           ],
    //           "wishlists": [
    //             {
    //               "id": 0,
    //               "createdAt": "2025-08-14T11:52:11.879Z",
    //               "updatedAt": "2025-08-14T11:52:11.879Z",
    //               "name": "string",
    //               "image": "string",
    //               "owner": {
    //                 "id": 5,
    //                 "username": "user",
    //                 "about": "Пока ничего не рассказал о себе",
    //                 "avatar": "https://i.pravatar.cc/300",
    //                 "createdAt": "2025-08-14T11:52:11.879Z",
    //                 "updatedAt": "2025-08-14T11:52:11.879Z"
    //               },
    //               "items": [
    //                 {
    //                   "id": 0,
    //                   "createdAt": "2025-08-14T11:52:11.879Z",
    //                   "updatedAt": "2025-08-14T11:52:11.879Z",
    //                   "name": "string",
    //                   "link": "string",
    //                   "image": "string",
    //                   "price": 1,
    //                   "raised": 1,
    //                   "copied": 0,
    //                   "description": "string"
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       }
    //     ]
    //   }
    // ]
  }

  @Post('find')
  @HttpCode(201)
  findUser(@Body() body: { [key: string]: unknown }): string {
    const query = body?.query;

    // [
    //   {
    //     "id": 5,
    //     "username": "user",
    //     "about": "Пока ничего не рассказал о себе",
    //     "avatar": "https://i.pravatar.cc/300",
    //     "email": "user@yandex.ru",
    //     "createdAt": "2025-08-14T11:52:39.097Z",
    //     "updatedAt": "2025-08-14T11:52:39.097Z"
    //   }
    // ]
  }
}
