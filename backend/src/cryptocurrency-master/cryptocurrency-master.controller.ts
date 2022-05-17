import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiDuplicateuniqueKeyErrorResponse } from 'libs/lib/src/utils/custom.error.class';
import { CreateCryptocurrencyDTO, UpdateCryptocurrencyDTO } from './class/cryptocurrency-master.dto';
import { CryptocurrencyMasterDetailResponse, CryptocurrencyMasterListResponse } from './class/cryptocurrency-master.response';
import { CryptocurrencyMasterService } from './cryptocurrency-master.service';

@ApiTags('仮想通貨マスターapi')
@Controller('cryptocurrency-master')
export class CryptocurrencyMasterController {
  constructor(private service: CryptocurrencyMasterService) { }

  @ApiOkResponse({ description: 'list取得時', type: CryptocurrencyMasterListResponse })
  @ApiParam({ name: 'page', required: true })
  @ApiParam({ name: 'per', required: true })
  @Get('list/:page/:per')
  async list(
    @Param('page', new ParseIntPipe()) page: number,
    @Param('per', new ParseIntPipe()) per: number,
  ) {
    return this.service.list(page, per);
  }

  @ApiOkResponse({ description: '詳細取得取得時', type: CryptocurrencyMasterDetailResponse })
  @ApiNotFoundResponse({ description: 'not found cryptocurrency_master' })
  // @ApiForbiddenResponse()
  @ApiParam({ name: 'id', required: true })
  @Get('detail/:id')
  async detail(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.detail(id);
  }

  @ApiOkResponse({ description: '新規作成', type: CryptocurrencyMasterDetailResponse })
  @ApiBadRequestResponse()
  @ApiDuplicateuniqueKeyErrorResponse()
  // @ApiForbiddenResponse()
  @Post('')
  async create(@Body() dto: CreateCryptocurrencyDTO) {
    return this.service.create(dto);
  }

  @ApiOkResponse({ description: '更新', type: CryptocurrencyMasterDetailResponse })
  @ApiBadRequestResponse()
  @ApiDuplicateuniqueKeyErrorResponse()
  @ApiNotFoundResponse()
  // @ApiForbiddenResponse()
  @ApiParam({ name: 'id', required: true })
  @Post(':id')
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: UpdateCryptocurrencyDTO) {
    return this.service.update(id, dto);
  }

  @ApiOkResponse({ description: '削除' })
  @ApiNotFoundResponse()
  // @ApiForbiddenResponse()
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    await this.service.delete(id);
    return {}
  }
}
