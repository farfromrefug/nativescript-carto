import { BaseNative } from '../carto';

export interface DataSourceOptions {
    minZoom?: number;
    maxZoom?: number;
}
export interface TileDataSourceOptions extends DataSourceOptions {}
export abstract class DataSource<T, U extends DataSourceOptions> extends BaseNative<T, U> {}
export abstract class TileDataSource<T, U extends TileDataSourceOptions> extends DataSource<T, U> {}

export interface OrderedTileDataSourceOptions extends DataSourceOptions {
    dataSources: Array<TileDataSource<any, any>>;
}
export class OrderedTileDataSource<T, U extends OrderedTileDataSourceOptions> extends TileDataSource<T, U> {}

export interface MergeTileDataSourceOptions extends DataSourceOptions {
    dataSources: Array<TileDataSource<any, any>>;
}
export class MergeTileDataSource<T, U extends MergeTileDataSourceOptions> extends TileDataSource<T, U> {}
