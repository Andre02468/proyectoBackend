import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repartidor, RepartidorDocument } from './schemas/repartidor.schema';
import { CreateRepartidorDto, UpdateRepartidorDto } from './repartidor.dto';

@Injectable()
export class RepartidorService {
  constructor(
    @InjectModel(Repartidor.name) private repartidorModel: Model<RepartidorDocument>,
  ) {}

  async create(createRepartidorDto: CreateRepartidorDto): Promise<Repartidor> {
    const newRepartidor = new this.repartidorModel(createRepartidorDto);
    return newRepartidor.save();
  }

  async findAll(): Promise<Repartidor[]> {
    return this.repartidorModel.find().exec();
  }

  async findById(id: string): Promise<Repartidor> {
    const repartidor = await this.repartidorModel.findOne({ id }).exec();
    if (!repartidor) {
      throw new NotFoundException(`Repartidor with id ${id} not found`);
    }
    return repartidor;
  }

  async update(id: string, updateRepartidorDto: UpdateRepartidorDto): Promise<Repartidor> {
    const updated = await this.repartidorModel.findOneAndUpdate(
      { id },
      updateRepartidorDto,
      { new: true },
    ).exec();

    if (!updated) {
      throw new NotFoundException(`Repartidor with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.repartidorModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Repartidor with id ${id} not found`);
    }
  }
}
