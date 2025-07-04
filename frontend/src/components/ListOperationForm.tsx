import { useEffect, useState } from "react";
import axios from 'axios';

export const ListOperationForm: React.FC = () => {

    const API_URL: string = import.meta.env.VITE_REACT_API_URL

    const [operations, setOperations] = useState([]);
    const [operationDetails, setOperationDetails] = useState<any>();

    const displayRecordDetails = async (operationID: string) => {
        const response = await axios.get( `${API_URL}/api/history/${ operationID }` );
        console.log('details: ', response.data.message);
        setOperationDetails(response.data.message);
    }

    useEffect( () => {
        const fetchAllOperations = async () => {
            const response = await axios.get(`${API_URL}/api/history`);
            setOperations(response.data.message);
        } 
        
        fetchAllOperations();
    }, [])

    return(
        <div className="row mt-5">
            <div className="row text-center mb-4">
                <span className="h3">Operations History</span>
            </div>
            <div className="col-6 offset-3">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Operation</th>
                            <th scope='col'>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            operations.map( (operation: any, index: any) => 
                                <tr key={index} onClick={ async () => displayRecordDetails(operation.id) } data-bs-toggle="modal" data-bs-target="#operationDetailModal">
                                    <th scope="row">{operation.id}</th>
                                    <th>{operation.operation}</th>
                                    <th>{operation.timestamp}</th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="operationDetailModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Operation Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope='col'>ID</th>
                                        <th scope='col'>Operation</th>
                                        <th scope='col'>Operand A</th>
                                        <th scope='col'>Operand B</th>
                                        <th scope='col'>Result</th>
                                        <th scope='col'>Timestamp</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>{operationDetails?.id}</th>
                                        <th>{operationDetails?.operation}</th>
                                        <th>{operationDetails?.operandA}</th>
                                        <th>{operationDetails?.operandB}</th>
                                        <th>{operationDetails?.result}</th>
                                        <th>{operationDetails?.timestamp}</th>
                                        <th>
                                            <button type="button" className="btn btn-danger btn-sm">Delete</button>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}