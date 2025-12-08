import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,

} from '@nestjs/common';
import { AgentService } from './agent.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@UseGuards(JwtAuthGuard)
@Controller('agent')
export class AgentController {

  constructor(private readonly agentService: AgentService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createAgentDto: CreateAgentDto) {
    try {
      return await this.agentService.create(createAgentDto);
    } catch (error: any) {

      if (error.code === '23505' && error.detail?.includes('email')) {
        throw new BadRequestException({
          errors: [
            { field: 'email', message: 'Diese E-Mail ist bereits registriert.' }
          ]
        });
      }

      if (error instanceof BadRequestException) {
        const response = typeof error.getResponse === 'function' ? error.getResponse() : {};
        const errors =
          typeof response === 'object' && response !== null && 'errors' in response
            ? (response as any).errors
            : [{ field: 'unknown', message: error.message }];
        return {
          statusCode: 400,
          errors,
        };
      }

      throw error;
    }
  }

  @Get()
  findAll(
    @Query('public') onlyPublic?: string,
    @Query('active') onlyActive?: string,
  ) {
    const isPublic = onlyPublic === 'true';
    const isActive = onlyActive !== 'false';
    return this.agentService.findAll(isPublic, isActive);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentService.update(id, updateAgentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentService.remove(id);
  }
}
