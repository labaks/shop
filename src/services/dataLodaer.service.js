let url = "http://localhost:5000/";

export const _shopItemGet = async () => {
    return await _get("", "shop-items/");
};

export const _shopItemGetById = async (id) => {
    return await _get('', `shop-items/${id}`);
};

export const _shopItemAdd = async (data) => {
    const dataToSend = {
        name: data.name,
        img: data.img,
        price: data.price,
        size: data.size,
        description: data.description,
        discount: data.discount || 0
    };
    return await _fetch('', dataToSend, 'shop-items/add-item');
};

export const _shopItemEdit = async (data, id) => {
    const dataToSend = {
        name: data.name,
        img: data.img,
        price: data.price,
        size: data.size,
        description: data.description,
        discount: data.discount || 0
    };
    return await _fetch('', dataToSend, `shop-items/${id}`);
};

export const _shopItemDelete = async (id) => {
    return await _delete("", `delete-item/${id}`);
};

const _get = async (token, route) => {
    try {
        const response = await fetch(url + route, {
            method: 'GET',
            headers: {
                // 'Authorization': token,
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        // if (!response.ok) HandleError(response);
        return json;
    } catch (error) {
        console.log(`--${route} error: ${error}`);
    }
};

const _fetch = async (token = '', data = {}, route = '', put = false) => {
    try {
        const response = await fetch(url + route, {
            method: put ? 'PUT' : 'POST',
            body: JSON.stringify(data),
            headers: {
                // 'Authorization': token,
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        // if (!response.ok) HandleError(response);
        return json;
    } catch (error) {
        console.log(`--${route} error: ${error}`);
    }
};

const _delete = async (token, route) => {
    const response = await fetch(url + route, {
        method: 'DELETE',
        headers: {
            // 'Authorization': token,
            'Content-Type': 'application/json',
        }
    });
    console.log("response:", response);
    // if (!response.ok) HandleError(response);
};