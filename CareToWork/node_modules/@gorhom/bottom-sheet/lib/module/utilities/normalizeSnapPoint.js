/**
 * Converts a snap point to fixed numbers.
 */
export const normalizeSnapPoint = (snapPoint, containerHeight, _topInset, _bottomInset, _$modal = false) => {
  'worklet';

  let normalizedSnapPoint = snapPoint; // percentage snap point

  if (typeof normalizedSnapPoint === 'string') {
    normalizedSnapPoint = Number(normalizedSnapPoint.split('%')[0]) * containerHeight / 100;
  }

  return Math.max(0, containerHeight - normalizedSnapPoint);
};
//# sourceMappingURL=normalizeSnapPoint.js.map