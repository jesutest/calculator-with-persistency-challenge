import { validateOperationInput } from "../validator/validateOperationInput";


describe( 'Validate Operation Input', () => {
    
    it('Operation input is invalid when operand is lower than the lower limit', () => {
        const result = validateOperationInput(-1_000_001, 20, 'ADDITION');
        expect(result).toBe(false);
    });

    it('Operation input is invalid when operand is higher than the upper limit', () => {
        const result = validateOperationInput(10, 1_000_001, 'ADDITION');
        expect(result).toBe(false);
    });

    it('Operation input is invalid when operand is zero and operation is division', () => {
        const result = validateOperationInput(10, 0, 'DIVISION');
        expect(result).toBe(false);
    });

    it('Operation input is invalid when operand is negative and operation is square root', () => {
        const result = validateOperationInput(10, -1, 'SQUARE_ROOT');
        expect(result).toBe(false);
    });

    it('Operation input valid when operands are under the accepted ranges', () => {
        const result = validateOperationInput(10, 1_000, 'ADDITION');
        expect(result).toBe(true);
    });

    // TODO: Create a test to verify the operation type is not expected returns a false

});