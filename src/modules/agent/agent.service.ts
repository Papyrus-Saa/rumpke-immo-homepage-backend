import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './entities/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private agentRepository: Repository<Agent>,
  ) { }

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const agent = this.agentRepository.create(createAgentDto);
    return this.agentRepository.save(agent);
  }

  async findAll(onlyPublic = false, onlyActive = true): Promise<Agent[]> {
    const where: any = {};

    if (onlyPublic) {
      where.is_public = true;
    }

    if (onlyActive) {
      where.is_active = true;
    }

    return this.agentRepository.find({
      where,
      order: { last_name: 'ASC', first_name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Agent> {
    const agent = await this.agentRepository.findOne({
      where: { id },
      relations: ['properties'],
    });

    if (!agent) {
      throw new NotFoundException(`Agent mit ID ${id} nicht gefunden`);
    }

    return agent;
  }

  async update(id: string, updateAgentDto: UpdateAgentDto): Promise<Agent> {
    const agent = await this.findOne(id);
    Object.assign(agent, updateAgentDto);
    return this.agentRepository.save(agent);
  }

  async remove(id: string): Promise<void> {
    const agent = await this.findOne(id);
    await this.agentRepository.remove(agent);
  }
}
