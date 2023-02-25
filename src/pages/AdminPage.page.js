import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

import { _shopItemDelete, _shopItemGet } from "../services/dataLodaer.service";

export const AdminPage = () => {

    const [items, setItems] = useState([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({});

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        let result = await _shopItemGet();
        if (result.error) {
            console.log("---error:", result.error);
        } else {
            setItems(result);
        }
    };

    const iconColumnFormatter = (cell, row) => {
        return (
            <div className="iconColumn">
                <Link className='tableIconBtn' to={`/items/${cell}`}>
                    <FontAwesomeIcon icon={faPencil} />
                </Link>
                <button
                    className='tableIconBtn trashBtn'
                    onClick={() => {
                        setItemToDelete(row);
                        setShowDeleteDialog(true);
                    }}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
        )
    };

    const handleDeleteItem = async (id) => {
        await _shopItemDelete(id);
        getItems();
        setShowDeleteDialog(false);
    };

    const columns = [
        {
            dataField: 'img',
            text: 'Image',
        },
        {
            dataField: 'name',
            text: 'Item Name',
            sort: true
        },
        {
            dataField: 'price',
            text: 'Price',
        },
        {
            dataField: 'size',
            text: 'Size',
        },
        {
            dataField: '_id',
            text: 'Edit | Delete',
            classes: 'iconColumn',
            formatter: iconColumnFormatter
        }
    ];

    const defaultSorted = [
        {
            dataField: 'name',
            order: 'asc'
        }
    ];

    const noData = () => {
        return <p className='emptyTableMessage'>You have no items yet! Create it</p>
    };

    return (
        <div className="adminPage">
            <div className='myTable'>
                <div className='tableHeader'>
                    <Link className='mainBtn btn' to={'/create-item'}>Create Item</Link>
                </div>
                <BootstrapTable
                    keyField='_id'
                    data={items}
                    columns={columns}
                    wrapperClasses='table-responsive'
                    bordered={false}
                    pagination={paginationFactory()}
                    defaultSorted={defaultSorted}
                    noDataIndication={noData} />
            </div>
            <Modal
                show={showDeleteDialog}
                onHide={() => setShowDeleteDialog(false)}
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header closeButton>
                    <div className='pageTitle'>
                        <span>{`Delete item ${itemToDelete.name}`}</span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <span>{`Are you sure you want to delete item '${itemToDelete.name}'?`}</span>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className='btn mainBtn cancelBtn'
                        onClick={() => setShowDeleteDialog(false)}>Cancel</button>
                    <button
                        className='btn mainBtn acceptBtn'
                        onClick={async () => handleDeleteItem(itemToDelete._id)}>Delete</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};