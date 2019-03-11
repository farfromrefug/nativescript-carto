import { Layer, TileLayer } from './layer';
import { CartoOfflineVectorTileLayerOptions, CartoOnlineVectorTileLayerOptions as ICartoOnlineVectorTileLayerOptions, ClusteredVectorLayerLayerOptions, VectorElementEventListener as IVectorElementEventListener, VectorLayerOptions, VectorTileEventListener as IVectorTileEventListener, VectorTileLayerOptions } from './vector';
export interface CartoOnlineVectorTileLayerOptions extends ICartoOnlineVectorTileLayerOptions {
    style: com.carto.layers.CartoBaseMapStyle;
}
import { MBVectorTileDecoder, VectorTileDecoder } from '../vectortiles/vectortiles';
import { Projection } from '../projections/projection';
export declare const VectorTileRenderOrder: {
    readonly HIDDEN: com.carto.layers.VectorTileRenderOrder;
    readonly LAYER: com.carto.layers.VectorTileRenderOrder;
    readonly LAST: com.carto.layers.VectorTileRenderOrder;
};
export declare abstract class BaseVectorTileLayer<T extends com.carto.layers.VectorTileLayer, U extends VectorTileLayerOptions> extends TileLayer<T, U> {
    setLabelRenderOrder(order: com.carto.layers.VectorTileRenderOrder): void;
    setVectorTileEventListener(listener: IVectorTileEventListener, projection?: Projection): void;
    getTileDecoder(): VectorTileDecoder | MBVectorTileDecoder;
}
export declare class VectorTileLayer extends BaseVectorTileLayer<com.carto.layers.VectorTileLayer, VectorTileLayerOptions> {
    createNative(options: VectorTileLayerOptions): com.carto.layers.VectorTileLayer;
}
export declare class CartoOnlineVectorTileLayer extends BaseVectorTileLayer<com.carto.layers.CartoOnlineVectorTileLayer, CartoOnlineVectorTileLayerOptions> {
    createNative(options: CartoOnlineVectorTileLayerOptions): com.carto.layers.CartoOnlineVectorTileLayer;
}
export declare class CartoOfflineVectorTileLayer extends TileLayer<com.carto.layers.CartoOfflineVectorTileLayer, CartoOfflineVectorTileLayerOptions> {
    createNative(options: CartoOfflineVectorTileLayerOptions): com.carto.layers.CartoOfflineVectorTileLayer;
}
export declare abstract class BaseVectorLayer<T extends com.carto.layers.VectorLayer, U extends VectorLayerOptions> extends Layer<T, U> {
    setVectorElementEventListener(listener: IVectorElementEventListener, projection?: Projection): void;
}
export declare class VectorLayer extends BaseVectorLayer<com.carto.layers.VectorLayer, VectorLayerOptions> {
    createNative(options: VectorLayerOptions): com.carto.layers.VectorLayer;
}
export declare class EditableVectorLayer extends BaseVectorLayer<com.carto.layers.EditableVectorLayer, VectorLayerOptions> {
    createNative(options: VectorLayerOptions): com.carto.layers.EditableVectorLayer;
    setSelectedVectorElement(element: any): void;
}
export declare class ClusteredVectorLayer extends Layer<com.carto.layers.ClusteredVectorLayer, ClusteredVectorLayerLayerOptions> {
    createNative(options: ClusteredVectorLayerLayerOptions): com.carto.layers.ClusteredVectorLayer;
    minimumClusterDistance: number;
    maximumClusterZoom: number;
    animatedClusters: boolean;
}
