import React, { useEffect, useState } from 'react'
import PrimaButton from './PrimaButton'
import { district, division, nearestArea, union, upazilla } from '@/assets/function/locationService'
import { locationOption, nearestAreaOption } from '@/assets/function/globalFunction'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { FalseAddressCreated, FalseUpdateAddress, GetAddressInput, GetBuyerDetailsByBuyerId, SubmitBuyerAddress, UpdateBuyerAddress } from '@/redux/_redux/CommonAction'
import Select from 'react-select'
const DeliveryLocation = ({ setAddress, setState }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const addressInput = useSelector((state) => state.homeInfo.addressInput);
    const isAddressCreated = useSelector((state) => state.homeInfo.isAddressCreated);
    const isAddressLoading = useSelector((state) => state.homeInfo.isAddressLoading);
    const isUpdateAddressLoading = useSelector((state) => state.homeInfo.isUpdateAddressLoading);
    const isAddressUpdated = useSelector((state) => state.homeInfo.isAddressUpdated);
    const buyerDetails = useSelector((state) => state.homeInfo.buyerDetails);
    const { addressInfo } = buyerDetails || { addressInfo: [] }
    const [districts, setDistricts] = useState([])
    const [upazillas, setUpazillas] = useState([])
    const [unions, setUnions] = useState([])
    const [nearest, setNearest] = useState([])
    const [isAddressUpdate, setAddressUpdate] = useState(false)
    const [addressId, setAddressId] = useState("")
    const handleChange = (name, value) => {
        dispatch(GetAddressInput(name, value))
    }
    const handleSubmit = () => {
        setAddress(addressInput)
        if (isAddressUpdate) {
            dispatch(UpdateBuyerAddress(addressInput, addressId))
        } else {
            dispatch(SubmitBuyerAddress(addressInput))
        }

    }
    const handleSetAddress = (item) => {
        const { buyerName, buyerPhone, detailsAddress, district, division, upazilla, _id } = item || {}
        setAddressUpdate(true)
        setAddressId(_id)
        handleChange("buyerName", buyerName)
        handleChange("buyerPhone", buyerPhone)
        handleChange("detailsAddress", detailsAddress)
        handleChange("district", district)
        handleChange("division", division)
        handleChange("upazilla", upazilla)
    }
    useEffect(() => {
        if (addressInput.division.length > 0) {
            setDistricts(locationOption(district(addressInput.divisionId)))
        }
        if (addressInput.district.length > 0) {
            setUpazillas(locationOption(upazilla(addressInput.districtId)))
        }
        if (addressInput.upazilla.length > 0) {
            setUnions(locationOption(union(addressInput.upazillaId)))
            setNearest(nearestAreaOption(nearestArea(addressInput.upazillaId)))
        }


    }, [addressInput])
    useEffect(() => {
        if (isAddressCreated || isAddressUpdated) {
            setState("payment")
            dispatch(FalseAddressCreated())
            dispatch(FalseUpdateAddress())
        }
    }, [isAddressCreated, isAddressUpdated])
    useEffect(() => {
        dispatch(GetBuyerDetailsByBuyerId())
    }, [])
    // console.log('addressInfo', addressInput)
    return (
        <div className='item left'>
            <h2>Delivery Location</h2>
            <h6>To confirm the order, enter your name, address,</h6>
            <h6>mobile number and click the confirm order button</h6>
            <div class="form-md">
                <div class="form-group">
                    <input
                        id="form_name1"
                        class="form-control"
                        type="text"
                        required
                        value={addressInput.buyerName}
                        onChange={(e) => handleChange("buyerName", e.target.value)}
                    />
                    <label for="form_name1">Your Name<span class="gl-form-asterisk"></span></label>
                </div>

                <div class="form-group">
                    <input
                        id="form_name2"
                        class="form-control"
                        type="text"
                        placeholder=""
                        required
                        value={addressInput.buyerPhone}
                        onChange={(e) => handleChange("buyerPhone", e.target.value)}
                    />
                    <label for="form_name2">Your Mobile Number<span class="gl-form-asterisk"></span></label>
                </div>

                {/* <div class="form-group">
                    <select
                        id="form_name3"
                        class="form-control"
                        value={addressInput.division}
                        onChange={(e) => {
                            handleChange("division", e.target.options[e.target.selectedIndex].text)
                            handleChange("divisionId", e.target.value)
                            handleChange("district", "")
                            handleChange("upazilla", "")
                            handleChange("union", "")
                        }}
                    >
                        {locationOption(division()).map((item) => (<option value={item.value}>{item.label}</option>))}

                    </select>
                    <label for="form_name3">Select Division<span class="gl-form-asterisk"></span></label>
                </div> */}
                {/* <div class="form-group">
                    <select
                        id="form_name4"
                        class="form-control"
                        value={addressInput.district}
                        onChange={(e) => {
                            handleChange("district", e.target.value)
                            handleChange("districtId", e.target.value)
                            handleChange("upazilla", "")
                            handleChange("union", "")
                        }}
                    >
                        {districts.map((item) => (<option value={item.value} label={item.label}>{item.label}</option>))}
                    </select>
                    <label for="form_name4">Select District<span class="gl-form-asterisk"></span></label>
                </div>
                <div class="form-group">
                    <select
                        id="form_name5"
                        class="form-control"
                        value={addressInput.upazilla}
                        onChange={(e) => {
                            handleChange("upazilla", e.target.value)
                            handleChange("upazillaId", e.target.value)
                            handleChange("union", "")
                        }}
                    >
                        {upazillas.map((item) => (<option value={item.value}>{item.label}</option>))}
                    </select>
                    <label for="form_name5">Select Sub District(Upazila)<span class="gl-form-asterisk"></span></label>
                </div> */}

                <div class="form-group">
                    <div className='mb5'>Select Division</div>
                    <Select
                        options={locationOption(division())}
                        name='division'
                        value={{ label: addressInput.division }}
                        onChange={(e) => {
                            handleChange("division", e.label)
                            handleChange("divisionId", e.value)
                            handleChange("district", "")
                            handleChange("upazilla", "")
                            handleChange("union", "")
                        }}
                    />
                </div>
                <div class="form-group">
                    <div className='mb5'>Select District</div>
                    <Select
                        options={districts}
                        // options={[]}
                        name='district'
                        value={{ label: addressInput.district }}
                        onChange={(e) => {
                            handleChange("district", e.label)
                            handleChange("districtId", e.value)
                            handleChange("upazilla", "")
                            handleChange("union", "")
                        }}
                    />
                </div>
                <div class="form-group">
                    <div className='mb5'>Sub District (Upazila)<span>*</span></div>
                    <Select
                        options={upazillas}
                        name='upazilla'
                        value={{ label: addressInput.upazilla }}
                        onChange={(e) => {
                            handleChange("upazilla", e.label)
                            handleChange("upazillaId", e.value)
                            handleChange("union", "")
                        }}
                    />
                </div>
                <div class="form-group">
                    <textarea
                        id="form_name6"
                        class="form-control"
                        type="text"
                        placeholder=""
                        required
                        value={addressInput.detailsAddress}
                        onChange={(e) => {
                            handleChange("detailsAddress", e.target.value)
                        }}
                    />
                    <label for="form_name6">Complete Delivery Address<span class="gl-form-asterisk"></span></label>
                </div>
            </div>
            <div className='btn-con'>
                <PrimaButton
                    width='200px'
                    height='40px'
                    content={(isUpdateAddressLoading || isAddressLoading) ? 'Proceeding..' : "Proceed Order"}
                    color='#fff'
                    weight='bold'
                    size='16px'
                    radius='20px'
                    bgColor='#0071bc'
                    onClick={() => (isUpdateAddressLoading || isAddressLoading) ? {} : handleSubmit()}
                />
            </div>
            <div className='page'>
                {addressInfo.length > 0 && addressInfo.map((item, index) => (
                    <span key={index} onClick={() => handleSetAddress(item)}>{index + 1}</span>
                ))}
            </div>
        </div>
    )
}

export default DeliveryLocation