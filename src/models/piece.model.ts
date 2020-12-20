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
    description: 'Rarity',
  })
  rarity?: string;

  @property({
    type: 'string',
    description: 'The issuer',
  })
  issuer?: string;

  @property({
    type: 'string',
    description: 'Signatures',
  })
  signatures?: string;

  @property({
    type: 'string',
    description: 'Quality of engraving',
  })
  quality?: string;

  @property({
    type: 'string',
    description: 'Overall appearance',
  })
  appearance?: string;

  @property({
    type: 'string',
    description: 'Condition',
  })
  condition?: string;

  @property({
    type: 'Date',
    description: 'Date of issue',
  })
  issueDate?: Date;

  @property({
    type: 'number',
    description: 'Price estimate',
  })
  price?: number;

  @property({
    type: 'string',
    description: 'Share country iso code',
  })
  country?: string;

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
