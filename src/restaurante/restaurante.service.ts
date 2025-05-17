import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurante } from './schemas/restaurante.schema';
import { Model } from 'mongoose';
import { CreateRestauranteDto } from './restaurante.dto';


@Injectable()
export class RestauranteService {
  constructor(
    @InjectModel(Restaurante.name)
    private restauranteModel: Model<Restaurante>,
  ) {}

  async create(dto: CreateRestauranteDto): Promise<Restaurante> {
    const restaurante = new this.restauranteModel(dto);
    return restaurante.save();
  }

  async findAll(): Promise<Restaurante[]> {
    return this.restauranteModel.find().populate('productos').exec();
  }

  async findById(id: string): Promise<Restaurante> {
    const restaurante = await this.restauranteModel.findById(id).populate('productos').exec();
    if (!restaurante) throw new NotFoundException('Restaurante no encontrado');
    return restaurante;
  }

  async confirmarPedido(restauranteId: string): Promise<string> {
    const restaurante = await this.restauranteModel.findById(restauranteId);
    if (!restaurante) throw new NotFoundException('Restaurante no encontrado');
    return `Pedido confirmado por el restaurante: ${restaurante.nombre}`;
  }
}
