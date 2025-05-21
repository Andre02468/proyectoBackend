import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedido, PedidoDocument } from './schemas/pedidos.schema';
import { CreatePedidoDto, EstadoPedido } from './pedidos.dto';
import { Producto } from 'src/comerciante/schemas/comerciante.schema';
import { ProductoDocument } from 'src/producto/schemas/producto.schema';


@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido.name) private readonly pedidoModel: Model<PedidoDocument>,
    @InjectModel(Producto.name) private readonly productoModel: Model<ProductoDocument>,
  ) {}

  async create(createDto: CreatePedidoDto): Promise<Pedido> {
    const { productos } = createDto;

    for (const item of productos) {
      const producto = await this.productoModel.findOne({ nombre: item.nombre });

      if (!producto) {
        throw new BadRequestException(`El producto "${item.nombre}" no existe.`);
      }
    }

    const nuevo = new this.pedidoModel(createDto);
    return nuevo.save();
  }

    async findAll(): Promise<Pedido[]> {
      return this.pedidoModel.find().populate('cliente restaurante repartidor'); 
    }

    async findById(id: string): Promise<Pedido> {
      const pedido = await this.pedidoModel.findById(id).populate('cliente restaurante repartidor');
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
