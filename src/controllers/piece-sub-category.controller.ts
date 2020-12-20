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
import {PieceSubCategory} from '../models';
import {PieceSubCategoryRepository} from '../repositories';

export class PieceSubCategoryController {
  constructor(
    @repository(PieceSubCategoryRepository)
    public pieceSubCategoryRepository : PieceSubCategoryRepository,
  ) {}

  @post('/piece-sub-categories', {
    responses: {
      '200': {
        description: 'PieceSubCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(PieceSubCategory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PieceSubCategory, {
            title: 'NewPieceSubCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    pieceSubCategory: Omit<PieceSubCategory, 'id'>,
  ): Promise<PieceSubCategory> {
    return this.pieceSubCategoryRepository.create(pieceSubCategory);
  }

  @get('/piece-sub-categories/count', {
    responses: {
      '200': {
        description: 'PieceSubCategory model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PieceSubCategory) where?: Where<PieceSubCategory>,
  ): Promise<Count> {
    return this.pieceSubCategoryRepository.count(where);
  }

  @get('/piece-sub-categories', {
    responses: {
      '200': {
        description: 'Array of PieceSubCategory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PieceSubCategory, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PieceSubCategory) filter?: Filter<PieceSubCategory>,
  ): Promise<PieceSubCategory[]> {
    return this.pieceSubCategoryRepository.find(filter);
  }

  @patch('/piece-sub-categories', {
    responses: {
      '200': {
        description: 'PieceSubCategory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PieceSubCategory, {partial: true}),
        },
      },
    })
    pieceSubCategory: PieceSubCategory,
    @param.where(PieceSubCategory) where?: Where<PieceSubCategory>,
  ): Promise<Count> {
    return this.pieceSubCategoryRepository.updateAll(pieceSubCategory, where);
  }

  @get('/piece-sub-categories/{id}', {
    responses: {
      '200': {
        description: 'PieceSubCategory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PieceSubCategory, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PieceSubCategory, {exclude: 'where'}) filter?: FilterExcludingWhere<PieceSubCategory>
  ): Promise<PieceSubCategory> {
    return this.pieceSubCategoryRepository.findById(id, filter);
  }

  @patch('/piece-sub-categories/{id}', {
    responses: {
      '204': {
        description: 'PieceSubCategory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PieceSubCategory, {partial: true}),
        },
      },
    })
    pieceSubCategory: PieceSubCategory,
  ): Promise<void> {
    await this.pieceSubCategoryRepository.updateById(id, pieceSubCategory);
  }

  @put('/piece-sub-categories/{id}', {
    responses: {
      '204': {
        description: 'PieceSubCategory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pieceSubCategory: PieceSubCategory,
  ): Promise<void> {
    await this.pieceSubCategoryRepository.replaceById(id, pieceSubCategory);
  }

  @del('/piece-sub-categories/{id}', {
    responses: {
      '204': {
        description: 'PieceSubCategory DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pieceSubCategoryRepository.deleteById(id);
  }
}
