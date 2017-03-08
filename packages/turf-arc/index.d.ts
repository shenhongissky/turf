/// <reference types="geojson" />

type Point = GeoJSON.Feature<GeoJSON.Point>;
type LineString = GeoJSON.Feature<GeoJSON.LineString>;

/**
 * http://turfjs.org/docs/#arc
 */
declare function arc(start: Point, end: Point, properties?: any, npoints?: number, offset?: number): LineString;
declare namespace arc {}
export = arc;
