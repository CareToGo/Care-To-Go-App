import { useDerivedValue } from 'react-native-reanimated';
import { normalizeSnapPoint } from '../utilities';
import { INITIAL_CONTAINER_HEIGHT, INITIAL_SNAP_POINT } from '../components/bottomSheet/constants';
/**
 * Convert percentage snap points to pixels in screen and calculate
 * the accurate snap points positions.
 * @param providedSnapPoints provided snap points.
 * @param containerHeight BottomSheetContainer height.
 * @param topInset top inset.
 * @param bottomInset bottom inset.
 * @param $modal is sheet in a modal.
 * @returns {Animated.SharedValue<number[]>}
 */

export const useNormalizedSnapPoints = (providedSnapPoints, containerHeight, topInset, bottomInset, $modal) => {
  const normalizedSnapPoints = useDerivedValue(() => ('value' in providedSnapPoints ? providedSnapPoints.value : providedSnapPoints).map(snapPoint => {
    if (containerHeight.value === INITIAL_CONTAINER_HEIGHT) {
      return INITIAL_SNAP_POINT;
    }

    return normalizeSnapPoint(snapPoint, containerHeight.value, topInset, bottomInset, $modal);
  }));
  return normalizedSnapPoints;
};
//# sourceMappingURL=useNormalizedSnapPoints.js.map