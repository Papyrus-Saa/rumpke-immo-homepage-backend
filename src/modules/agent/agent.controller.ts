import {
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

@Controller('agent')
export class AgentController {

  constructor(private readonly agentService: AgentService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    console.log('BODY RECIBIDO:', JSON.stringify(createAgentDto));
    return this.agentService.create(createAgentDto);
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
