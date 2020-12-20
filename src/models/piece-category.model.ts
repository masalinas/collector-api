import {Entity, belongsTo, model, property} from '@loopback/repository';

import {PieceFamily} from './piece-family.model';

@model({
  name: 'PieceCategory',
  settings: {strict: false}
})
export class PieceCategory extends Entity {
  // Define well-known properties here
  @property({
    type: 'string',
    id: true,
    generated: true,
    description: 'Piece category indentifier',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    description: 'Piece category name',
  })
  name: string;

  // Define entity relations
  @belongsTo(() => PieceFamily)
  pieceFamilyId: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PieceCategory>) {
    super(data);
  }
}

export interface PieceCategoryRelations {
  // describe navigational properties here
}

export type PieceCategoryWithRelations = PieceCategory & PieceCategoryRelations;
