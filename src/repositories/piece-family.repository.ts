import {DefaultCrudRepository} from '@loopback/repository';
import {PieceFamily, PieceFamilyRelations} from '../models';
import {CollectorDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PieceFamilyRepository extends DefaultCrudRepository<
  PieceFamily,
  typeof PieceFamily.prototype.id,
  PieceFamilyRelations
> {
  constructor(
    @inject('datasources.collector') dataSource: CollectorDataSource,
  ) {
    super(PieceFamily, dataSource);
  }
}
