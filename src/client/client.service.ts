import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//import { Pedido } from '../pedido/pedido.schema';
import { Cliente } from './schemas/client.schema';
import { CreateClienteDto } from './client.dto';

@Injectable()
export class ClienteService {
  constructor(@InjectModel(Cliente.name) private clienteModel: Model<Cliente>) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = new this.clienteModel(createClienteDto);
    return cliente.save();
  }

  async findById(id: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findOne({ id }).populate('historialPedidos').exec();
    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    }
    return cliente;
  }

  /*async getHistorialPedidos(clienteId: string): Promise<Pedido[]> {
    const cliente = await this.findById(clienteId);
    return cliente.historialPedidos;
  }*/

  /*async agregarPedido(clienteId: string, pedidoId: string): Promise<Cliente> {
    const cliente = await this.findById(clienteId);
    cliente.historialPedidos.push(pedidoId as any);
    return cliente.save();
  }*/
}


