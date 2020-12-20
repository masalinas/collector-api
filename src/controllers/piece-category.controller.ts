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
import {PieceCategory} from '../models';
import {PieceCategoryRepository} from '../repositories';

export class PieceCategoryController {
  constructor(
    @repository(PieceCategoryRepository)
    public pieceCategoryRepository : PieceCategoryRepository,
  ) {}

  @post('/piece-categories', {
    responses: {
      '200': {
        description: 'PieceCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(PieceCategory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PieceCategory, {
            title: 'NewPieceCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    pieceCategory: Omit<PieceCategory, 'id'>,
  ): Promise<PieceCategory> {
    return this.pieceCategoryRepository.create(pieceCategory);
  }

  @get('/piece-categories/count', {
    responses: {
      '200': {
        description: 'PieceCategory model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PieceCategory) where?: Where<PieceCategory>,
  ): Promise<Count> {
    return this.pieceCategoryRepository.count(where);
  }

  @get('/piece-categories', {
    responses: {
      '200': {
        description: 'Array of PieceCategory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PieceCategory, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PieceCategory) filter?: Filter<PieceCategory>,
  ): Promise<PieceCategory[]> {
    return this.pieceCategoryRepository.find(filter);
  }

  @patch('/piece-categories', {
    responses: {
      '200': {
        description: 'PieceCategory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PieceCategory, {partial: true}),
        },
      },
    })
    pieceCategory: PieceCategory,
    @param.where(PieceCategory) where?: Where<PieceCategory>,
  ): Promise<Count> {
    return this.pieceCategoryRepository.updateAll(pieceCategory, where);
  }

  @get('/piece-categories/{id}', {
    responses: {
      '200': {
        description: 'PieceCategory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PieceCategory, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PieceCategory, {exclude: 'where'}) filter?: FilterExcludingWhere<PieceCategory>
  ): Promise<PieceCategory> {
    return this.pieceCategoryRepository.findById(id, filter);
  }

  @patch('/piece-categories/{id}', {
    responses: {
      '204': {
        description: 'PieceCategory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PieceCategory, {partial: true}),
        },
      },
    })
    pieceCategory: PieceCategory,
  ): Promise<void> {
    await this.pieceCategoryRepository.updateById(id, pieceCategory);
  }

  @put('/piece-categories/{id}', {
    responses: {
      '204': {
        description: 'PieceCategory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pieceCategory: PieceCategory,
  ): Promise<void> {
    await this.pieceCategoryRepository.replaceById(id, pieceCategory);
  }

  @del('/piece-categories/{id}', {
    responses: {
      '204': {
        description: 'PieceCategory DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pieceCategoryRepository.deleteById(id);
  }
}
