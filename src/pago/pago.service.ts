import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pago } from './schemas/pago.schema';
import { Model } from 'mongoose';
import { CreatePagoDto } from './pago.dto';
import { EstadoPago } from './pago.enum';
import { PedidoService } from 'src/pedidos/pedidos.service';


@Injectable()
export class PagoService {
  constructor(
    @InjectModel(Pago.name) private pagoModel: Model<Pago>,
    private readonly pedidoService: PedidoService,  
  ) {}

  async create(dto: CreatePagoDto): Promise<Pago> {
    const pedido = await this.pedidoService.findById(dto.pedido);
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }

    if (pedido.total !== dto.monto) {
      throw new BadRequestException(`El monto ingresado (${dto.monto}) no coincide con el total del pedido (${pedido.total}).`);
    }

    const pago = new this.pagoModel(dto);
    return pago.save();
  }

  async findAll(): Promise<Pago[]> {
    return this.pagoModel.find().populate('pedido').exec();
  }

  async findById(id: string): Promise<Pago> {
    const pago = await this.pagoModel.findById(id).populate('pedido').exec();
    if (!pago) throw new NotFoundException('Pago no encontrado');
    return pago;
  }

  async actualizarEstado(id: string, estado: EstadoPago): Promise<Pago> {
    const pago = await this.pagoModel.findById(id);
    if (!pago) throw new NotFoundException('Pago no encontrado');
    pago.estado = estado;
    return pago.save();
  }
}
