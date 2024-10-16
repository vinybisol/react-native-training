import { View, Text, StyleSheet, FlatList } from "react-native";
import CustomerHook from "../../hooks/customers/customer-hook";
import { useEffect, useState } from "react";
import ICustomerInterface from "../../model/customers/customer-interface";
import CustomerItemView from "./customer-item-view";

export default function CustomerListView() {
    const { getCustomerAsync } = CustomerHook();

    const [listOfCustomer, setCustomers] = useState<ICustomerInterface[]>([]);


    useEffect(() => {
        const fecthData = async () => {
            const data = await getCustomerAsync();
            setCustomers(data);
        }
        fecthData();
    });


    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                data={listOfCustomer}
                renderItem={({ item }) =>
                    <CustomerItemView customer={item} />
                }
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});