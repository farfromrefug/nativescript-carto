import { BaseNative, mapPosVectorFromArgs } from '..';
import { IntVector, MapPos, MapPosVector, fromNativeMapPos, toNativeMapPos } from '../core';
import { ElevationDataDecoderOptions, MapBoxElevationDataDecoderOptions, TerrariumElevationDataDecoderOptions } from '.';
import { TileDataSource } from '../datasources';

export abstract class ElevationDataDecoder<N extends com.carto.rastertiles.ElevationDecoder, O extends ElevationDataDecoderOptions> extends BaseNative<
    com.carto.rastertiles.ElevationDecoder,
    ElevationDataDecoderOptions
> {
    public getElevation(dataSource: TileDataSource<any, any>, pos: MapPos): number {
        return this.getNative().getElevation(dataSource.getNative(), toNativeMapPos(pos));
    }
    public getElevations(dataSource: TileDataSource<any, any>, pos: MapPosVector): IntVector {
        return new IntVector(this.getNative().getElevations(dataSource.getNative(), mapPosVectorFromArgs(pos)));
    }
}
export class MapBoxElevationDataDecoder extends BaseNative<com.carto.rastertiles.MapBoxElevationDataDecoder, MapBoxElevationDataDecoderOptions> {
    createNative(options: MapBoxElevationDataDecoderOptions) {
        return new com.carto.rastertiles.MapBoxElevationDataDecoder();
    }
}

export class TerrariumElevationDataDecoder extends BaseNative<com.carto.rastertiles.TerrariumElevationDataDecoder, TerrariumElevationDataDecoderOptions> {
    createNative(options: TerrariumElevationDataDecoderOptions) {
        return new com.carto.rastertiles.TerrariumElevationDataDecoder();
    }
}
