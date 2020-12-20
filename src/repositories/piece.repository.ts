import {DefaultCrudRepository, BelongsToAccessor, repository} from '@loopback/repository';
import {Piece, PieceRelations, PieceFamily, PieceCategory, PieceSubCategory} from '../models';
import {CollectorDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PieceFamilyRepository} from './piece-family.repository';
import {PieceCategoryRepository} from './piece-category.repository';
import {PieceSubCategoryRepository} from './piece-sub-category.repository';

export class PieceRepository extends DefaultCrudRepository<
  Piece,
  typeof Piece.prototype.id,
  PieceRelations
> {
  public readonly pieceFamily: BelongsToAccessor<PieceFamily, typeof PieceFamily.prototype.id>;
  public readonly pieceCategory: BelongsToAccessor<PieceCategory, typeof PieceCategory.prototype.id>;
  public readonly pieceSubCategory: BelongsToAccessor<PieceSubCategory, typeof PieceSubCategory.prototype.id>;

  constructor(
    @inject('datasources.collector') dataSource: CollectorDataSource,
    @repository.getter('PieceFamilyRepository') protected pieceFamilyRepositoryGetter: Getter<PieceFamilyRepository>,
    @repository.getter('PieceCategoryRepository') protected pieceCategoryRepositoryGetter: Getter<PieceCategoryRepository>,
    @repository.getter('PieceSubCategoryRepository') protected pieceSubCategoryRepositoryGetter: Getter<PieceSubCategoryRepository>
  ) {
    super(Piece, dataSource);

    this.pieceFamily = this.createBelongsToAccessorFor('pieceFamily', pieceFamilyRepositoryGetter,);
    this.registerInclusionResolver('pieceFamily', this.pieceFamily.inclusionResolver);
    this.pieceCategory = this.createBelongsToAccessorFor('pieceCategory', pieceCategoryRepositoryGetter,);
    this.registerInclusionResolver('pieceCategory', this.pieceCategory.inclusionResolver);
    this.pieceSubCategory = this.createBelongsToAccessorFor('pieceSubCategory', pieceSubCategoryRepositoryGetter,);
    this.registerInclusionResolver('pieceSubCategory', this.pieceSubCategory.inclusionResolver);
  }
}
