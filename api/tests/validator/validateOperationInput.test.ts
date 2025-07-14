import { validateOperationInput } from "../../validator/validateOperationInput";


describe( 'Validate Operation Input', () => {
    
    it('When operand is lower than the lower limit then Operation input is invalid', () => {
        const result = validateOperationInput(-1_000_001, 20, 'ADDITION');
        expect(result).toBe(false);
    });

    it('When operand is higher than the upper limit then Operation input is invalid', () => {
        const result = validateOperationInput(10, 1_000_001, 'ADDITION');
        expect(result).toBe(false);
    });

    it('When operand is zero and operation is division Operation input is invalid', () => {
        const result = validateOperationInput(10, 0, 'DIVISION');
        expect(result).toBe(false);
    });

    it('When operand is negative and operation is square root then operation input is invalid ', () => {
        const result = validateOperationInput(10, -1, 'SQUARE_ROOT');
        expect(result).toBe(false);
    });

    it('When operands are under the accepted ranges then operation input valid', () => {
        const result = validateOperationInput(10, 1_000, 'ADDITION');
        expect(result).toBe(true);
    });

    // TODO: Create a test to verify the operation type is not expected returns a false

});