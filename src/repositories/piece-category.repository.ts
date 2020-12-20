import {DefaultCrudRepository, BelongsToAccessor, repository} from '@loopback/repository';
import {PieceCategory, PieceCategoryRelations, PieceFamily} from '../models';
import {CollectorDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PieceFamilyRepository} from './piece-family.repository';

export class PieceCategoryRepository extends DefaultCrudRepository<
  PieceCategory,
  typeof PieceCategory.prototype.id,
  PieceCategoryRelations
> {

  public readonly pieceFamily: BelongsToAccessor<PieceFamily, typeof PieceCategory.prototype.id>;

  constructor(
    @inject('datasources.collector') dataSource: CollectorDataSource,
    @repository.getter('PieceFamilyRepository') protected pieceFamilyRepositoryGetter: Getter<PieceFamilyRepository>
  ) {
    super(PieceCategory, dataSource);

    this.pieceFamily = this.createBelongsToAccessorFor('pieceFamily', pieceFamilyRepositoryGetter,);
    this.registerInclusionResolver('pieceFamily', this.pieceFamily.inclusionResolver);
  }
}
