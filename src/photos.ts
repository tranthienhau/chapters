// Bundled travel photos (offline-stable) keyed by name.
import { ImageSourcePropType } from 'react-native';

export const photos: Record<string, ImageSourcePropType> = {
  amalfi: require('../assets/photos/amalfi.jpg'),
  positano: require('../assets/photos/positano.jpg'),
  rome: require('../assets/photos/rome.jpg'),
  florence: require('../assets/photos/florence.jpg'),
  venice: require('../assets/photos/venice.jpg'),
  tuscany: require('../assets/photos/tuscany.jpg'),
  kyoto: require('../assets/photos/kyoto.jpg'),
  tokyo: require('../assets/photos/tokyo.jpg'),
  osaka: require('../assets/photos/osaka.jpg'),
  barcelona: require('../assets/photos/barcelona.jpg'),
  lisbon: require('../assets/photos/lisbon.jpg'),
  porto: require('../assets/photos/porto.jpg'),
  zermatt: require('../assets/photos/zermatt.jpg'),
  lucerne: require('../assets/photos/lucerne.jpg'),
  alps: require('../assets/photos/alps.jpg'),
  santorini: require('../assets/photos/santorini.jpg'),
  paris: require('../assets/photos/paris.jpg'),
  london: require('../assets/photos/london.jpg'),
};

export type PhotoKey = keyof typeof photos;
