import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from 'react-select';

import { _shopItemAdd, _shopItemEdit, _shopItemGetById } from "../services/dataLoader.service";
import { FormData } from "../services/formData.service";

export const UpsertItem = (props) => {

    const [error, setError] = useState(null);
    const [formValues, handleFormValueChange, setFormValues] = FormData({
        name: '',
        img: '',
        price: '',
        size: '',
        description: '',
        discount: ''
    });
    let params = useParams();

    let sizes = [
        {
            label: 'XS',
            value: 'xs'
        },
        {
            label: 'S',
            value: 's'
        },
        {
            label: 'M',
            value: 'm'
        },
        {
            label: 'L',
            value: 'l'
        },
        {
            label: 'XL',
            value: 'xl'
        }
    ];

    useEffect(() => {
        if (props.edit) {
            handleItemGet();
        }
    //eslint-disable-next-line
    }, [props]);

    const handleItemGet = async () => {
        let result = await _shopItemGetById(params.id);
        if (result.error) {
            console.log("--error:", result.error);
        } else {
            console.log("result", result);
            let size = sizes.find((e) => e.value === result.size);
            setFormValues({
                name: result.name,
                img: result.img,
                price: result.price,
                size: size,
                description: result.description,
                discount: result.discount || 0
            });
        }
        setError(result.error);
    };

    const handleUpsert = async (event) => {
        event.preventDefault();
        let result;

        if (!props.edit)
            result = await _shopItemAdd(formValues);
        else
            result = await _shopItemEdit(formValues, params.id);

        if (result.error) {
            setError(result.error);
        } else {
            props.navigate('office');
        }
    };

    return (
        <div className="content">
            <div>
                <div className="pageTitle">
                    <span>{!props.edit ? 'Create Item' : 'Edit Item'}</span>
                </div>
                {error && <p className='errorMsg'>{error}</p>}
                <div className="pageContent">
                    <div className="mb-3">
                        <label
                            className='inputLabel requiredInput'
                            htmlFor='name'>Item Name</label>
                        <div className='inputWrapper'>
                            <input
                                id='name'
                                name='name'
                                type="text"
                                className={`formInput shortInput`}
                                placeholder="Name your item"
                                value={formValues.name}
                                onChange={
                                    (event) => {
                                        handleFormValueChange(
                                            'name',
                                            event.target.value
                                        )
                                    }
                                } />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            className='inputLabel requiredInput'
                            htmlFor='img'>Item Image</label>
                        <div className='inputWrapper'>
                            <input
                                id='img'
                                name='img'
                                type="text"
                                className={`formInput shortInput`}
                                placeholder="Image link"
                                value={formValues.img}
                                onChange={(event) => {
                                    handleFormValueChange(
                                        'img',
                                        event.target.value
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            className='inputLabel requiredInput'
                            htmlFor='price'>Price</label>
                        <div className='inputWrapper'>
                            <input
                                id='price'
                                name='price'
                                type="text"
                                className={`formInput shortInput`}
                                placeholder="Enter price"
                                value={formValues.price}
                                onChange={(event) => {
                                    handleFormValueChange(
                                        'price',
                                        Number(event.target.value)
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            className='inputLabel requiredInput'
                            htmlFor='size'>Size</label>
                        <div className='inputWrapper'>
                            <Select
                                id='size'
                                name='size'
                                type="text"
                                className={`shortInput customSelect`}
                                classNamePrefix='select'
                                placeholder="Item Size"
                                options={sizes}
                                value={formValues.size}
                                onChange={(selectedOption) => {
                                    handleFormValueChange(
                                        'size',
                                        selectedOption
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            className='inputLabel requiredInput'
                            htmlFor='description'>Description</label>
                        <div className='inputWrapper'>
                            <textarea
                                id='description'
                                name='description'
                                type="text"
                                className={`formInput shortInput`}
                                placeholder="Enter description"
                                value={formValues.description}
                                onChange={(event) => {
                                    handleFormValueChange(
                                        'description',
                                        event.target.value
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <div className='buttonBlock'>
                        <button
                            onClick={handleUpsert}
                            className={`mainBtn btn`}>{props.edit ? 'Save' : 'Create'}</button>
                    </div>
                </div>
            </div>
        </div>
    );

};