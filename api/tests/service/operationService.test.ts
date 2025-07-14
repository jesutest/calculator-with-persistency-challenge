import { OperationRepository } from "../../repository/operationRepository";
import { OperationService } from "../../service/operationService";
import { OperationType } from "../../types/types";

describe( 'Operation Service', () => {

    it('When an exception with the record insertion happens then the operation record is undefined', async () => {

        const operationService = new OperationService();
        const testUserId: number = 10;
        const testOperandA: number = 2;
        const testOperandB: number = 3;
        const testOperation: OperationType = 'ADDITION';

        const mockCreateOperation = jest.spyOn(OperationRepository.prototype, 'createOperation');

        mockCreateOperation.mockRejectedValue( new Error('Exception while inserting into database') );

        const result = await operationService.createOperation(testUserId, {
            operandA: testOperandA,
            operandB: testOperandB,
            operation: testOperation
        });

        expect(mockCreateOperation).toHaveBeenCalled();
        expect(result).toBe(undefined);
        
    });

    it('When data is correct then the operation record is created', async () => {
        const operationService = new OperationService();
        const testUserId: number = 10;
        const testOperandA: number = 2;
        const testOperandB: number = 3;
        const testOperation: OperationType = 'ADDITION';

        const mockCreateOperation = jest.spyOn(OperationRepository.prototype, 'createOperation');

        mockCreateOperation.mockResolvedValue({
            id: 'abcd-1234-abcd-1234'
        });

        jest.useFakeTimers().setSystemTime(new Date('2025-02-01'));

        const result = await operationService.createOperation(testUserId, {
            operandA: testOperandA,
            operandB: testOperandB,
            operation: testOperation
        });
 
        console.log('result: ', result);

        expect(mockCreateOperation).toHaveBeenCalled();
        expect(result).toStrictEqual({
            id: "abcd-1234-abcd-1234",
            operandA: testOperandA,
            operandB: testOperandB,
            operation: testOperation,
            result: 5,
            timestamp: new Date('2025-02-01T00:00:00.000Z'),
            userId: testUserId
        });

    });
    
    it('When an error with the operations retrieval happens then the operation is undefined', async () => {
        const operationService = new OperationService();
        const testUserId: number = 10;

        const mockGerOperationsByUserId = jest.spyOn(OperationRepository.prototype, 'getOperationsByUserId');

        mockGerOperationsByUserId.mockRejectedValue( new Error('Error while retrieving operations records') );

        const result = await operationService.getOperationsByUserId(testUserId);

        expect(mockGerOperationsByUserId).toHaveBeenCalled();
        expect(result).toBe(undefined);
    });

    it('When the userId is provided then its operations are retrieved', async () => {
        const operationService = new OperationService();
        const testUserId: number = 10;

        const mockGerOperationsByUserId = jest.spyOn(OperationRepository.prototype, 'getOperationsByUserId');

        mockGerOperationsByUserId.mockResolvedValue([
            {
                "id": "00abcdef-d123-2532-966f-a5820400b50f",
                "userId": 10,
                "operation": "ADDITION",
                "operandA": 10,
                "operandB": 10,
                "result": 20,
                "timestamp": "2025-07-14T01:10:06.000Z",
                "createdAt": "2025-07-14T01:10:06.000Z",
                "updatedAt": "2025-07-14T01:10:06.000Z"
            },
            {
                "id": "00abcdeg-d456-1323-b0fe-1110fdf11951",
                "userId": 10,
                "operation": "ADDITION",
                "operandA": 20,
                "operandB": 20,
                "result": 40,
                "timestamp": "2025-07-14T01:20:13.000Z",
                "createdAt": "2025-07-14T01:20:13.000Z",
                "updatedAt": "2025-07-14T01:20:13.000Z"
            }
        ]);

        const result = await operationService.getOperationsByUserId(testUserId);

        expect(mockGerOperationsByUserId).toHaveBeenCalled();
        expect(result).toHaveLength(2);
    });

    it('When an error with the operation retrieval happens then the operation is undefined', async () => {
        const operationService = new OperationService();
        const testUserId: number = 10;
        const testOperationId: string = "00abcdef-d123-2532-966f-a5820400b50f";

        const mockGerOperationsById = jest.spyOn(OperationRepository.prototype, 'getOperationById');

        mockGerOperationsById.mockRejectedValue( new Error('Error while retrieving operation record') );

        const result = await operationService.getOperationById(testUserId, testOperationId);

        expect(mockGerOperationsById).toHaveBeenCalled();
        expect(result).toBe(undefined);
    });

    it('When the userId is provided then its operation is retrieved', async () => {
        const operationService = new OperationService();
        const testUserId: number = 10;

        const mockGerOperationsByUserId = jest.spyOn(OperationRepository.prototype, 'getOperationsByUserId');

        mockGerOperationsByUserId.mockResolvedValue({
            "id": "00abcdef-d123-2532-966f-a5820400b50f",
            "userId": 10,
            "operation": "ADDITION",
            "operandA": 10,
            "operandB": 10,
            "result": 20,
            "timestamp": "2025-07-14T01:10:06.000Z",
            "createdAt": "2025-07-14T01:10:06.000Z",
            "updatedAt": "2025-07-14T01:10:06.000Z"
        });

        const result = await operationService.getOperationsByUserId(testUserId);

        expect(mockGerOperationsByUserId).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Object);
    });

});