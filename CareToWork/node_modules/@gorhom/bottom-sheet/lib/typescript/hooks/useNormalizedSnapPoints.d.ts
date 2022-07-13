import Animated from 'react-native-reanimated';
import type { BottomSheetProps } from '../components/bottomSheet';
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
export declare const useNormalizedSnapPoints: (providedSnapPoints: BottomSheetProps['snapPoints'], containerHeight: Animated.SharedValue<number>, topInset: number, bottomInset: number, $modal: boolean) => Readonly<Animated.SharedValue<number[]>>;
