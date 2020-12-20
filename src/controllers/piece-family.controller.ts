import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {PieceFamily} from '../models';
import {PieceFamilyRepository} from '../repositories';

export class PieceFamilyController {
  constructor(
    @repository(PieceFamilyRepository)
    public pieceFamilyRepository : PieceFamilyRepository,
  ) {}

  @post('/piece-families', {
    responses: {
      '200': {
        description: 'PieceFamily model instance',
        content: {'application/json': {schema: getModelSchemaRef(PieceFamily)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PieceFamily, {
            title: 'NewPieceFamily',
            exclude: ['id'],
          }),
        },
      },
    })
    pieceFamily: Omit<PieceFamily, 'id'>,
  ): Promise<PieceFamily> {
    return this.pieceFamilyRepository.create(pieceFamily);
  }

  @get('/piece-families/count', {
    responses: {
      '200': {
        description: 'PieceFamily model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PieceFamily) where?: Where<PieceFamily>,
  ): Promise<Count> {
    return this.pieceFamilyRepository.count(where);
  }

  @get('/piece-families', {
    responses: {
      '200': {
        description: 'Array of PieceFamily model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PieceFamily, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PieceFamily) filter?: Filter<PieceFamily>,
  ): Promise<PieceFamily[]> {
    return this.pieceFamilyRepository.find(filter);
  }

  @patch('/piece-families', {
    responses: {
      '200': {
        description: 'PieceFamily PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PieceFamily, {partial: true}),
        },
      },
    })
    pieceFamily: PieceFamily,
    @param.where(PieceFamily) where?: Where<PieceFamily>,
  ): Promise<Count> {
    return this.pieceFamilyRepository.updateAll(pieceFamily, where);
  }

  @get('/piece-families/{id}', {
    responses: {
      '200': {
        description: 'PieceFamily model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PieceFamily, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PieceFamily, {exclude: 'where'}) filter?: FilterExcludingWhere<PieceFamily>
  ): Promise<PieceFamily> {
    return this.pieceFamilyRepository.findById(id, filter);
  }

  @patch('/piece-families/{id}', {
    responses: {
      '204': {
        description: 'PieceFamily PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PieceFamily, {partial: true}),
        },
      },
    })
    pieceFamily: PieceFamily,
  ): Promise<void> {
    await this.pieceFamilyRepository.updateById(id, pieceFamily);
  }

  @put('/piece-families/{id}', {
    responses: {
      '204': {
        description: 'PieceFamily PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pieceFamily: PieceFamily,
  ): Promise<void> {
    await this.pieceFamilyRepository.replaceById(id, pieceFamily);
  }

  @del('/piece-families/{id}', {
    responses: {
      '204': {
        description: 'PieceFamily DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pieceFamilyRepository.deleteById(id);
  }
}
