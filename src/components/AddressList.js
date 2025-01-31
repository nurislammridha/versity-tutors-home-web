import { formatDate, orderByStatus } from '@/assets/function/globalFunction'
import React, { useEffect, useState } from 'react'

const AddressList = ({ list = [] }) => {
    console.log('list', list)
    return (<>
        {list.length > 0 ?
            <table>
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Division{">"}District{">"}Upazilla</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.buyerName}</td>
                            <td>{item?.buyerPhone}</td>
                            <td>{`${item?.division} > ${item?.district} > ${item?.upazilla}`}</td>
                            <td>{item?.detailsAddress}</td>
                        </tr>
                    ))}
                </tbody>


            </table> :
            (<h3 className='dflex jcc'>No Address Found</h3>)
        }

    </>)
}

export default AddressList