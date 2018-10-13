import { CartoOnlineRasterTileLayerOptions, RasterTileLayerOptions } from './raster';
import { RasterTileLayerBase } from './raster.common';
import { TileDataSource } from '../datasources/datasource';

export class RasterTileLayer extends RasterTileLayerBase<com.carto.layers.RasterTileLayer, RasterTileLayerOptions> {
    createNative(options: RasterTileLayerOptions) {
        return new com.carto.layers.RasterTileLayer((options.dataSource as TileDataSource<any, any>).getNative());
    }
}

export class CartoOnlineRasterTileLayer extends RasterTileLayerBase<com.carto.layers.CartoOnlineRasterTileLayer, CartoOnlineRasterTileLayerOptions> {
    createNative(options) {
        return new com.carto.layers.CartoOnlineRasterTileLayer(options.dataSource.getNative());
    }
}
