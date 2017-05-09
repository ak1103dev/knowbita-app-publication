import secToTimeFormat from '../../src/utils/secToTimeFormat';

describe('sec to time format', () => {
  it('should show 00:00 when time is 0 sec and 2 position', () => {
    const time = 0;
    const position = 2;
    const expectedValue = '00:00';
    expect(secToTimeFormat(position, time)).toEqual(expectedValue);
  });
  it('should show 00:00:00 when time is 0 sec and 3 position', () => {
    const time = 0;
    const position = 3;
    const expectedValue = '00:00:00';
    expect(secToTimeFormat(position, time)).toEqual(expectedValue);
  });
  it('should show corrected time format when time is more than 0 sec and 2 position', () => {
    const time = 1520.11;
    const position = 2;
    const expectedValue = '25:20';
    expect(secToTimeFormat(position, time)).toEqual(expectedValue);
  });
  it('should show corrected time format when time is more than 0 sec and 3 position', () => {
    const time = 4122.776;
    const position = 3;
    const expectedValue = '01:08:42';
    expect(secToTimeFormat(position, time)).toEqual(expectedValue);
  });
});
