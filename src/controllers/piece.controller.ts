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
import {Piece} from '../models';
import {PieceRepository} from '../repositories';

export class PieceController {
  constructor(
    @repository(PieceRepository)
    public pieceRepository : PieceRepository,
  ) {}

  @post('/pieces', {
    responses: {
      '200': {
        description: 'Piece model instance',
        content: {'application/json': {schema: getModelSchemaRef(Piece)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Piece, {
            title: 'NewPiece',
            exclude: ['id'],
          }),
        },
      },
    })
    piece: Omit<Piece, 'id'>,
  ): Promise<Piece> {
    return this.pieceRepository.create(piece);
  }

  @get('/pieces/count', {
    responses: {
      '200': {
        description: 'Piece model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Piece) where?: Where<Piece>,
  ): Promise<Count> {
    return this.pieceRepository.count(where);
  }

  @get('/pieces', {
    responses: {
      '200': {
        description: 'Array of Piece model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Piece, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Piece) filter?: Filter<Piece>,
  ): Promise<Piece[]> {
    return this.pieceRepository.find(filter);
  }

  @patch('/pieces', {
    responses: {
      '200': {
        description: 'Piece PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Piece, {partial: true}),
        },
      },
    })
    piece: Piece,
    @param.where(Piece) where?: Where<Piece>,
  ): Promise<Count> {
    return this.pieceRepository.updateAll(piece, where);
  }

  @get('/pieces/{id}', {
    responses: {
      '200': {
        description: 'Piece model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Piece, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Piece, {exclude: 'where'}) filter?: FilterExcludingWhere<Piece>
  ): Promise<Piece> {
    return this.pieceRepository.findById(id, filter);
  }

  @patch('/pieces/{id}', {
    responses: {
      '204': {
        description: 'Piece PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Piece, {partial: true}),
        },
      },
    })
    piece: Piece,
  ): Promise<void> {
    await this.pieceRepository.updateById(id, piece);
  }

  @put('/pieces/{id}', {
    responses: {
      '204': {
        description: 'Piece PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() piece: Piece,
  ): Promise<void> {
    await this.pieceRepository.replaceById(id, piece);
  }

  @del('/pieces/{id}', {
    responses: {
      '204': {
        description: 'Piece DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pieceRepository.deleteById(id);
  }
}
