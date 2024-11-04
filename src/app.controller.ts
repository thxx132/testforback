import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  ValidationPipe,

  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { User as UserModel, Post as PostModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}
  //USER 관련
  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Get('userfeed')
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Post('user')
  async signupUser(
    @Body(ValidationPipe) userData: CreateUserDto,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Post('signin')
  async signinUser(
    @Body(ValidationPipe) userData: AuthUserDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(userData);
  }

  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  test(@GetUser() user: UserModel) {
    console.log('user', user);
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }

  //POST 관련
  @Get('post/:id')
  @UseGuards(AuthGuard('jwt'))
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('postfeed')
  @UseGuards(AuthGuard('jwt'))
  async getAllPosts(): Promise<PostModel[]> {
    return this.postService.posts({});
  }

  @Get('filtered-posts/:searchString')
  @UseGuards(AuthGuard('jwt'))
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('post')
  @UseGuards(AuthGuard('jwt'))
  async createDraft(
    @Body()
    postData: {
      title: string;
      content?: string;
      unit_quantity: number;
      author_id: number;
    },
    @GetUser() user: UserModel,
  ): Promise<PostModel> {
    const { title, content, unit_quantity } = postData;
    return this.postService.createPost({
      title: title,
      content: content,
      unit_quantity: unit_quantity,
      author: {
        connect: { id: user.id },
      },
    });
  }

  @Delete('post/:id')
  @UseGuards(AuthGuard('jwt'))
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
