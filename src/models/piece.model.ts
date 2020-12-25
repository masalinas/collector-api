import {Entity, belongsTo, model, property} from '@loopback/repository';

import {PieceFamily} from './piece-family.model';
import {PieceCategory} from './piece-category.model';
import {PieceSubCategory} from './piece-sub-category.model';

@model({
  name: 'Piece',
  settings: {strict: false}
})
export class Piece extends Entity {
  // Define well-known properties here
  @property({
    type: 'string',
    id: true,
    generated: true,
    description: 'Piece indentifier',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    description: 'Share image file name',
  })
  fileName?: string;

  @property({
    type: 'string',
    required: true,
    description: 'Share name',
  })
  name?: string;

  @property({
    type: 'string',
    description: 'Share description',
  })
  description: string;

  @property({
    type: 'string',
    description: 'Share Rarity',
  })
  rarity?: string;

  @property({
    type: 'string',
    description: 'Share issuer',
  })
  issuer?: string;

  @property({
    type: 'string',
    description: 'Share signatures',
  })
  signatures?: string;

  @property({
    type: 'string',
    description: 'Share quality of engraving',
  })
  quality?: string;

  @property({
    type: 'string',
    description: 'Share overall appearance',
  })
  appearance?: string;

  @property({
    type: 'string',
    description: 'Share condition',
  })
  condition?: string;

  @property({
    type: 'Date',
    description: 'Share date of issue',
  })
  issueDate?: Date;

  @property({
    type: 'number',
    description: 'Share price estimate',
  })
  price?: number;

  @property({
    type: 'string',
    description: 'Share share country iso code',
  })
  country?: string;

  @property({
    type: 'Date',
    required: true,
    description: 'Share creation date',
  })
  creationDate?: Date;

  // Define entity relations
  @belongsTo(() => PieceFamily)
  pieceFamilyId: string;

  @belongsTo(() => PieceCategory)
  pieceCategoryId: string;

  @belongsTo(() => PieceSubCategory)
  pieceSubCategoryId: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
  constructor(data?: Partial<Piece>) {
    super(data);
  }
}

export interface PieceRelations {
  // describe navigational properties here
}

export type PieceWithRelations = Piece & PieceRelations;
