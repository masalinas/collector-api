import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'PieceFamily',
  settings: {strict: false}
})
export class PieceFamily extends Entity {
  // Define well-known properties here
  @property({
    type: 'string',
    id: true,
    generated: true,
    description: 'Piece family indentifier',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    description: 'Piece family name',
  })
  name: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PieceFamily>) {
    super(data);
  }
}

export interface PieceFamilyRelations {
  // describe navigational properties here
}

export type PieceFamilityWithRelations = PieceFamily & PieceFamilyRelations;
