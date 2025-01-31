import { formatDate, orderByStatus } from '@/assets/function/globalFunction'
import React, { useEffect, useState } from 'react'

const OrderList = ({ orderList, tab }) => {
    const [list, setList] = useState([])
    useEffect(() => {
        if (orderList?.length > 0) {
            setList(orderByStatus(orderList, tab))
        }
    }, [tab])
    console.log('list', list)
    return (<>
        {list.length > 0 ?
            <table>
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Order</th>
                        <th>Date Purchased</th>
                        <th>Status</th>
                        <th>Total</th>
                        {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.orderId}</td>
                            <td>{formatDate(item?.createdAt)}</td>
                            <td>{item.orderStatus === "Created" ? "Pending" : item.orderStatus}</td>
                            <td>{item.subTotal + item.shippingFee}/=</td>
                            {/* <td>View</td> */}
                        </tr>
                    ))}
                </tbody>


            </table> :
            (<h3 className='dflex jcc'>No Order Found</h3>)
        }

    </>)
}

export default OrderList