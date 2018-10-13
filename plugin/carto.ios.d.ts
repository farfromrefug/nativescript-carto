import { BaseTileLayer, CartoViewBase, MapClickedEvent, MapIdleEvent, MapMovedEvent, MapReadyEvent, MapStableEvent, setLicenseKey } from './carto.common';
import { EPSG3857 } from './ios/shared';
import { Position, Projection } from './carto';
export { setLicenseKey, MapReadyEvent, MapStableEvent, MapIdleEvent, MapMovedEvent, MapClickedEvent };
export * from './ios/layers';
export * from './ios/elements';
export * from './ios/shared';
export * from './ios/datasources';
export declare class CartoMap extends CartoViewBase {
    private mapView;
    static projection: EPSG3857;
    nativeProjection: NTEPSG3857;
    constructor();
    _projection: Projection;
    projection: Projection;
    createNativeView(): Object;
    initNativeView(): void;
    disposeNativeView(): void;
    fromNativeMapPos(pos: NTMapPos): Position;
    getFocusPos(): Position;
    setFocusPos(value: string | Position): void;
    getZoom(): number;
    setZoom(value: number): void;
    getBearing(): number;
    setBearing(value: number): void;
    getTilt(): number;
    setTilt(value: number): void;
    getMetersPerPixel(): number;
    addLayer(layer: BaseTileLayer<any, any>): void;
    removeLayer(layer: BaseTileLayer<any, any>): void;
    removeAllLayers(layers: Array<BaseTileLayer<any, any>>): void;
    clearAllCaches(): void;
    clearPreloadingCaches(): void;
    cancelAllTasks(): void;
    screenToMap(x: number, y: number): Position;
}
