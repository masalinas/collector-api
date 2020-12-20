import {DefaultCrudRepository, BelongsToAccessor, repository} from '@loopback/repository';
import {PieceSubCategory, PieceSubCategoryRelations, PieceCategory} from '../models';
import {CollectorDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PieceCategoryRepository} from './piece-category.repository';

export class PieceSubCategoryRepository extends DefaultCrudRepository<
  PieceSubCategory,
  typeof PieceSubCategory.prototype.id,
  PieceSubCategoryRelations
> {
  public readonly pieceCategory: BelongsToAccessor<PieceCategory, typeof PieceCategory.prototype.id>;

  constructor(
    @inject('datasources.collector') dataSource: CollectorDataSource,
    @repository.getter('PieceCategoryRepository') protected pieceCategoryRepositoryGetter: Getter<PieceCategoryRepository>
  ) {
    super(PieceSubCategory, dataSource);

    this.pieceCategory = this.createBelongsToAccessorFor('pieceCategory', pieceCategoryRepositoryGetter,);
    this.registerInclusionResolver('pieceCategory', this.pieceCategory.inclusionResolver);
  }
}
