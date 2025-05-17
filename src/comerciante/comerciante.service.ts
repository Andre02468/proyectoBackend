import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comerciante, ComercianteDocument } from './schemas/comerciante.schema';
import { CreateComercianteDto } from './comerciante.dto';


@Injectable()
export class ComercianteService {
  constructor(
    @InjectModel(Comerciante.name) private readonly comercianteModel: Model<ComercianteDocument>,
  ) {}

  async create(createDto: CreateComercianteDto): Promise<Comerciante> {
    const nuevo = new this.comercianteModel(createDto);
    return nuevo.save();
  }

  async findAll(): Promise<Comerciante[]> {
    return this.comercianteModel.find();
  }

  async findById(id: string): Promise<Comerciante> {
    const comerciante = await this.comercianteModel.findById(id);
    if (!comerciante) throw new NotFoundException('Comerciante no encontrado');
    return comerciante;
  }
}
