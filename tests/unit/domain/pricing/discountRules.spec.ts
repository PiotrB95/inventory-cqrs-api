import { applyBestDiscount } from "../../../../src/domain/pricing/discountRules";
import { isBlackFriday, isPolishHoliday } from "../../../../src/domain/pricing/helpers/discountHelpers";

jest.mock('../../../../src/domain/pricing/helpers/discountHelpers', () => ({
  isBlackFriday: jest.fn(),
  isPolishHoliday: jest.fn(),
}));

describe('applyBestDiscount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.HOLIDAY_CATEGORIES = 'bikes,tires';
  });

  it('returns location-based price when no discounts apply', () => {
    (isBlackFriday as jest.Mock).mockReturnValue(false);
    (isPolishHoliday as jest.Mock).mockReturnValue(false);

    const result = applyBestDiscount({
      baseTotal: 1000,
      totalQuantity: 1,
      date: new Date(),
      customerLocation: 'EU',
      productCategories: ['bikes'],
    });

    expect(result).toEqual({
      finalTotal: 1150,
      type: 'LOCATION_BASED_VALUE',
    });
  });

  it('applies volume discount when quantity >= 10', () => {
    const result = applyBestDiscount({
      baseTotal: 2000,
      totalQuantity: 10,
      date: new Date(),
      customerLocation: 'US',
      productCategories: ['bikes'],
    });

    expect(result.type).toBe('VOLUME_20%');
    expect(result.finalTotal).toBe(1600);
  });

  it('applies Black Friday discount', () => {
    (isBlackFriday as jest.Mock).mockReturnValue(true);

    const result = applyBestDiscount({
      baseTotal: 1000,
      totalQuantity: 1,
      date: new Date(),
      customerLocation: 'US',
      productCategories: ['bikes'],
    });

    expect(result.type).toBe('BLACK_FRIDAY_25%');
    expect(result.finalTotal).toBe(750);
  });

  it('applies holiday discount when category matches ENV', () => {
    (isPolishHoliday as jest.Mock).mockReturnValue(true);
    (isBlackFriday as jest.Mock).mockReturnValue(false);

    const result = applyBestDiscount({
      baseTotal: 1000,
      totalQuantity: 1,
      date: new Date(),
      customerLocation: 'US',
      productCategories: ['bikes'],
    });

    expect(result.type).toBe('HOLIDAY_15%');
    expect(result.finalTotal).toBe(850);
  });

  it('chooses the best discount among all candidates', () => {
    (isBlackFriday as jest.Mock).mockReturnValue(true);
    (isPolishHoliday as jest.Mock).mockReturnValue(true);

    const result = applyBestDiscount({
      baseTotal: 1000,
      totalQuantity: 50,
      date: new Date(),
      customerLocation: 'US',
      productCategories: ['bikes'],
    });

    expect(result.finalTotal).toBe(700);
    expect(result.type).toBe('VOLUME_30%');
  });
});
