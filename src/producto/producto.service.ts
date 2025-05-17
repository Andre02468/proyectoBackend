import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto, ProductoDocument } from './schemas/producto.schema';
import { CreateProductoDto } from './producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto.name)
    private readonly productoModel: Model<ProductoDocument>,
  ) {}

  async create(dto: CreateProductoDto): Promise<Producto> {
    const nuevo = new this.productoModel(dto);
    return nuevo.save();
  }

  async findAll(): Promise<Producto[]> {
    return this.productoModel.find().populate('comerciante');
  }

  async findById(id: string): Promise<Producto> {
    const producto = await this.productoModel.findById(id).populate('comerciante');
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async delete(id: string): Promise<void> {
    const result = await this.productoModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Producto no encontrado');
  }

  async update(id: string, data: Partial<CreateProductoDto>): Promise<Producto> {
    const producto = await this.productoModel.findByIdAndUpdate(id, data, { new: true });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }
}
