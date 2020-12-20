import {Entity, belongsTo, model, property} from '@loopback/repository';

import {PieceCategory} from './piece-category.model';

@model({
  name: 'PieceSubCategory',
  settings: {strict: false}
})
export class PieceSubCategory extends Entity {
  // Define well-known properties here
  @property({
    type: 'string',
    id: true,
    generated: true,
    description: 'Piece sub category indentifier',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    description: 'Piece sub category name',
  })
  name: string;

  // Define entity relations
  @belongsTo(() => PieceCategory)
  pieceCategoryId: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PieceSubCategory>) {
    super(data);
  }
}

export interface PieceSubCategoryRelations {
  // describe navigational properties here
}

export type PieceSubCategoryWithRelations = PieceSubCategory & PieceSubCategoryRelations;
