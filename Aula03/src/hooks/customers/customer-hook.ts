import axios from 'axios';
import ICustomerInterface from "../../model/customers/customer-interface";

const CustomerHook = () => {
    const url = 'http://192.168.50.200:5142/Customer';

    const getCustomerAsync = async () => {
        return axios.get<ICustomerInterface[]>(url)
            .then(response => response.data)
            .catch(error => {
                console.error(error)
                return [] as ICustomerInterface[];
            });
    }

    const upsertCustomerAsync = async (customer: ICustomerInterface) => {
        await axios.patch(url, customer,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .catch(error => console.error(error));

    }

    const deleteCustomerAsync = async (customer: ICustomerInterface) => {
        const deleteUrl = `${url}/${customer.id}`;
        await axios.delete(deleteUrl)
            .catch(error => console.error(error));
    }

    return {
        getCustomerAsync,
        upsertCustomerAsync,
        deleteCustomerAsync
    }
}

export default CustomerHook;
