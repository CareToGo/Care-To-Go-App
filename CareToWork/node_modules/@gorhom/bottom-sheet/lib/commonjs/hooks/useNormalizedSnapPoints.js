"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNormalizedSnapPoints = void 0;

var _reactNativeReanimated = require("react-native-reanimated");

var _utilities = require("../utilities");

var _constants = require("../components/bottomSheet/constants");

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
const useNormalizedSnapPoints = (providedSnapPoints, containerHeight, topInset, bottomInset, $modal) => {
  const normalizedSnapPoints = (0, _reactNativeReanimated.useDerivedValue)(() => ('value' in providedSnapPoints ? providedSnapPoints.value : providedSnapPoints).map(snapPoint => {
    if (containerHeight.value === _constants.INITIAL_CONTAINER_HEIGHT) {
      return _constants.INITIAL_SNAP_POINT;
    }

    return (0, _utilities.normalizeSnapPoint)(snapPoint, containerHeight.value, topInset, bottomInset, $modal);
  }));
  return normalizedSnapPoints;
};

exports.useNormalizedSnapPoints = useNormalizedSnapPoints;
//# sourceMappingURL=useNormalizedSnapPoints.js.map