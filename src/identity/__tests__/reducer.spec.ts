import { identity } from '../reducer';

describe('reducer', () => {
  it('should should support unknow action', async () => {
    const state: any = {};
    const action: any = {};
    expect(identity(state, action)).toBe(state);
  });
});
