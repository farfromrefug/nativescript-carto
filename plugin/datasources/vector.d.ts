import { DataSource, TileDataSourceOptions } from './datasource';
import { IProjection } from '../projections/projection';
import { VectorElement, VectorElementVector } from '../vectorelements/vectorelements';

export interface VectorDataSourceOptions extends TileDataSourceOptions {
    projection: IProjection;
}
export interface LocalVectorDataSourceOptions extends VectorDataSourceOptions {}
export abstract class VectorDataSource<T extends any, U extends LocalVectorDataSourceOptions> extends DataSource<T, U> {}
export class LocalVectorDataSource extends VectorDataSource<any, LocalVectorDataSourceOptions> {
    add(element:VectorElement<any, any>);
    remove(element:VectorElement<any, any>);
    addAll(element:VectorElementVector);
}