import { isBlackFriday, isPolishHoliday } from "./helpers/discountHelpers";
import { DiscountContext, DiscountResult } from "./types/discountTypes";
import dotenv from 'dotenv';

dotenv.config();

export function applyBestDiscount(ctx: DiscountContext): DiscountResult {
  const candidates: DiscountResult[] = [];

  let locationMultiplier = 1;

  if (ctx.customerLocation === 'EU') locationMultiplier = 1.15;
  if (ctx.customerLocation === 'ASIA') locationMultiplier = 0.95;

  let volumeDiscount = 0;

  if (ctx.totalQuantity >= 50) volumeDiscount = 0.3;
  else if (ctx.totalQuantity >= 10) volumeDiscount = 0.2;
  else if (ctx.totalQuantity >= 5) volumeDiscount = 0.1;

  if (volumeDiscount > 0) {
    candidates.push({
      finalTotal: locationMultiplier * ctx.baseTotal * (1 - volumeDiscount),
      type: `VOLUME_${volumeDiscount * 100}%`,
    });
  }

  if (isBlackFriday(ctx.date)) {
    candidates.push({
      finalTotal: locationMultiplier * ctx.baseTotal * 0.75,
      type: 'BLACK_FRIDAY_25%',
    });
  }

  const holidayCategories = process.env.HOLIDAY_CATEGORIES?.split(',')?? [];

  const hasHolidayCategory = ctx.productCategories.some(c =>
    holidayCategories.includes(c),
  );

  if (isPolishHoliday(ctx.date) && hasHolidayCategory) {
    candidates.push({
      finalTotal: locationMultiplier * ctx.baseTotal * 0.85,
      type: 'HOLIDAY_15%',
    });
  }

  let best: DiscountResult = {
      finalTotal : ctx.baseTotal * locationMultiplier,
      type: "LOCATION_BASED_VALUE"
    }
   
  if (candidates.length > 0){
    best = candidates.reduce((prev, curr) =>
      curr.finalTotal < prev.finalTotal ? curr : prev,
    );
  }

  return best;
}
