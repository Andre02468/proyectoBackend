import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedido, PedidoDocument } from './schemas/pedidos.schema';
import { CreatePedidoDto, EstadoPedido } from './pedidos.dto';


@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido.name) private readonly pedidoModel: Model<PedidoDocument>,
  ) {}

  async create(createDto: CreatePedidoDto): Promise<Pedido> {
    const nuevo = new this.pedidoModel(createDto);
    return nuevo.save();

  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidoModel.find().populate('cliente comerciante repartidor');
  }

  async findById(id: string): Promise<Pedido> {
    const pedido = await this.pedidoModel.findById(id).populate('cliente comerciante repartidor');
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }

  async asignarRepartidor(pedidoId: string, repartidorId: string): Promise<Pedido> {
    const pedido = await this.pedidoModel.findByIdAndUpdate(
      pedidoId,
      { repartidor: repartidorId, estado: EstadoPedido.EN_CAMINO },
      { new: true },
    );
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }

  async actualizarEstado(pedidoId: string, estado: EstadoPedido): Promise<Pedido> {
    const pedido = await this.pedidoModel.findByIdAndUpdate(
      pedidoId,
      { estado },
      { new: true },
    );
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }
}
