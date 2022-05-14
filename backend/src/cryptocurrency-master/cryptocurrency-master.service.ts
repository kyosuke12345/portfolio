import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptocurrencyMaster } from 'src/database/entities/cryptocurrencyMaster.entity';
import { DuplicateUniqueKeyException } from 'src/utils/custom.error.class';
import { Not, Repository } from 'typeorm';
import { CreateCryptocurrencyDTO, UpdateCryptocurrencyDTO } from './class/cryptocurrency-master.dto';
import { CryptocurrencyMasterListResponse, CryptocurrencyMasterListItemResponse, CryptocurrencyMasterDetailResponse } from './class/cryptocurrency-master.response';

@Injectable()
export class CryptocurrencyMasterService {
  constructor(@InjectRepository(CryptocurrencyMaster) private readonly cryptoMasterRepository: Repository<CryptocurrencyMaster>) { }

  async list(page: number, per: number): Promise<CryptocurrencyMasterListResponse> {
    const [list, total] = await this.cryptoMasterRepository.findAndCount({
      select: ['id', 'type', 'name'],
      order: {
        id: 'ASC',
      },
      skip: (page - 1) * per,
      take: per,
    });

    return new CryptocurrencyMasterListResponse(list.map(item => CryptocurrencyMasterListItemResponse.generate(item)), page, per, total);
  }

  async detail(id: number): Promise<CryptocurrencyMasterDetailResponse> {
    const item = await this.cryptoMasterRepository.findOne(id);
    if (!item) {
      throw new NotFoundException(`cryptocurrency_master detail not found. id: ${id}`);
    }
    return CryptocurrencyMasterDetailResponse.generate(item);
  }

  async create(dto: CreateCryptocurrencyDTO): Promise<CryptocurrencyMasterDetailResponse> {
    const count = await this.cryptoMasterRepository.count({
      where: {
        type: dto.type
      }
    })
    if (count > 0) {
      throw new DuplicateUniqueKeyException(`cryptocurrency_master create already type error: ${dto.type}`);
    }

    const newData = await this.cryptoMasterRepository.save(CryptocurrencyMaster.generate(dto));
    return CryptocurrencyMasterDetailResponse.generate(newData);
  }

  async update(id: number, dto: UpdateCryptocurrencyDTO): Promise<CryptocurrencyMasterDetailResponse> {
    const count = await this.cryptoMasterRepository.count({
      where: {
        type: dto.type,
        id: Not(id)
      }
    })
    if (count > 0) {
      throw new DuplicateUniqueKeyException(`cryptocurrency_master update already type error: ${dto.type}`);
    }

    const targetData = await this.cryptoMasterRepository.findOne(id);
    if (!targetData) {
      throw new NotFoundException(`cryptocurrency_master update not found. id: ${id}`)
    }
    CryptocurrencyMaster.update(targetData, dto);
    const res = await this.cryptoMasterRepository.save(targetData);
    return CryptocurrencyMasterDetailResponse.generate(res);
  }

  async delete(id: number): Promise<void> {
    const targetData = await this.cryptoMasterRepository.findOne(id);
    if (!targetData) {
      throw new NotFoundException(`cryptocurrency_master delete not found. id: ${id}`)
    }
    await this.cryptoMasterRepository.remove(targetData);
  }
}
