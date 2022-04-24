/**
 * Used to format early and late strings returned from api call.
 *
 * @param early - the early string
 * @param late - the late string
 */
export const formatMoveIn = (early: string, late: string) => {
  return `${early} - ${late}`;
};
